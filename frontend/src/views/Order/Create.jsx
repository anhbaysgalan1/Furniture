import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
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

const styles = theme => ({
   paper: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
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
         data: {
            name: '',
            code: '',
            image1: '',
            image2: '',
            image2: '',
            image4: '',
            moneyOld: '',
            moneyNew: '',
            typeGoods: '',
            typeWoods: '',
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
   }

   onHandleChange(value, name) {
      let { data } = this.state
      this.setState({
         data: { ...this.state.data, [name]: value }
      })
   }

   render() {
      const { classes, onSubmit, goods = [] } = this.props
      let { data } = this.state
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
      let status = [
         {
            name: 'Chưa thanh toán',
            _id: '0'
         },
         {
            name: 'Đã thanh toán',
            _id: '1'
         }
      ]

      return (
         <Form className={classes.paper} onSubmit={onSubmit}>
            <Card>
               <CardContent>
                  <Grid container spacing={32}>
                     <Grid item xs={3} lg={3}>
                        <Typography color='primary'>
                           Xem đơn hàng
                        </Typography>
                        <CardActionArea className={classes.imgZoom}>
                           {
                              data.img && data.name && data.code
                                 ?
                                 <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    width="250"
                                    image={data.img}
                                    title={`${data.name} - ${data.code}`}
                                 />
                                 : ''
                           }
                           {
                              data.moneyOld && data.moneyNew
                                 ?
                                 <CardContent>
                                    <Typography style={{ textAlign: 'center', color: 'red' }}>
                                       {data.moneyOld} - {data.moneyNew}
                                    </Typography>
                                 </CardContent>
                                 : ''
                           }

                        </CardActionArea>
                     </Grid>
                     <Grid item xs={9}>
                        <Grid container spacing={16}>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.name.Tên khách hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'name')}
                                 name="name"
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.phone.SĐT")}
                                 onChange={(value) => this.onHandleChange(value, 'phone')}
                                 name="phone"
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.order.goodsId.Tên Hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'goodsId')}
                                 name="goodsId"
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
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.money.Tổng tiền")}
                                 onChange={(value) => this.onHandleChange(value, 'money')}
                                 name="money"
                              />
                           </Grid>

                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.order.address.Địa chỉ")}
                                 onChange={(value) => this.onHandleChange(value, 'address')}
                                 name="address"
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <AutoCompleteField
                                 key="2"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.order.status.Trạng thái đơn hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'status')}
                                 name="status"
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
                           <Grid item xs={3}>
                              <AutoCompleteField
                                 key="3"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.order.pay.Hình thức thanh toán")}
                                 onChange={(value) => this.onHandleChange(value, 'pay')}
                                 name="pay"
                                 isMulti={false}
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
                           <Grid item xs={12}>
                              <TextField
                                 multiline
                                 rows={4}
                                 rowsMax={8}
                                 variant="outlined"
                                 fullWidth
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