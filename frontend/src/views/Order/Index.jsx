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
import FacebookIcon from '@material-ui/icons/Facebook'
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
   form: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
   },
   card: {
      padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 4}px`,
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
let typeGoods = [
   {
      name: "Giường ngủ",
      _id: '0'
   },
   {
      name: "Tủ Quần áo",
      _id: '1'
   },
   {
      name: "Bàn phòng khách",
      _id: '2'
   },
   {
      name: "Bàn trà",
      _id: '3'
   },
   {
      name: "Tủ giày",
      _id: '4'
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
               name: 'goodsId',
               title: I18n.t('Table.header.role.name.Mã sản phẩm'),
               formatterComponent: (data) => {
                  let code = _.get(data, 'row.goods.code', '')
                  return code
               },
            },
            {
               name: 'name',
               title: I18n.t('Table.header.role.name.Tên khách hàng'),
            },
            {
               name: 'phone',
               title: I18n.t('Table.header.role.name.Phone'),
            },
            {
               name: 'address',
               title: I18n.t('Table.header.role.name.Địa chỉ'),
            },
            {
               name: 'number',
               title: I18n.t('Table.header.role.number.Số Lượng'),
            },
            {
               name: 'money',
               title: I18n.t('Table.header.role.name.Số tiền hàng'),
               formatterComponent: (data) => {
                  let money = _.get(data, 'row.money', '')
                  return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
               }
            },
            {
               name: 'pay',
               title: I18n.t('Table.header.role.name.Hình thức thanh toán'),
               formatterComponent: (data) => {
                  let pay = _.get(data, 'row.pay', '')
                  switch(pay) {
                     case '0':
                        return "Thanh toán khi nhận hàng"
                     case '1':
                        return "Chuyển khoản"
                     case '2':
                        return 'Ví điện tử'
                     default:
                        return ''
                  }
               },
            },
            {
               name: 'status',
               title: I18n.t('Table.header.Trạng thái'),
               sortable: false,
               filterable: false,
               formatterComponent: (data) => {
                  let status = _.get(data, 'row.status', '')
                  return this.formatStatus(status)
               }
            },
            {
               name: '_id',
               title: I18n.t('Table.header.action'),
               sortable: false,
               filterable: false,
               formatterComponent: (data) => {
                  return this.customActionColumn(data)
               }
            },

         ],
         defaultSort: [],
         tableColumnExtensions: [
            { columnName: 'goodsId', wordWrapEnabled: true },
            { columnName: 'name', wordWrapEnabled: true },
            { columnName: 'phone', wordWrapEnabled: true },
            { columnName: 'address', wordWrapEnabled: true },
            { columnName: 'money', wordWrapEnabled: true },
            { columnName: 'number', wordWrapEnabled: true },
            { columnName: 'pay', wordWrapEnabled: true },
            { columnName: 'status', status: true },
            { columnName: '_id', align: 'center' },
         ],
         columnWidths: [
            {
               name: 'index',
               width: 80
            },
            {
               name: 'goodsId',
               width: 100
            },
            {
               name: 'name',
               width: 150
            },
            {
               name: 'phone',
               width: 100
            },
            {
               name: 'address',
               width: 350
            },
            {
               name: 'money',
               width: 100
            },
            {
               name: 'number',
               width: 80
            },
            {
               name: 'pay',
               width: 150
            },
            {
               name: 'status',
               width: 130
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

   formatStatus(status) {
      switch (status) {
         case '0':
            return <Button color="primary" >Mới</Button>
         case '1':
            return <Button color="primary" >Đang giao</Button>
         case '2':
            return <Button color="primary" >Hoàn thành</Button>
         case '3':
            return <Button color="primary" >Đổi hàng</Button>
         case '4':
            return <Button color="primary" >Thất bại</Button>
         default:
            return ''
      }
   }
   customUserColumn(data) {
      data = this.getData(data, "value", [])
      return data.length
   }
   customActionColumn(data) {
      let _id = this.getData(data, "value", '')
      let dataRow = this.getData(data, "row", '')
      const { classes } = this.props;
      return (
         <div>
            <Button className={classes.button} variant='contained' color="primary" onClick={() => this.onShow(dataRow)}>
               {I18n.t('Button.detail')}
            </Button>
            <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/order/${_id}`)}>
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
            <Button variant='contained' color='primary' onClick={() => this.goto("/order/create")}>
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
      let {dataRow}  = this.state
      let _id        = this.getData(dataRow, "_id", '')
      let codeGoods  = _.get(dataRow, 'goods.code', '')
      let nameGoods  = _.get(dataRow, 'goods.name', '')
      let phone      = _.get(dataRow, 'phone', '')
      let address    = _.get(dataRow, 'address', '')
      let money      = _.get(dataRow, 'money', '')
      let nameUser   = _.get(dataRow, 'name', '')
      let pay        = _.get(dataRow, 'pay', '')
      let status     = _.get(dataRow, 'status', '')
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
                           <TableCell>{this.formatStatus(status)}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </DialogContent>
               <DialogActions>
                  <Button color="primary" onClick={() => this.ConfirmDialog.show([_id])}>
                     {I18n.t('Button.delete')}
                  </Button>
                  <Button color="primary" onClick={() => this.goto(`/order/${_id}`)}>
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
         <Grid container spacing={32} className={classes.card} >
            <Grid item xs={12}>
               {
                  this.renderDetail()
               }
            </Grid>
            <Grid item xs={12}>
               <PaperFade showLoading={true} className={classes.card} >
                  <Grid container spacing={32}>
                     <Grid item xs={3}>
                        <AutoCompleteField
                           key="1"
                           fullWidth
                           select
                           label={I18n.t("Input.bad.Chọn hàng")}
                           // onChange={(value) => this.onHandleChange(value, 'typeBad')}
                           name="typeBad"
                           isMulti={false}
                           isClearable={false}
                           defaultValue='0'
                        >
                           {
                              typeGoods.map(item => (
                                 <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                    {item.name}
                                 </OptionAuto>
                              ))
                           }
                        </AutoCompleteField>
                     </Grid>
                     <Grid item xs={2}>
                        <AutoCompleteField
                           key="2"
                           fullWidth
                           select
                           label={I18n.t("Input.bad.Trạng thái đơn hàng")}
                           // onChange={(value) => this.onHandleChange(value, 'typeBad')}
                           name="status"
                           defaultValue='0'
                           isMulti={false}
                           isClearable={false}
                        >
                           {
                              status.map(item => (
                                 <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                    {item.name}
                                 </OptionAuto>
                              ))
                           }
                        </AutoCompleteField>
                     </Grid>
                     <Grid item xs={4}></Grid>
                  </Grid>
                  <GridTable
                     id="OrderIndex"
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
            </Grid>
         </Grid>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))