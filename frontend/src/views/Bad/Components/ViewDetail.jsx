import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation, MoneyField } from 'components/Forms'
import RadioGroupField, { Radio } from 'components/Forms/RadioGroupField'
import FacebookIcon from '@material-ui/icons/Facebook'
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
   DialogTitle,
   Dialog,
   DialogContent,
   DialogContentText,
   DialogActions,
   Toolbar,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
   form: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
   },
})

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         reload: false,
         indexButton: 0,
         viewsOrder: false,
         dataInput: {
            name: '',
            phone: '',
            address: '',
            number: '1',
            pay: '',
            transportFee: '',
         }
      }
      this.setIndex = this.setIndex.bind(this)
      this.setViewOrder = this.setViewOrder.bind(this)
      this.onHandleChange = this.onHandleChange.bind(this)
   }

   onHandleChange(value, name) {
      let { dataInput } = this.state
      this.setState({ dataInput: { ...dataInput, [name]: value } })
      this.setState({ reload: !this.state.reload })
   }

   setIndex(index) {
      this.setState({ indexButton: index })
      this.setState({ reload: !this.state.reload })
   }

   setViewOrder() {
      this.setState({ viewsOrder: true })
      this.setState({ reload: !this.state.reload })
   }

   render() {
      let { onSubmit, dataGoods } = this.props
      let { indexButton, viewsOrder } = this.state
      let moneyNew = _.get(dataGoods, 'moneyNew', '')
      let code = _.get(dataGoods, 'code', '')
      let _id = _.get(dataGoods, '_id', '')
      let name = _.get(dataGoods, 'name', '')
      let image1 = _.get(dataGoods, 'image1', '')
      let image2 = _.get(dataGoods, 'image2', '')
      let image3 = _.get(dataGoods, 'image3', '')
      let image4 = _.get(dataGoods, 'image4', '')
      let img = [
         {
            img: image1
         },
         {
            img: image2
         },
         {
            img: image3
         },
         {
            img: image4
         }
      ]
      console.log("img[indexButton].img", img[indexButton].img)
      let number = Number(_.get(this.state, 'dataInput.number', '1'))
      return (
         <Form onSubmit={onSubmit} >
            <Typography variant="h6">
               {name} - {moneyNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Typography>
            <Grid container spacing={8}>
               <Grid item xs={7}>
                  <center>
                     <img src={img[indexButton].img} height='450' width='550' />
                     <Typography variant="h6">
                        {indexButton}
                     </Typography>
                     <br></br>
                     {
                        img.map((item, index) => {
                           return (
                              <Button
                                 key={index}
                                 style={{ backgroundColor: index == indexButton ? '#eeff41' : '', padding: '2px' }}
                                 onClick={() => this.setIndex(index)}
                              >
                                 <img
                                    key={index}
                                    src={item.img}
                                    height='50'
                                    width='80'
                                 />
                              </Button>
                           )
                        })
                     }
                  </center>
               </Grid>
               <Grid item xs={5}>
                  <Button color='primary' onClick={() => this.setViewOrder() } >
                     Đặt hàng
                  </Button>
               </Grid>
            </Grid>
            {
               viewsOrder ?
                  <span>
                     <Grid container spacing={16} direction="row" alignItems="center">
                        <Grid item xs={6}>
                           <TextField
                              fullWidth
                              label={I18n.t("Input.bad.Tên của bạn")}
                              onChange={(value) => this.onHandleChange(value, 'name')}
                              name="name"
                           />
                        </Grid>
                        <Grid item xs={6}>
                           <TextField
                              fullWidth
                              label={I18n.t("Input.bad.SĐT")}
                              onChange={(value) => this.onHandleChange(value, 'phone')}
                              name="phone"
                           />
                        </Grid>
                        <Grid item xs={12}>
                           <TextField
                              fullWidth
                              label={I18n.t("Input.bad.Dia chi giao hang")}
                              onChange={(value) => this.onHandleChange(value, 'address')}
                              name="address"
                           />
                        </Grid>
                        <Grid item xs={6}>
                           
                           <Grid container spacing={16} direction="row" alignItems="center">
                              <Grid item xs={6}>
                                 <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Số lượng")}
                                    onChange={(value) => this.onHandleChange(value, 'number')}
                                    defaultValue={number}
                                    name="number"
                                 />
                              </Grid>
                              <Grid item xs={6}>
                                 <MoneyField
                                    fullWidth
                                    label={I18n.t("Input.bad.Tổng tiền")}
                                    name="money"
                                    defaultValue={number*Number(moneyNew)}
                                    disabled={true}
                                    onChange={(value) => this.onHandleChange(value, 'money')}
                                 />
                              </Grid>
                           </Grid>
                        </Grid>
                        <Grid item xs={12}>
                           <TextField
                              fullWidth
                              label={I18n.t("Input.bad.Phí vận chuyển")}
                              value="Miễn phí vận chuyển cho đơn hàng trên 5tr"
                              onChange={(value) => this.onHandleChange(value, 'transportFee')}
                              name="transportFee"
                              InputProps={{
                                 readOnly: true,
                              }}
                           />
                           <RadioGroupField name="pay" label={I18n.t("Input.bad.hinh thuc thanh toan")} value="1" fullWidth>
                              <Radio
                                 label="Thanh toán khi nhận hàng"
                                 value="1"
                              />
                              <Radio
                                 label="Chuyển khoản Tbbank (0178 53658 8698)"
                                 value="2"
                              />
                              <Radio
                                 label="Ví điện tử"
                                 value="3"
                              />
                           </RadioGroupField>

                        </Grid>
                        <Grid item xs={12}>
                           <TextField type="hidden" name="goodsId" value={_id} />
                           <TextField type="hidden" name="status" value='0' />   {/* // Trạng thái đơn hàng mặc định là value=0 Mới */}
                        </Grid>
                     </Grid>
                     <Button color='primary' type='submit' > Gửi </Button>
                  </span>
                  : ''
            }

         </Form>
      )
   }
}

App.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))