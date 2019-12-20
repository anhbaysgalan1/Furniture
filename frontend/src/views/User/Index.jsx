import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import { IconButton, Icon, Tooltip, Button, Grid } from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'
const GridTable = React.lazy(() => import('components/Table/GridTable'))

const styles = theme => ({
   gridTable: {
      height: "calc(100vh - 100px)"
   },
   button: {
      marginRight: '5px'
   },
   card: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
   },
})

class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         rendered: false,
      }
      this.table = {
         columns: [
            {
               name: 'index',
               title: I18n.t("Table.header.user.index"),
               type: "text",
               filterable: false,
               sortable: false
            },
            {
               name: 'username',
               title: I18n.t("Table.header.user.username"),
               type: "text",
            },
            {
               name: 'name',
               title: I18n.t("Table.header.user.name"),
            },
            {
               name: '_id',
               width: 180,
               title: I18n.t('Table.header.action'),
               filterable: false,
               sortable: false,
               formatterComponent: (data) => {
                  return this.customActionColumn(data)
               }
            },
         ],

         defaultSort: [{}],
         tableColumnExtensions: [
            { columnName: '_id', align: 'center' },
            { columnName: 'username', wordWrapEnabled: true },
            { columnName: 'name', wordWrapEnabled: true },

         ],
         //tên các column name không muốn xuất file
         ignoreExcelColumns: ["index", "_id"],

         //set độ rộng của file excel và bảng gridtable
         columnWidths: [
            {
               name: 'index',
               width: 70
            },
            {
               name: 'username',
               width: 100
            },
            {
               name: 'name',
               width: 250
            },
            {
               name: '_id',
               width: 150
            }
         ]
      }
      this.ConfirmDialog = null
      this.renderToolbarActions = this.renderToolbarActions.bind(this)
      this.renderSelectedActions = this.renderSelectedActions.bind(this)
   }

   phoneFormatter(number) {
      number = number.replace(/[^\d]/g, '')
      if (number.length == 4) {
         number = number.replace(/(\d{4})/, "$1")
      } else if (number.length == 5) {
         number = number.replace(/(\d{4})(\d{1})/, "$1-$2")
      } else if (number.length == 6) {
         number = number.replace(/(\d{4})(\d{2})/, "$1-$2")
      } else if (number.length == 7) {
         number = number.replace(/(\d{4})(\d{3})/, "$1-$2")
      } else if (number.length == 8) {
         number = number.replace(/(\d{4})(\d{3})(\d{1})/, "$1-$2-$3")
      } else if (number.length == 9) {
         number = number.replace(/(\d{4})(\d{3})(\d{2})/, "$1-$2-$3")
      } else if (number.length == 10) {
         number = number.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3")
      } else if (number.length == 11) {
         number = number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      }
      return number
   }
   customPositionNameColumn(data) {
      return this.getData(data, "row.Position.name", '')
   }
   customPositionCodeColumn(data) {
      return this.getData(data, "row.Position.code", '')
   }
   customAreaNameColumn(data) {
      return this.getData(data, "row.Area.name", '')
   }
   customActionColumn(data) {
      let _id = this.getData(data, "value", '')
      const { classes } = this.props
      return (
         <div>
            <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/users/${_id}`)}>
               {I18n.t("Button.edit")}
            </Button>
            <Button className={classes.button} variant='contained' color="primary" key="delete" onClick={() => this.ConfirmDialog.show([_id])}>
               {I18n.t('Button.delete')}
            </Button>
         </div>
      )
   }
   renderToolbarActions() {
      const { data = [] } = this.props.data
      const { ignoreExcelColumns, columnWidths, columns } = this.table
      return [
         <Tooltip title={I18n.t("toolTip.new")} key="create">
            <Button variant="contained" color="primary" onClick={() => this.goto("/users/create")}>
               {I18n.t("Button.create")}
            </Button>
         </Tooltip>,
         // ignoreExcelColumns: tên các cột không muốn xuất, name: tên bảng, columnWidths: độ rộng của các cột, columns: tên column truyền vào
         <ExportExcel ignoreExcelColumns={ignoreExcelColumns} name="users" data={data} columnWidths={columnWidths} columns={columns} key="exportExcel" />
      ]
   }
   renderSelectedActions(selectedIds) {
      return [
         <Tooltip title={I18n.t("toolTip.delete")} key="create">
            <IconButton key="delete" onClick={() => this.ConfirmDialog.show(selectedIds)}>
               <Icon>delete</Icon>
            </IconButton>
         </Tooltip>
      ]
   }
   renderDialogConfirmDelete() {
      return (
         <ConfirmDialog
            ref={(ref) => this.ConfirmDialog = ref}
            title={I18n.t('Message.deleteDialogTitle')}
            content={I18n.t('Message.deleteDialogContent')}
            onSubmit={this.props.onDeleteData}
         />
      )
   }

   render() {
      const { data, classes } = this.props
      let columns = this.table.columns
      return (
         <div className={classes.card} >
            <PaperFade showLoading={true}>
               <GridTable
                  id="UserIndex"
                  className={classes.gridTable}
                  onFetchData={this.props.onFetchData}
                  onRefTable={this.props.onRefTable}
                  columns={this.table.columns}
                  rows={data.data}
                  totalCount={data.total}
                  pageSize={data.pageSize}
                  defaultSort={this.table.defaultSort}
                  showCheckboxColumn={false}
                  height="auto"
                  selectedActions={this.renderSelectedActions}
                  tableActions={this.renderToolbarActions}
                  tableColumnExtensions={this.table.tableColumnExtensions}
                  defaultColumnWidths={this.table.columnWidths}
               />
               {this.renderDialogConfirmDelete()}
            </PaperFade>
         </div>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))