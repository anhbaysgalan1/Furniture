import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation, MoneyField } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import {
   Grid,
   Typography,
   IconButton,
   Icon,
   Tooltip,
   Card,
   Button,
   CardActionArea,
   CardMedia,
   CardContent,
   CardActions,

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import { withRouter } from 'react-router-dom'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'

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
let pays = [
   {
      name: "Thanh toán khi nhận hàng",
      _id: '0'
   },
   {
      name: "Chuyển khoản",
      _id: '1'
   },
   {
      name: "Ví điện tử",
      _id: '2'
   }
]

const styles = theme => ({
   paper: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   }
})

class Create extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
         dataInput: {
            name: '',
            phone: '',
            address: '',
            goodsId: '',
            number: '',
            money: '',
            status: '',
            pay: '',
            content: ''
         }
      }
      this.onHandleChange = this.onHandleChange.bind(this)
      this.validate = {
         name: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(255, I18n.t("Form.maxLeng255"))
         ],
         permission: [
            Validation.required(I18n.t("Form.required"))
         ],
      }
      this.phoneFormatter = this.phoneFormatter.bind(this)
   }

   onHandleChange(value, name) {
      this.setState({ dataInput: { ...this.state.dataInput, [name]: value } })
      this.setState({ reload: !this.state.reload })
   }

   phoneFormatter(number){
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

   render() {
      const { classes, onSubmit, goods = [], data } = this.props
      let { dataInput } = this.state
      let goodsIdState  = _.get(dataInput, 'goodsId', '')
      let numberState   = _.get(dataInput, 'number', '')
      let name       = _.get(data, 'name', '')
      let phone      = _.get(data, 'phone', '')
      let address    = _.get(data, 'address', '')
      let goodsId    = _.get(data, 'goodsId', '')
      let number     = _.get(data, 'number', '')
      let money      = _.get(data, 'money', '')
      let _status    = _.get(data, 'status', '')
      let pay        = _.get(data, 'pay', '')
      let note       = _.get(data, 'note', '')
      let moneyNew   = ''
      let moneyOld   = ''
      let image      = ''
      let nameGoods  = ''
      let codeGoods  = ''      
      goods.map(item => {
         if (item._id == goodsId) {
            moneyOld  = _.get(item, 'moneyOld', '')
            moneyNew  = _.get(item, 'moneyNew', '')
            nameGoods = _.get(item, 'name', '')
            codeGoods = _.get(item, 'code', '')
            image     = _.get(item, 'image1', '')
         }
      })
      number = numberState ? numberState : number
      return (
         <Form className={classes.paper} onSubmit={onSubmit}>
            <Card>
               <CardContent>
                  <Grid container spacing={32}>
                     <Grid item xs={3} lg={3}>
                        <center>
                           { image ? <Typography color='primary'> Đơn hàng </Typography> : '' }
                           { image ? <img src={image} height='350' width='250' alt="Nội thất Dodo" title={`${nameGoods} - ${codeGoods}`}/> : '' }
                           { nameGoods ? <Typography color='primary' >{nameGoods} - {codeGoods}</Typography> : '' }
                           { moneyNew  ? <Typography style={{ color: 'red' }}>{moneyNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</Typography> : '' }
                           { moneyOld  ? <del><Typography>{moneyOld.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</Typography></del> : '' }
                        </center>
                     </Grid>
                     <Grid item xs={9}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
                           <Grid item xs={4}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.order.goodsId.Tên Hàng")}
                                 onChange={(data) => this.onHandleChange(data.value, 'goodsId')}
                                 name="goodsId"
                                 value={goodsIdState || goodsId}
                                 isMulti={false}
                                 isClearable={false}
                              >
                                 {
                                    goods.map(item => (
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
                                 label={I18n.t("Input.order.goodsId.Mã hàng")}
                                 onChange={(data) => this.onHandleChange(data.value, 'goodsId')}
                                 name="goodsCode"
                                 value={goodsIdState || goodsId}
                                 isMulti={false}
                                 isClearable={false}
                              >
                                 {
                                    goods.map(item => (
                                       <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                          {item.name}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                           <Grid item xs={3}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.number.Số lượng")}
                                 onChange={(value) => this.onHandleChange(value, 'number')}
                                 name="number"
                                 defaultValue={number}
                                 onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab'].indexOf(e.key) < 0) {
                                       e.preventDefault()
                                    }
                                    if (e.target.value.length >= 3) {
                                       if (['Backspace', 'Tab'].indexOf(e.key) < 0) {
                                          e.preventDefault()
                                       }
                                    }
                                 }}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <MoneyField
                                 fullWidth
                                 label={I18n.t("Input.order.money.Tổng tiền")}
                                 name="money"
                                 disabled={true}
                                 defaultValue={`${Number(number)*Number(moneyNew)}` || `${money}`}
                                 onChange={(value) => this.onHandleChange(value, 'money')}
                              />
                           </Grid>
                        </Grid> 
                        <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
                           <Grid item xs={4}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.name.Tên khách hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'name')}
                                 value={name}
                                 name="name"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.phone.SĐT")}
                                 onChange={(value) => this.onHandleChange(value, 'phone')}
                                 defaultValue={this.phoneFormatter(phone)}
                                 formatData={(value) => this.phoneFormatter(value)}
                                 onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab'].indexOf(e.key) < 0) {
                                       e.preventDefault()
                                    }
                                    if (e.target.value.length >= 13) {
                                       if (['Backspace', 'Tab'].indexOf(e.key) < 0) {
                                          e.preventDefault()
                                       }
                                    }
                                 }}
                                 name="phone"
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.address.Địa chỉ")}
                                 onChange={(value) => this.onHandleChange(value, 'address')}
                                 value={address}
                                 name="address"
                              />
                           </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
                           <Grid item xs={6}>
                              <AutoCompleteField
                                 key="3"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.order.status.Trạng thái đơn hàng")}
                                 onChange={(data) => this.onHandleChange(data.value, 'status')}
                                 name="status"
                                 isMulti={false}
                                 defaultValue={_status}
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
                              <AutoCompleteField
                                 key="4"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.order.pay.Hình thức thanh toán")}
                                 onChange={(data) => this.onHandleChange(data.value, 'pay')}
                                 name="pay"
                                 isMulti={false}
                                 defaultValue={pay}
                                 isClearable={false}
                              >
                                 {
                                    pays.map(item => (
                                       <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                          {item.name}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 multiline
                                 rows={5}
                                 rowsMax={8}
                                 variant="outlined"
                                 fullWidth
                                 defaultValue={note}
                                 label={I18n.t("Input.order.note.Ghi chú")}
                                 onChange={(value) => this.onHandleChange(value, 'note')}
                                 name="note"
                              />
                           </Grid>
                        </Grid>
                     </Grid>
                  </Grid>
               </CardContent>
               <CardActions>
                  <Button variant="contained" color="primary" onClick={() => this.goto("/order")}>
                     <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                  </Button>
                  <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
               </CardActions>
            </Card>
         </Form>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))