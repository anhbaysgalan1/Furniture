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

let statusArr = [
   {
      value: '0',
      title: 'Mới'
   },
   {
      value: '1',
      title: 'Đang giao'
   },
   {
      value: '2',
      title: 'Đã giao'
   },
   {
      value: '3',
      title: 'Hoàn thành'
   },
   {
      value: '4',
      title: 'Thất bại'
   },
   {
      value: '5',
      title: 'Đổi hàng'
   },
   {
      value: '6',
      title: 'Đã hủy'
   },
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
            transportFee: '',
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
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'goodsId',
               title: I18n.t('Table.header.role.name.Mã sản phẩm'),
               style: {
                  textAlign: 'center',
               },
               formatterComponent: (data) => {
                  let code = _.get(data, 'row.goods.code', '')
                  return code
               },
            },
            {
               name: 'name',
               title: I18n.t('Table.header.role.name.Tên khách hàng'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'phone',
               title: I18n.t('Table.header.role.name.Phone'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'address',
               title: I18n.t('Table.header.role.name.Địa chỉ'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'money',
               title: I18n.t('Table.header.role.name.Số tiền hàng'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'count',
               title: I18n.t('Table.header.role.name.Số Lượng'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'pay',
               title: I18n.t('Table.header.role.name.Hình thức thanh toán'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'transportFee',
               title: I18n.t('Table.header.role.name.Phí giao hàng'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'status',
               title: I18n.t('Table.header.Trạng thái'),
               sortable: false,
               filterable: false,
               formatterComponent: (data) => {
                  let status = _.get(data, 'row.status', '')
                  return this.formatStatus(status)
               },
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: '_id',
               title: I18n.t('Table.header.action'),
               sortable: false,
               filterable: false,
               formatterComponent: (data) => {
                  return this.customActionColumn(data)
               },
               style: {
                  textAlign: 'center',
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
            { columnName: 'count', wordWrapEnabled: true },
            { columnName: 'pay', wordWrapEnabled: true },
            { columnName: 'transportFee', wordWrapEnabled: true },
            { columnName: 'status', status: true },
            { columnName: '_id', align: 'center' },
         ],
         //nếu tổng nhỏ hơn 990 thì tính theo %, ngược lại tính theo px
         columnWidths: [
            {
               name: 'index',
               width: 70
            },
            {
               name: 'goodsId',
               width: 150
            },
            {
               name: 'name',
               width: 70
            },
            {
               name: 'phone',
               width: 70
            },
            {
               name: 'address',
               width: 150
            },
            {
               name: 'money',
               width: 70
            },
            {
               name: 'count',
               width: 70
            },
            {
               name: 'pay',
               width: 100
            },
            {
               name: 'transportFee',
               width: 100
            },
            {
               name: 'status',
               width: 100
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
            return <Button color="primary" >Đã giao</Button>
         case '3':
            return <Button color="primary" >Hoàn thành</Button>
         case '4':
            return <Button color="primary" >Thất bại</Button>
         case '5':
            return <Button color="primary" >Đổi hàng</Button>
         case '6':
            return <Button color="primary" >Đã hủy</Button>
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

   renderDetail(classes, onSubmit) {
      let { dataRow } = this.state
      console.log("dataRow", dataRow)
      let _id = this.getData(dataRow, "_id", '')
      let codeGoods = _.get(dataRow, 'goods.code', '')
      let nameGoods = _.get(dataRow, 'goods.name', '')
      let phone = _.get(dataRow, 'phone', '')
      let address = _.get(dataRow, 'address', '')
      let money = _.get(dataRow, 'money', '')
      let nameUser = _.get(dataRow, 'name', '')
      let pay = _.get(dataRow, 'pay', '')

      let status = _.get(dataRow, 'status', '')
      let transportFee = _.get(dataRow, 'transportFee', '')
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
                           <TableCell> Mã hàng </TableCell>
                           <TableCell>{codeGoods}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Tên hàng </TableCell>
                           <TableCell>{nameGoods}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Tên khách hàng</TableCell>
                           <TableCell>{nameUser}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> SĐT</TableCell>
                           <TableCell>{this.phoneFormatter(phone)}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Địa chỉ </TableCell>
                           <TableCell>{address}</TableCell>
                        </TableRow>
                      
                        <TableRow >
                           <TableCell> Tổng tiền</TableCell>
                           <TableCell>{money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Hình thức thanh toán</TableCell>
                           <TableCell>{pay}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Trạng thái đơn hàng </TableCell>
                           <TableCell>{this.formatStatus(status)}</TableCell>
                        </TableRow>
                        <TableRow >
                           <TableCell> Phí giao hàng </TableCell>
                           <TableCell>{transportFee}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </DialogContent>
               <DialogActions>
                  <Button className={classes.button} variant='contained' color="primary"
                     onClick={() => this.onCancel()}
                  >
                     {I18n.t("Button.Thoát")}
                  </Button>
               </DialogActions>
            </Dialog>
         </Card>
      )
   }


   render() {
      const { data, classes, onSubmit } = this.props
      let copyPermission = [
         {
            name: "Giường gỗ tự nhiên",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         },
         {
            name: "Giường gỗ công nghiệp",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         },
         {
            name: "Giường gỗ cổ điển",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         },
         {
            name: "Giường gỗ hiện đại",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         }
      ]

      return (
         <Grid container spacing={32} className={classes.card} >
            <Grid item xs={12}>
               {
                  this.renderDetail(classes, onSubmit)
               }
            </Grid>
            <Grid item xs={12}>
               <PaperFade showLoading={true} className={classes.card} >
                  <Grid container spacing={32}>
                     <Grid item xs={4}>
                        <AutoCompleteField
                           key="1"
                           fullWidth
                           select
                           label={I18n.t("Input.bad.Chọn loại hàng")}
                           // onChange={(value) => this.onHandleChange(value, 'typeBad')}
                           name="typeBad"
                           isMulti={false}
                           isClearable={false}
                        >
                           {
                              copyPermission.map(item => (
                                 <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                    {item.name}
                                 </OptionAuto>
                              ))
                           }
                        </AutoCompleteField>
                     </Grid>
                     <Grid item xs={4}>
                        <AutoCompleteField
                           key="3"
                           fullWidth
                           select
                           label={I18n.t("Input.bad.Trạng thái đơn hàng")}
                           // onChange={(value) => this.onHandleChange(value, 'typeBad')}
                           name="status"
                           isMulti={false}
                           isClearable={false}
                        >
                           {
                              statusArr.map(item => (
                                 <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                    {item.title}
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