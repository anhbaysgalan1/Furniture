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
   CardHeader,


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
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
   }
})

class Create extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
         data: {
            name: '',
            phone: '',
            address: '',
            goodsId: '',
            number: '1',
            money: '0',
            status: '',
            pay: '',
            content: ''
         },
         moneyOut: [{ item: '1' }],
         moneyIn: [{ item: '0' }]
      }

      this.onHandleChange = this.onHandleChange.bind(this)
      this.addMoneyOut = this.addMoneyOut.bind(this)
      this.addMoneyIn = this.addMoneyIn.bind(this)
      this.signMoneyOut = this.signMoneyOut.bind(this)
      this.signMoneyIn = this.signMoneyIn.bind(this)
      this.validate = {
         name: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(255, I18n.t("Form.maxLeng255"))
         ],
         permission: [
            Validation.required(I18n.t("Form.required"))
         ],
      }
   }

   addMoneyOut() {
      let { moneyOut } = this.state || []
      let element = {
         item: '1'
      }
      moneyOut.push(element)
      this.setState({ moneyOut: moneyOut })
      this.setState({ reload: !this.state.reload })
   }
   addMoneyIn() {
      let { moneyIn } = this.state || []
      let element = {
         item: '0'
      }
      moneyIn.push(element)
      this.setState({ moneyIn: moneyIn })
      this.setState({ reload: !this.state.reload })
   }
   signMoneyOut(index) {
      let { moneyOut } = this.state || []
      moneyOut.splice(index, 1)
      this.setState({ moneyOut: moneyOut })
      this.setState({ reload: !this.state.reload })
   }
   signMoneyIn(index) {
      let { moneyIn } = this.state || []
      moneyIn.splice(index, 1)
      this.setState({ moneyIn: moneyIn })
      this.setState({ reload: !this.state.reload })
   }

   onHandleChange(value, name) {
      this.setState({ data: { ...this.state.data, [name]: value } })
      this.setState({ reload: !this.state.reload })
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

   render() {
      const { classes, onSubmit, goods = [] } = this.props
      let { data } = this.state
      let goodsId = _.get(data, 'goodsId', '')
      let number = Number(_.get(this.state, 'data.number', '1'))
      let moneyNew = 0
      let moneyOld = ''
      let image = ''
      let nameGoods = ''
      let codeGoods = ''
      goods.map(item => {
         if (item._id == goodsId) {
            moneyOld = _.get(item, 'moneyOld', '')
            moneyNew = _.get(item, 'moneyNew', '')
            nameGoods = _.get(item, 'name', '')
            codeGoods = _.get(item, 'code', '')
            image = _.get(item, 'image1', '')
         }
      })
      let { moneyOut, moneyIn } = this.state
      return (
         <Form className={classes.paper} onSubmit={onSubmit}>
            <Grid container spacing={8}>
               <Grid item xs={1}></Grid>
               <Grid item xs={10}>
                  <Card>
                     <CardContent>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={8}>
                           <Grid item xs={4}>
                              <Typography color='primary' variant='h6'>
                                 Nội chi tiêu
                              </Typography>
                           </Grid>
                           <Grid item xs={4}>
                              <TextField
                                 fullWidth
                                 margin='none'
                                 label={I18n.t("Input.finance.date.Ngày")}
                                 name="date"
                              />
                           </Grid>
                           <Grid item xs={4}>
                              <IconButton style={{ marginTop: '30px' }} color='primary' onClick={() => this.addMoneyOut()}>
                                 <Icon>add_circle_outline</Icon>
                              </IconButton>
                           </Grid>
                        </Grid>
                        {
                           moneyOut.map((item, index) => {
                              return (
                                 <Grid key={index} container direction="row" alignItems="center" spacing={8}>
                                    <Grid item xs={3}>
                                       <TextField
                                          fullWidth
                                          label={I18n.t("Input.finance.date.Người thanh toán tiền")}
                                          onChange={(value) => this.onHandleChange(value, 'user')}
                                          name="user"
                                       />
                                    </Grid>
                                    <Grid item xs={6}>
                                       <TextField
                                          fullWidth
                                          multiline={true}
                                          label={I18n.t("Input.finance.date.Nội dung thanh toán")}
                                          onChange={(value) => this.onHandleChange(value, 'content')}
                                          name="content"
                                       />
                                    </Grid>
                                    <Grid item xs={2}>
                                       <MoneyField
                                          fullWidth
                                          label={I18n.t("Input.finance.money.Số tiền")}
                                          name="money"
                                          defaultValue={`${number * Number(moneyNew)}`}
                                          onChange={(value) => this.onHandleChange(value, 'money')}
                                       />
                                    </Grid>
                                    <Grid item xs={1}>
                                       <IconButton onClick={() => this.signMoneyOut(index)} style={{ marginTop: '30px' }}>
                                          <Icon style={{ color: 'red' }} >delete</Icon>
                                       </IconButton>
                                    </Grid>
                                 </Grid>
                              )
                           })
                        }
                     </CardContent>
                     <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto("/finance")}>
                           <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                     </CardActions>
                  </Card>
                  <br />
                  <Card>
                     <CardContent>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={8}>
                           <Grid item xs={4}>
                              <Typography color='primary' variant='h6'>
                                 Nội chi tiêu
                              </Typography>
                           </Grid>
                           <Grid item xs={4}>
                              <TextField
                                 fullWidth
                                 margin='none'
                                 label={I18n.t("Input.finance.date.Ngày")}
                                 name="date"
                              />
                           </Grid>
                           <Grid item xs={4}>
                              <IconButton style={{ marginTop: '30px' }} color='primary' onClick={() => this.addMoneyIn()}>
                                 <Icon>add_circle_outline</Icon>
                              </IconButton>
                           </Grid>
                        </Grid>
                        {
                           moneyIn.map((item, index) => {
                              return (
                                 <Grid key={index} container direction="row" alignItems="center" spacing={8}>
                                    <Grid item xs={3}>
                                       <TextField
                                          fullWidth
                                          label={I18n.t("Input.finance.date.Người thanh toán tiền")}
                                          onChange={(value) => this.onHandleChange(value, 'user')}
                                          name="user"
                                       />
                                    </Grid>
                                    <Grid item xs={6}>
                                       <TextField
                                          fullWidth
                                          multiline={true}
                                          label={I18n.t("Input.finance.date.Nội dung thanh toán")}
                                          onChange={(value) => this.onHandleChange(value, 'content')}
                                          name="content"
                                       />
                                    </Grid>
                                    <Grid item xs={2}>
                                       <MoneyField
                                          fullWidth
                                          label={I18n.t("Input.finance.money.Số tiền")}
                                          name="money"
                                          defaultValue={`${number * Number(moneyNew)}`}
                                          onChange={(value) => this.onHandleChange(value, 'money')}
                                       />
                                    </Grid>
                                    <Grid item xs={1}>
                                       <IconButton onClick={() => this.signMoneyIn(index)} style={{ marginTop: '30px' }}>
                                          <Icon style={{ color: 'red' }} >delete</Icon>
                                       </IconButton>
                                    </Grid>
                                 </Grid>
                              )
                           })
                        }
                     </CardContent>
                     <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto("/finance")}>
                           <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                     </CardActions>
                  </Card>
               </Grid>
               <Grid item xs={1}></Grid>
            </Grid>
         </Form>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))