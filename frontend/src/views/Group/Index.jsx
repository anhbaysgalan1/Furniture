import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import AutoCompleteField, { Option } from 'components/Forms/AutoCompleteField';
import { IconButton, Icon, Tooltip } from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade';
//moment.defaultFormat="DD/MM/YYYY"
//import GridTable from 'components/Table/GridTable'
const GridTable = React.lazy(() => {
  return new Promise(r => setTimeout(() => {
    r(import('components/Table/GridTable'))
  }, 3000))
})
const styles = theme => ({
  gridTable: {
    height: "calc(100vh - 100px)"
  }
});

class Index extends BaseView {
  constructor(props) {
    super(props)
    this.state = {
      rendered: false
    }
    this.table = {
      columns: [
        {
          name: 'code',
          title: 'Code',
        },
        {
          name: 'name',
          title: 'Name',
        },
        {
          name: 'created_at',
          title: 'Ngày tạo',
          type: "date",
          filterFormat: "DD/MM/YY",
          defaultFilterOpration: "daterange",
          formaterComponent: (data) => {
            return moment(data.value).format("HH:mm DD/MM/YYYY")
          },
        },
      ],
      defaultSort: [],
    }
    this.renderToolbarActions = this.renderToolbarActions.bind(this)
  }

  renderToolbarActions() {
    return [
      <Tooltip title="Create New Item" key="create">
        <IconButton onClick={() => this.goto("/groups/create")}>
          <Icon>add_circle_outline</Icon>
        </IconButton>
      </Tooltip>,
      <Tooltip title="Export to CSV" key="export">
        <IconButton>
          <Icon>cloud_download</Icon>
        </IconButton>
      </Tooltip>,
      <Tooltip title="Print table" key="print">
        <IconButton>
          <Icon>local_printshop</Icon>
        </IconButton>
      </Tooltip>
    ]
  }

  render() {
    const { data, classes } = this.props
    return (
      <PaperFade showLoading={true}>
        <GridTable
          className={classes.gridTable}
          onFetchData={this.props.onFetchData}
          columns={this.table.columns}
          rows={data.data}
          totalCount={data.total}
          pageSize={data.pageSize}
          defaultSort={this.table.defaultSort}
          showCheckboxColumn={true}
          height="auto"
          selectedActions={(selectedIds) => ([
            <IconButton key="delete">
              <Icon>delete</Icon>
            </IconButton>
          ])}
          tableActions={this.renderToolbarActions}
        />
      </PaperFade>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Index));