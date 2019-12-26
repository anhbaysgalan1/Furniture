import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation, MoneyField} from 'components/Forms'
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
import { typeClient } from '../../config/constant'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'

const styles = theme => ({
   paper: {
      // padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   },
   card: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   },
   form: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
      // padding: '10px 10px 10px 10px'
   },
   imgZoom: {
      transition: "transform .5s, filter 3s ease-in-out",
      filter: "grayscale(100%)",
   },
   imgZoom: {
      "&:hover": {
         filter: "grayscale(0)",
         transform: "scale(1.1)",
         transitionDuration: "1s",
         transitionTimingFunction: "linear",
      }
   },
})
class Create extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         dataInput: {
         }
      }
      this.onHandleChange = this.onHandleChange.bind(this)
      this.validate = {
         code: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(10, I18n.t("Form.maxLeng10"))
         ], 
         name: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(30, I18n.t("Form.maxLeng30"))
         ],
         phone: [
            Validation.required(I18n.t("Form.required")),
         ],
         address: [
            Validation.maxLength(100, I18n.t("Form.maxLeng100"))
         ],
         mail: [
            Validation.maxLength(30, I18n.t("Form.maxLeng30"))
         ],
      }
   }

   formatPhoneNumber = (value) => {
      return this.phoneFormatter(value)
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


   onHandleChange(value, name) {
      this.setState({
         dataInput: { ...this.state.dataInput, [name]: value }
      })
   }

   render() {
      const { classes, onSubmit, data, goods = [] } = this.props
      let typeClient = [
         {
            title: "Khách lẻ",
            value: '0',
         },
         {
            title: "Khách buôn",
            value: '1',
         },
         {
            title: "Đối tác",
            value: '2',
         }
      ]
      // note: "Sư huynh"
      let type = _.get(data, 'type', '')
      let code = _.get(data, 'code', '')
      let name = _.get(data, 'name', '')
      let phone = _.get(data, 'phone', '')
      let mail = _.get(data, 'mail', '')
      let address = _.get(data, 'address', '')
      let number = _.get(data, 'number', '')
      let money = _.get(data, 'money', '')
      let note = _.get(data, 'note', '')
      let goodsIds = _.get(data, 'goodsIds', [])

      return (
         // <PaperFade className={classes.paper}>
         <Form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={32}>
               <Grid item xs={1}></Grid>
               <Grid item xs={10}>
                  <Card className={classes.card}>
                     <CardContent>
                        <Typography variant='h5' color='primary'>
                           Thêm khách hàng
                                </Typography>
                        <Grid container spacing={32}>
                           <Grid item xs={3}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.Loại khách hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'type')}
                                 name="type"
                                 isMulti={false}
                                 value={type}
                                 isClearable={false}
                              >
                                 {
                                    typeClient.map(item => (
                                       <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                          {item.title}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                           <Grid item xs={3}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.Mã khách hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'code')}
                                 name="code"
                                 validate={this.validate.code}
                                 value={code}
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.Tên khách hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'name')}
                                 name="name"
                                 validate={this.validate.name}
                                 value={name}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.Số điện thoại")}
                                 onChange={(value) => this.onHandleChange(value, 'img')}
                                 name="phone"
                                 value={phone}

                                 formatData={(value) => this.formatPhoneNumber(value || phone)}
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
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <TextField
                                 fullWidth
                                 validate={this.validate.mail}
                                 label={I18n.t("Input.goods.Mail")}
                                 onChange={(value) => this.onHandleChange(value, 'mail')}
                                 name="mail"
                                 value={mail}
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.Địa chỉ")}
                                 validate={this.validate.address}
                                 onChange={(value) => this.onHandleChange(value, 'address')}
                                 name="address"
                                 value={address}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.Số lần mua hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'number')}
                                 name="number"
                                 value={number}
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
                                 label={I18n.t("Input.goods.Tổng tiền")}
                                 name="money"
                                 defaultValue={money}
                                 onChange={(value) => this.onHandleChange(value, 'money')}
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <AutoCompleteField
                                 key="1"
                                 isClearable={false}
                                 fullWidth
                                 select
                                 value={goodsIds || []}
                                 hideSelectedOptions={true}
                                 name="goodsIds"
                                 label={I18n.t('Input.goodsIds.Hàng đã mua')}
                                 onChange={(value) => this.onHandleChange(value, "goodsIds")}
                                 isMulti={true}
                              >
                                 {
                                    goods.map(option => (
                                       <OptionAuto key={option._id} value={option._id} showCheckbox={false}>
                                          {option.name}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                           <Grid item xs={12}>
                              <TextField
                                 multiline
                                 rows={4}
                                 rowsMax={8}
                                 variant="outlined"
                                 fullWidth
                                 validate={this.validate.note}
                                 label={I18n.t("Input.goods.content.Ghi chú khách hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'note')}
                                 name="note"
                                 value={note}
                                 
                              />
                           </Grid>
                        </Grid>
                     </CardContent>
                     <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto("/client")}>
                           <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                     </CardActions>
                  </Card>
               </Grid>
               <Grid item xs={1}></Grid>
            </Grid>
         </Form>
         // </PaperFade>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))
