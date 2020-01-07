import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation, MoneyField, DateTimeField } from 'components/Forms'
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
import { statusOrder, pays } from '../../config/constant'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'

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
         money: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(50, I18n.t("Form.maxLeng50"))
         ],
         usersName: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(50, I18n.t("Form.maxLeng50"))
         ],
         phone: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(50, I18n.t("Form.maxLeng50"))
         ],
         address: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(50, I18n.t("Form.maxLeng50"))
         ],
         note: [
            Validation.maxLength(1000, I18n.t("Form.maxLeng1000"))
         ],
         required: [
            Validation.required(I18n.t("Form.required")),
         ]
      }
      this.phoneFormatter = this.phoneFormatter.bind(this)
   }

   onHandleChange(value, name) {
      this.setState({ dataInput: { ...this.state.dataInput, [name]: value } })
      this.setState({ reload: !this.state.reload })
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
      } else if (number.length > 11) {
         number = number.substring(0, 11)
         number = number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      }
      return number
   }

   render() {
      const { classes, onSubmit, goods = [], data } = this.props
      let { dataInput } = this.state
      let goodsIdState = this.getData(dataInput, 'goodsId', '')
      let numberState = this.getData(dataInput, 'number', '')
      let phone = this.getData(data, 'phone', '')
      let goodsId = this.getData(data, 'goodsId', '')
      let number = this.getData(data, 'number', '')
      let moneyImportGoods = this.getData(data, 'moneyImportGoods', '')

      let moneyNew = ''
      let moneyOld = ''
      let image = ''
      let nameGoods = ''
      let codeGoods = ''
      goods.map(item => {
         if (item._id == goodsId) {
            moneyOld = this.getData(item, 'moneyOld', '')
            moneyNew = this.getData(item, 'moneyNew', '')
            nameGoods = this.getData(item, 'name', '')
            codeGoods = this.getData(item, 'code', '')
            image = this.getData(item, 'image1', '')
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
                           { image ? <img src={image} height='350' width='280' alt="Nội thất Dodo" title={`${nameGoods} - ${codeGoods}`}/> : '' }
                           { nameGoods ? <Typography color='primary' >{nameGoods} - {codeGoods}</Typography> : '' }
                           { moneyNew  ? <Typography style={{ color: 'red' }}>{moneyNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</Typography> : '' }
                           { moneyOld  ? <del><Typography>{moneyOld.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</Typography></del> : '' }
                        </center>
                     </Grid>
                     <Grid item xs={9}>
                        <DateTimeField
                           label='Ngày'
                           name="date"
                           ampm="false"
                           defaultValue={ new Date(this.getData(data, 'date', ''))}
                           autoOk={true}
                           clearable={false}
                           showTime={false}
                           showDate={true}
                        />
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
                                 validate={this.validate.required}
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
                                 validate={this.validate.required}
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
                              <MoneyField
                                 fullWidth
                                 validate={this.validate.required}
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
                                 label={I18n.t("Input.order.money.Tiền hàng")}
                                 name="money"
                                 disabled={true}
                                 defaultValue={`${Number(number) * Number(moneyNew)}` || `${this.getData(data, 'money', '')}`}
                                 onChange={(value) => this.onHandleChange(value, 'money')}
                              />
                           </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
                           <Grid item xs={4}>
                              <TextField
                                 fullWidth
                                 validate={this.validate.usersName}
                                 label={I18n.t("Input.order.name.Tên khách hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'name')}
                                 value={this.getData(data, 'name', '')}
                                 name="name"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 fullWidth
                                 validate={this.validate.phone}
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
                                 validate={this.validate.address}
                                 label={I18n.t("Input.order.address.Địa chỉ")}
                                 onChange={(value) => this.onHandleChange(value, 'address')}
                                 value={this.getData(data, 'address', '')}
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
                                 defaultValue={this.getData(data, 'status', '')}
                                 isClearable={false}
                              >
                                 {
                                    statusOrder.map(item => (
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
                                 defaultValue={this.getData(data, 'pay', '')}
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
                                 validate={this.validate.note}
                                 defaultValue={this.getData(data, 'note', '')}
                                 label={I18n.t("Input.order.note.Ghi chú")}
                                 onChange={(value) => this.onHandleChange(value, 'note')}
                                 name="note"
                              />
                           </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
                           <Grid item xs={3}>
                              <MoneyField
                                 fullWidth
                                 label={I18n.t("Input.order.amount.Tiền thu về thực tế")}
                                 name="amount"
                                 defaultValue={this.getData(data, 'amount', '')}
                                 onChange={(value) => this.onHandleChange(value, 'amount')}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <MoneyField
                                 fullWidth
                                 label={I18n.t("Input.order.moneyImportGoods.Tiền nhập hàng")}
                                 name="moneyImportGoods"
                                 defaultValue={moneyImportGoods}
                                 onChange={(value) => this.onHandleChange(value, 'moneyImportGoods')}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <MoneyField
                                 fullWidth
                                 label={I18n.t("Input.order.cost.Chi phí")}
                                 name="cost"
                                 defaultValue={this.getData(data, 'cost', '')}
                                 onChange={(value) => this.onHandleChange(value, 'cost')}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <MoneyField
                                 fullWidth
                                 label={I18n.t("Input.order.profit.Lợi nhuận")}
                                 name="profit"
                                 defaultValue={this.getData(data, 'profit', '')}
                                 onChange={(value) => this.onHandleChange(value, 'profit')}
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