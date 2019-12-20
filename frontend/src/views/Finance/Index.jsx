import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import RadioGroupField, { Radio } from 'components/Forms/RadioGroupField'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import {
   IconButton,
   Icon,
   Tooltip,
   Button,
   Card,
   Grid,
   CardContent,
   CardActions,
   Typography,
   AppBar,
   Toolbar,
   Chip,
   Table,
   TableBody,
   TableRow,
   TableCell,
   DialogActions,
   DialogContent,
   Dialog,

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import Utility from '../../helpers/utility' 
import What from '../Public/What'
import Promotion from '../Public/Promotion'
import moment from 'moment'
import _ from 'lodash'


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
   }
})
const status = [
   {
      _id: '0',
      name: "Mới"
   },
   {
      _id: '1',
      name: "Đang giao"
   },
   {
      _id: '2',
      name: "Hoàn thành"
   },
   {
      _id: '3',
      name: "Đổi hàng"
   },
   {
      _id: '4',
      name: "Thất bại"
   }
]

class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         open: false,
         dataRow: {},
         reload: false,
         dataInput: {
            name: '',
            phone: '',
            address: '',
            count: '',
            pay: '',
         }
      }
      this.table = {
         columns: [
            {
               name: 'index',
               title: I18n.t("Table.header.user.index"),
               type: "text",
               filterable: false,
               sortable: false,
            },
            {
               name: 'date',
               title: I18n.t('Table.header.finance.date.Ngày'),
               filterable: false,
               sortable: false,
               formatterComponent: (data) => {
                  let date = _.get(data, 'row.date', '')
                  return moment(date).format('DD/MM/YYYY')
               },
            },
            {
               name: 'moneyIn',
               title: I18n.t('Table.header.finance.Thu tiền'),
               filterable: true,
               sortable: false,
               formatterComponent: (data) => {
                  let moneyIn = _.get(data, 'row.moneyIn', []) || []
                  return moneyIn.map( (item, index ) => {
                     let user = _.get(item, 'user', '')
                     let content = _.get(item, 'content', '')
                     let money = _.get(item, 'money', '')
                     return (
                        <div key={index}>
                           {user} - {content} - {money}
                        </div>
                     )
                  })
               },
            },
            {
               name: 'moneyOut',
               title: I18n.t('Table.header.finance.Chi tiêu'),
               filterable: true,
               sortable: false,
               formatterComponent: (data) => {
                  let moneyOut = _.get(data, 'row.moneyOut', []) || []
                  return moneyOut.map( (item, index ) => {
                     let user = _.get(item, 'user', '')
                     let content = _.get(item, 'content', '')
                     let money = _.get(item, 'money', '')
                     return (
                        <div key={index}>
                           {user} - {content} - {money}
                        </div>
                     )
                  })
               },
            },
            {
               name: '_id',
               title: I18n.t('Table.header.action'),
               sortable: false,
               filterable: true,
               formatterComponent: (data) => {
                  return this.customActionColumn(data)
               }
            },
         ],
         defaultSort: [],
         tableColumnExtensions: [
            { columnName: 'date', wordWrapEnabled: true },
            { columnName: 'moneyIn', wordWrapEnabled: true },
            { columnName: 'moneyOut', wordWrapEnabled: true },
            { columnName: '_id', align: 'center' },
         ],
         columnWidths: [
            {
               name: 'index',
               width: 80
            },
            {
               name: 'date',
               width: 100,
            },
            {
               name: 'moneyIn',
               width: 300
            },
            {
               name: 'moneyOut',
               width: 300
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
      this.onShow = this.onShow.bind(this)
      this.onHide = this.onHide.bind(this)
      this.onCancel = this.onCancel.bind(this)
      this.onHandleChange = this.onHandleChange.bind(this)
      this.onDelete = this.onDelete.bind(this)
   }

   onShow(dataRow) {
      this.setState({ open: true, dataRow: dataRow })
      this.setState({ reload: !this.state.reload })
   }
   onHide() {
      this.setState({ open: false })
   }
   onCancel() {
      this.onHide()
   }
   onDelete(_id) {
      this.onHide()
      this.ConfirmDialog.show([_id])
   }

   customUserColumn(data) {
      data = this.getData(data, "value", [])
      return data.length
   }
   customActionColumn(data) {
      let _id = this.getData(data, "value", '')
      let dataRow = this.getData(data, "row", '')
      const { classes } = this.props
      return (
         <div>
            <Button className={classes.button} variant='contained' color="primary" onClick={() => this.onShow(dataRow)}>
               {I18n.t('Button.detail')}
            </Button>
            <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/finance/${_id}`)}>
               {I18n.t("Button.edit")}
            </Button>
            {/* <Button className={classes.button} variant='contained' color="primary" onClick={() => this.ConfirmDialog.show([_id])}>
               {I18n.t('Button.delete')}
            </Button> */}
         </div>
      )
   }
   renderToolbarActions() {
      return [
         <Tooltip title={I18n.t("toolTip.new")} key="create">
            <Button variant='contained' color='primary' onClick={() => this.goto("/finance/create")}>
               {I18n.t("Button.create")}
            </Button>
         </Tooltip>,
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
   onHandleChange(value, name) {
      let { dataInput } = this.state
      this.setState({
         dataInput: { ...this.state.dataInput, [name]: value }
      })
   }

   phoneFormatter = (number) => {
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
      } else if (number.length > 11) {
         number = number.substring(0, 11)
         number = number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      }
      return number
   }

   renderDetail() {
      let { dataRow } = this.state
      let _id = this.getData(dataRow, "_id", '')
      let codeGoods = _.get(dataRow, 'goods.code', '')
      let nameGoods = _.get(dataRow, 'goods.name', '')
      let phone = _.get(dataRow, 'phone', '')
      let address = _.get(dataRow, 'address', '')
      let money = _.get(dataRow, 'money', '')
      let nameUser = _.get(dataRow, 'name', '')
      let pay = _.get(dataRow, 'pay', '')
      let status = _.get(dataRow, 'status', '')
      return (
         <Card>
            <Dialog
               fullWidth={true}
               onClose={this.onCancel}
               open={this.state.open}
               maxWidth='md'
               aria-labelledby="draggable-dialog-title"
            >
               <DialogContent>
                  <Table>
                     <TableBody>
                        <TableRow >
                           <TableCell> Tên hàng </TableCell>
                           <TableCell>{nameGoods}></TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Mã hàng </TableCell>
                           <TableCell>{codeGoods}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Tên khách hàng </TableCell>
                           <TableCell>{nameUser}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> SĐT </TableCell>
                           <TableCell>{this.phoneFormatter(phone)}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Địa chỉ </TableCell>
                           <TableCell>{address}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Tổng tiền </TableCell>
                           <TableCell>{money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Hình thức thanh toán </TableCell>
                           <TableCell>{pay}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell> Trạng thái đơn hàng </TableCell>
                           <TableCell>{Utility.formatStatus(status)}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </DialogContent>
               <DialogActions>
                  <Button color="primary" onClick={() => this.onDelete(_id)}>
                     {I18n.t('Button.delete')}
                  </Button>
                  <Button color="primary" onClick={() => this.goto(`/finance/${_id}`)}>
                     {I18n.t("Button.edit")}
                  </Button>
                  <Button color="primary" onClick={() => this.onCancel()}>
                     {I18n.t("Button.exit")}
                  </Button>
               </DialogActions>
            </Dialog>
         </Card>
      )
   }

   render() {
      const { data, classes, onSubmit } = this.props

      return (
         <div className={classes.card} >
            {
               this.renderDetail()
            }
            <PaperFade showLoading={true} className={classes.card} >
               <GridTable
                  id="FinanceIndex"
                  estimatedRowHeight={100}
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