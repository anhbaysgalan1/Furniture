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
         dataInput: {
            name: '',
            phone: '',
            address: '',
            number: '1',
            pay: '',
         }
      }
      this.setIndex = this.setIndex.bind(this)
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
      let { onSubmit, dataGoods } = this.props
      let { indexButton, viewsOrder } = this.state
      let _id = _.get(dataGoods, '_id', '')
      let moneyNew = _.get(dataGoods, 'moneyNew', '')
      let code = _.get(dataGoods, 'code', '')
      let name = _.get(dataGoods, 'name', '')
      let content = _.get(dataGoods, 'content', '')
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
      let number = _.get(this.state, 'dataInput.number', '1')
      return (
         <Form onSubmit={onSubmit} >
            <Grid container spacing={8}>
               <Grid item xs={7}>
                  <Typography variant="h6" color="primary" style={{ textAlign: 'center' }}>
                     {name} - {moneyNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </Typography>
               </Grid>
               <Grid item xs={5}>
                  <Typography variant="h6" color="primary" style={{ textAlign: 'center' }}>
                     <Icon color='primary'>phone</Icon> 0377 535 717
                  </Typography>
               </Grid>
            </Grid>
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
                  <TextField
                     multiline
                     rows={10}
                     rowsMax={15}
                     variant="outlined"
                     fullWidth
                     label={I18n.t("Input.goods.content.Nội dung miêu tả")}
                     onChange={(value) => this.onHandleChange(value, 'content')}
                     name="content"
                     defaultValue={content}
                  />
                  <Typography color='primary' style={{ textAlign: 'center' }}>
                     Nhập thông tin chúng tôi sẽ giao hàng tận nơi
                  </Typography>
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
                           margin='none'
                           fullWidth
                           label={I18n.t("Input.bad.phone.SĐT")}
                           onChange={(value) => this.onHandleChange(value, 'phone')}
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
                     <Grid item xs={12}>
                        <TextField
                           margin='none'
                           fullWidth
                           label={I18n.t("Input.bad.Dia chi giao hang")}
                           onChange={(value) => this.onHandleChange(value, 'address')}
                           name="address"
                        />
                     </Grid>
                     <Grid item xs={6}>
                        <TextField
                           margin='none'
                           fullWidth
                           label={I18n.t("Input.bad.Số lượng")}
                           onChange={(value) => this.onHandleChange(value, 'number')}
                           defaultValue={number}
                           name="number"
                        />
                     </Grid>
                     <Grid item xs={6}>
                        <MoneyField
                           margin='none'
                           fullWidth
                           label={I18n.t("Input.bad.Tổng tiền")}
                           name="money"
                           defaultValue={`${Number(number) * Number(moneyNew)}`}
                           disabled={true}
                           onChange={(value) => this.onHandleChange(value, 'money')}
                        />
                     </Grid>
                     <Grid item xs={12}>
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
                     <Button color='primary' type='submit' variant='contained' > Mua hàng </Button>
                     <Grid item xs={12}>
                        <TextField type="hidden" name="goodsId" value={_id} />
                        <TextField type="hidden" name="status" value='0' />
                        <TextField type="hidden" name="note" defaultValue="" />
                        <TextField type="hidden" name="amount" defaultValue="" />
                        <TextField type="hidden" name="moneyImportGoods" defaultValue="" />
                        <TextField type="hidden" name="cost" defaultValue="" />
                        <TextField type="hidden" name="profit" defaultValue="" />
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Form>
      )
   }
}

App.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))