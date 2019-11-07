import React, { PureComponent } from 'react'
import LoadingCircle from 'components/Progress/LoadingCircle'
import moment from "moment"
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
  TableSelection,
  DragDropProvider,
  TableColumnReordering,
  TableColumnResizing,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
  VirtualTable,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui'
import {
  FilteringState,
  SortingState,
  PagingState,
  CustomPaging,
  SelectionState,
  IntegratedSelection,
  DataTypeProvider
} from '@devexpress/dx-react-grid'
import { I18n } from 'react-redux-i18n'
import DateRangeField from 'components/Forms/DateRangeField'
import TextField from 'components/Forms/TextField'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import './style.css'
const debug = require("debug")("mq:table")
const styles = theme => {
  return {
    table: {
      position: "relative",
      overflowX: "auto",
      //height: "calc(100vh - 64px)"
    },
    tableToolbar: {
      padding: "0px",
      // paddingBottom: '16px !important'
    },
    toolbarRightIcons: {
      position: "absolute",
      right: "48px"
    },
    tableStriped: {
      '& tbody tr:nth-of-type(odd)': {
        backgroundColor: "#F2F2F2",
      },
    },
    customRow: {
      '&:hover': {
        backgroundColor: 'lightgray !important',
      }
    }
  }
}
//color bang
const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table
    {...restProps}
    className={classes.tableStriped}
  />
);

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);

//change no data text
const noDataRow = ({ colSpan }) => (
  <td style={{ textAlign: "center" }} colSpan={colSpan}>
    {I18n.t("Exception.noData")}
  </td>
);

const CustomTableRowBase = ({ row, classes, ...restProps }) => {
  let style = {}
  if (row.style) {
    style = row.style
  }
  return <Table.Row
    {...restProps}
    className={classes.customRow}
    style={{
      cursor: 'pointer',
      ...style
    }}
  />

};
export const TableRow = withStyles(styles, { name: 'CustomTableRow' })(CustomTableRowBase);

const filterByType = {
  text: {
    operations: [
      "contains",
      "notContains",
      "startsWith",
      "endsWith",
      "equal",
      "notEqual"
    ],
    editorComponent: ({ value, onValueChange }) => (
      <TextField
        InputProps={{
          disableUnderline: false
        }}
        fullWidth
        defaultValue={value}
        name="filter"
        type="text"
        placeholder={I18n.t("Input.Filter")}
        onChange={onValueChange}
      />
    )
  },
  number: {
    operations: [
      "equal",
      "notEqual",
      "greaterThan",
      "greaterThanOrEqual",
      "lessThan",
      "lessThanOrEqual"
    ],
    editorComponent: ({ value, onValueChange }) => (
      <TextField
        fullWidth
        defaultValue={value}
        name="filter"
        type="number"
        placeholder={I18n.t("Input.Filter")}
        onChange={onValueChange}
      />
    )
  },
  date: {
    operations: [
      "daterange"
    ],
    editorComponent: ({ value, onValueChange }) => (
      <DateRangeField
        fullWidth
        defaultValue={{
          ...value,
          key: "dateRange"
        }}
        placeholder={I18n.t("Input.Filter")}
        name="filter"
        onChange={(value => {
          if (!value.startDate && !value.endDate) {
            value = undefined
          } else {
            value.startDate = moment(value.startDate).startOf('day')
            value.endDate = moment(value.endDate).endOf('day')
          }
          onValueChange(value)
        })}
      />
    )
  }
}

const FilterIcon = ({ type, ...restProps }) => {
  //if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

//dùng để xét css cho header
const CustomTableHeaderCell = ({ classes, ...restProps }) => {
  restProps.value = restProps.column.title || restProps.column.name;
  restProps.style = restProps.column.style
  return <TableHeaderRow.Cell {...restProps} />
}

const Root = props => <Grid.Root {...props} style={{ height: '100%' }} />;
const ToolbarRoot = (tableProps, tableState) => (props) => {
  let leftChildren = ""
  let rightChildren = ""
  if (typeof tableProps.selectedActions == "function") {
    leftChildren = tableProps.selectedActions(tableState.selection)
  }

  if (typeof tableProps.tableActions == "function") {
    rightChildren = tableProps.tableActions({ tableProps, tableState })
  }

  return <Toolbar.Root className={tableProps.classes.tableToolbar}>
    <div>
      {tableState.selection.length ? leftChildren : ''}
    </div>
    <div className={tableProps.classes.toolbarRightIcons}>
      {rightChildren}
    </div>
    {props.children}
  </Toolbar.Root>
}
class GridTable extends PureComponent {
  constructor(props) {
    super(props);

    let defaultState = {
      id: props.id || undefined,
      loading: true,
      restoring: true,
      selection: [],
      sorting: [],
      filters: [],
      columnOptions: {
        disableFilter: [],
        disableSorting: [],
        columnWidths: [],
        hiddens: [],
        defaultReOrder: [],
        dataTypeProvider: [],
        fixedColumns: {
          left: [], //TableSelection.COLUMN_TYPE mặc định luôn fixed trường checkbox
          right: []
        },
      },

      pageSize: 100,
      currentPage: 0,
      totalCount: 0,
      pageSizes: [100, 200, 300, 400, 500, 1000]
    };

    this.state = defaultState
    this.selection = []
    this.ToolbarRootComponent = ToolbarRoot(this.props, this.state)

    this.getRowId = this.getRowId.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
    this.onChangePageSize = this.onChangePageSize.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.onSortingChange = this.onSortingChange.bind(this)
    this.onFiltersChange = this.onFiltersChange.bind(this)
    this.onColumnWidthsChange = this.onColumnWidthsChange.bind(this)
  }

  /**
   * lưu lại toàn bộ setting của table
   */
  backupSetting() {
    if (!this.props.id) return;
    let setting = Object.assign({}, this.state);
    // setting.currentPage = 0;
    delete setting["columnOptions"]["dataTypeProvider"];
    localStorage.setItem(`gridTable.${this.props.id}`, JSON.stringify(setting));
  }

  restoreSetting() {
    if (!this.props.id) return false
    let setting = localStorage.getItem(`gridTable.${this.props.id}`)
    if (setting) {
      setting = JSON.parse(setting)
      setting = _.merge(this.state, setting)
      //let dataTypeProvider = this.buildDataTypeProvider(this.props.columns)
      //setting['columnOptions']['dataTypeProvider'] = dataTypeProvider
      setting['restoring'] = true
      this.setState(setting)
      return true
    }
    return false
  }

  formatDefaultWidth(defaultColumnWidths, widthTable) {
    const totalWidth = defaultColumnWidths.reduce((total, column) => total + (column.width || 0), 0);
    const fullWidth = widthTable - 68
    let defaultResizing = []
    //nếu tổng lớn hơn kích thước bảng thì tính theo excel
    if (totalWidth > fullWidth) {
      defaultResizing = defaultColumnWidths.map(column => {
        return {
          columnName: column.name,
          width: column.width
        }
      })
    } else {
      //ngược lại tính theo %
      defaultResizing = defaultColumnWidths.map(column => {
        return {
          columnName: column.name,
          width: fullWidth * (column.width / totalWidth)
        }
      })
    }
    return defaultResizing
  }

  componentDidMount() {
    // this.deleteQuery()
    if (!this.restoreSetting()) {
      const { defaultSort, defaultSelection, defaultPageSize } = this.props
      // if (defaultSort) {
      //   //tạm thay đổi để code sorting
      //   this.state.sorting = defaultSort
      // }
      if (defaultSelection) {
        this.setState({ selection: defaultSelection })
      }
      if (defaultPageSize) {
        this.setState({ pageSize: defaultPageSize })
      }
      this.setOptionsColumns(this.props.columns)
    }
    this.columns = this.dataAccessors(this.props.columns)
    let dataTypeProvider = this.buildDataTypeProvider(this.props.columns)
    let defaultResizing = this.state.columnOptions.columnWidths
    if (this.state.columnOptions.columnWidths.length === 0) {
      const widthTable = this.refTable.offsetWidth
      //set defaultResizing
      let defaultColumnWidths = this.props.defaultColumnWidths
      if (defaultColumnWidths) {
        defaultResizing = this.formatDefaultWidth(defaultColumnWidths, widthTable)
      } else {
        defaultResizing = this.props.columns.map(column => {
          return {
            columnName: column.name,
            width: Math.max((widthTable - 68) / this.props.columns.length, 140)
          }
        })
      }

    }

    this.setState({
      columnOptions: {
        ...this.state.columnOptions,
        dataTypeProvider: dataTypeProvider,
        columnWidths: defaultResizing
      }
    })
    if (typeof this.props.onRefTable == "function") {
      this.props.onRefTable(this)
    }
    this.onFetchData()
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      loading: prevState.loading
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.restoring) {
      this.setState({ restoring: false })
    }

    if (prevState.loading === this.state.loading === true) {
      this.setState({ loading: false })
    }
  }

  componentWillUnmount() {
    this.backupSetting()
    // if(this.state.id){
    //   localStorage.setItem(`gridTable.${this.state.id}`, JSON.stringify(this.state))
    // }
  }


  editorComponentRender(editorComponent, column) {

    //xử lý nếu không có editor thì return undefined để sử dụng editor mặc định
    if (!editorComponent) return undefined
    return (params) => {
      let components = editorComponent(params)
      //thêm các props mặc định. filterFormat cho editor Component (nếu là date thì sẽ apply
      let rendered = React.cloneElement(components, {
        name: "filter",
        margin: "none",
        ...column.editorProps,
        disabled: column.filterable === false,
        format: column.filterFormat
      })
      //nếu không có filter thì kg render
      if (column.filterable === false) {
        return <p></p>
      }
      return (
        <div style={{ width: "100%" }}>
          {rendered}
        </div>
      )
    }
  }

  buildDataTypeProvider(columns) {
    let dataTypeProvider = []
    for (let column of columns) {
      //set dataTypeProvider
      let defaultOperations = undefined,
        defaultFormatterComponent = undefined,
        defaultEditorComponent = undefined

      if (!column.type) column.type = "text"
      if (column.type && filterByType[column.type]) {
        defaultOperations = filterByType[column.type]["operations"]
        defaultFormatterComponent = filterByType[column.type]["formatterComponent"]
        defaultEditorComponent = filterByType[column.type]["editorComponent"]
      }
      //build editorComponent, editor của filter
      let edittorComponent = column.editorComponent || defaultEditorComponent
      dataTypeProvider.push({
        columnName: column.name,
        for: [column.name],
        availableFilterOperations: column.availableFilterOperations || defaultOperations,
        formatterComponent: column.formatterComponent || defaultFormatterComponent,
        editorComponent: this.editorComponentRender(edittorComponent, column)
      })
    }
    /* this.setState({
      columnOptions: {
        ...this.state.columnOptions,
        dataTypeProvider: [...dataTypeProvider]
      }
    } */
    return dataTypeProvider
  }
  setOptionsColumns(columns) {
    let {
      disableFilter,
      disableSorting,
      defaultReOrder,
      fixedColumns,
      hiddens,
    } = this.state.columnOptions

    for (let column of columns) {
      //check disable filter
      if (column.filterable === false) {
        disableFilter.push({
          columnName: column.name,
          filteringEnabled: false
        })
      }

      //check disable sorting
      if (column.sortable === false) {
        disableSorting.push({
          columnName: column.name,
          sortingEnabled: false
        })
      }

      //set re-order
      defaultReOrder.push(column.name)

      //set fixedColumns
      if (column.fixed) {
        if (column.fixed === "right") fixedColumns.right.push(column.name)
        else {
          if (column.name === defaultReOrder[0])
            fixedColumns.left.push(TableSelection.COLUMN_TYPE)

          fixedColumns.left.push(column.name)
        }
      }
      //set hidden column
      if (column.hidden) {
        hiddens.push(column.name)
      }
    }

    this.setState({
      columnOptions: {
        ...this.state.columnOptions,
        disableFilter: disableFilter,
        disableSorting: disableSorting,
        defaultReOrder: defaultReOrder,
        fixedColumns: fixedColumns,
        hiddens: hiddens
      }
    })
  }
  //backup các cột ẩn vào db
  backupHiddens = (data) => {
    if (!this.props.id) return false
    let setting = localStorage.getItem(`gridTable.${this.props.id}`)
    if (setting) {
      setting = JSON.parse(setting)
      let { columnOptions } = setting
      if (typeof columnOptions === 'object') {
        setting.columnOptions.hiddens = data
        localStorage.setItem(`gridTable.${this.props.id}`, JSON.stringify(setting));
      }
    }
  }

  setHiddenColumnNames = (data = []) => {
    this.state.columnOptions.hiddens = data
    this.backupHiddens(data)
  }

  getRowId(row) {
    if (this.props.getRowId) {
      return this.props.getRowId(row)
    }
    return row._id
  }

  onSelectionChange(selection) {

    debug("change selection: ", selection)
    this.setState({ selection: selection })
    //this.tableState.selection = selection
    //this.onFetchData()
  }

  onSortingChange(sorting) {
    debug("change sort: ", sorting)
    this.onFetchData({ sorting: sorting })

  }

  onChangePage(page) {
    debug("change page...", page)
    this.onFetchData({ currentPage: page })
  }

  onChangePageSize(pageSize) {
    debug("change PageSize: ", pageSize)
    this.onFetchData({
      currentPage: 0, //reset page when page size changed
      pageSize: pageSize
    })
  }

  getPropertyByColumnName(columnName, property) {
    const column = this.props.columns.filter(column => column.name === columnName)[0]
    if (column && column[property]) return column[property]
    return null
  }

  formatValueByType(value, type) {
    switch (type) {
      case "text":
        value = String(value)
        break;
      case "number":
        value = Number(value)
        break;

      default:
        break;
    }
    return value
  }

  onFiltersChange(filters) {
    debug("change filters but not fetch data: ", filters)
    clearTimeout(this.onFiltersChangeTimeout)
    this.onFiltersChangeTimeout = setTimeout(() => {
      debug("filters start fetch new data", filters)
      //build filters
      filters = filters.map(filter => {
        //set default opration
        if (!filter.operation) filter.operation = this.getPropertyByColumnName(filter.columnName, "defaultFilterOpration") || "contains"
        const dataType = this.getPropertyByColumnName(filter.columnName, "type") //set dataType to filter Object
        return {
          ...filter,
          dataType: dataType,
          value: this.formatValueByType(filter.value, dataType)
        }
      })
      this.onFetchData({
        currentPage: 0, //reset page when page size changed
        filters: filters
      })
    }, 300)

  }

  onColumnWidthsChange(widths) {
    this.setState({
      columnOptions: {
        ...this.state.columnOptions,
        columnWidths: widths
      }
    })
  }

  onFetchData(newState = {}) {
    const state = {
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
      sorting: this.state.sorting,
      filters: this.state.filters,
      ...newState
    }

    this.setState({
      loading: true,
      ...state
    })
    debug("onFetchData: ", state)
    this.props.onFetchData(state)
  }

  renderDataTypeProvider() {
    const { dataTypeProvider } = this.state.columnOptions
    let result = dataTypeProvider.map(provider => (
      <DataTypeProvider
        key={`DataTypeProvider-${provider.columnName}`}
        {...provider}
      />
    ))
    return result
  }

  renderSelection() {
    const { showCheckboxColumn } = this.props
    if (showCheckboxColumn) {
      return [
        <SelectionState
          key="SelectionState"
          selection={this.state.selection}
          onSelectionChange={this.onSelectionChange}
        />,
        <IntegratedSelection
          key="IntegratedSelection"
        />,
        <TableSelection
          key="TableSelection"
          showSelectAll={true}
        />
      ]
    }
    return ''
  }

  renderFilter() {
    const { filters, columnOptions } = this.state
    let filterPlugins = [
      <FilteringState
        key="FilteringState"
        defaultFilters={filters}
        onFiltersChange={this.onFiltersChange}
        columnExtensions={columnOptions.disableFilter}
      />,
      <TableFilterRow
        key="TableFilterRow"
        // showFilterSelector                      //tạm thời tắt filter icon
        iconComponent={FilterIcon}
        messages={{}}
      />
    ]
    return filterPlugins
  }

  renderSorting() {
    const { columnOptions, sorting } = this.state
    return [
      <SortingState
        key="SortingState"
        defaultSorting={sorting}
        onSortingChange={this.onSortingChange}
        columnExtensions={columnOptions.disableSorting}
      />
    ]
  }

  renderPaging() {
    const { currentPage, pageSize, pageSizes } = this.state
    const { totalCount, pageHiding } = this.props
    if (pageHiding) {
      return ''
    } else {
      return [
        <PagingState
          key="PagingState"
          currentPage={currentPage}
          pageSize={pageSize}
          onCurrentPageChange={this.onChangePage}
          onPageSizeChange={this.onChangePageSize}
        />,
        <CustomPaging
          key="CustomPaging"
          totalCount={totalCount}
        />,
        <PagingPanel
          key="PagingPanel"
          pageSizes={pageSizes}
          messages={{
            rowsPerPage: I18n.t("PagingPanel.rowPerPage"),
            info: "{from} - " + "{to} " + I18n.t("PagingPanel.format") + " {count} " + I18n.t("PagingPanel.of")
          }}

        />
      ]
    }

  }

  renderTableColumnUtility() {
    const { columnOptions } = this.state
    return [
      <DragDropProvider
        key="DragDropProvider"
      />,
      <TableColumnReordering
        key="TableColumnReordering"
        defaultOrder={columnOptions.defaultReOrder}
      />,
      <TableColumnResizing
        key="TableColumnResizing"
        onColumnWidthsChange={this.onColumnWidthsChange}
        columnWidths={columnOptions.columnWidths}
      />,
      <TableColumnVisibility
        key="TableColumnVisibility"
        defaultHiddenColumnNames={columnOptions.hiddens}
        // hiddenColumnNames={columnOptions.hiddens}
        onHiddenColumnNamesChange={this.setHiddenColumnNames}
        messages={{ noColumns: I18n.t("Table.column.noColumn") }}
      />
    ]
  }

  renderToolbar() {
    const ToolbarRootComponent = ToolbarRoot(this.props, this.state)
    return [
      <Toolbar
        key="Toolbar"
        rootComponent={ToolbarRootComponent}
      />,
      <ColumnChooser
        key="ColumnChooser"
        messages={{ showColumnChooser: I18n.t("Table.column.chooser") }}

      />
    ]
  }

  renderFixedColumns() {
    const { columnOptions } = this.state
    return [
      <TableFixedColumns
        key="TableFixedColumns"
        leftColumns={columnOptions.fixedColumns.left}
        rightColumns={columnOptions.fixedColumns.right}
      />
    ]
  }

  dataAccessors(columns) {
    /* for(let index in columns){
      let column = columns[index]
      if(column['name'].indexOf(".") !== -1){
        columns[index]['getCellValue'] = (row) => _.get(row, column['name'])
      }
    } */
    return columns
  }
  renderTable() {
    const { rows, classes, className, tableColumnExtensions, filterRowHiding } = this.props
    const { currentPage, pageSize } = this.state
    // đánh index cho bảng
    if (Array.isArray(rows)) {
      rows.map((row, i) => {
        if (!row.ignoreIndex) {
          rows[i]['index'] = currentPage * pageSize + i + 1
        }
      })
    }
    if (!this.columns) return ''
    return (
      <div className={`${classes.table} ${className}`}>
        <Grid
          rows={rows || []}
          columns={this.columns}
          getRowId={this.getRowId}
          rootComponent={Root}
        >

          {/* thay VirtualTable */}
          <VirtualTable
            estimatedRowHeight={this.props.estimatedRowHeight || 48}
            noDataCellComponent={noDataRow}
            tableComponent={TableComponent}
            height={this.props.height}
            columnExtensions={tableColumnExtensions}
            rowComponent={TableRow}
          />
          {this.renderDataTypeProvider()}
          {this.renderSorting()}
          {/* {this.render} */}

          {this.renderSelection()}
          {this.renderTableColumnUtility()}

          <TableHeaderRow
            showSortingControls
            messages={{
              sortingHint: I18n.t("Table.header.sorting")
            }}
            cellComponent={CustomTableHeaderCell}
          />
          {filterRowHiding ? "" : this.renderFilter()}
          {this.renderFixedColumns()}
          {this.renderPaging()}
          {this.renderToolbar()}
        </Grid>
      </div>
    )
  }
  render() {
    debug("render Table, state: ", this.state, this.props)
    const { loading } = this.state
    const { classes, className } = this.props

    return <div className={`${classes.table} ${className}`} ref={ref => this.refTable = ref}>
      {this.renderTable()}
      <LoadingCircle
        show={loading}
      />
    </div>
  }
}

export default withStyles(styles, { withTheme: true })(GridTable)
