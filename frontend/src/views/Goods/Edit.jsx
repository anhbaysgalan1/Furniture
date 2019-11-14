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
            name: '',
            code: '',
            image1: '',
            image2: '',
            image3: '',
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
      let { dataInput } = this.state
      this.setState({
         dataInput: { ...this.state.dataInput, [name]: value }
      })
   }

   render() {
      const { classes, onSubmit, data } = this.props
      let { dataInput } = this.state
      let image1 = _.get(data, 'image1', '')
      let image2 = _.get(data, 'image2', '')
      let image3 = _.get(data, 'image3', '')
      let image4 = _.get(data, 'image4', '')
      let code = _.get(data, 'code', '')
      let typeGood = _.get(data, 'typeGoods', '')
      let typeItem = _.get(data, 'typeItem', '')
      let name = _.get(data, 'name', '')
      let moneyOld = _.get(data, 'moneyOld', '')
      let moneyNew = _.get(data, 'moneyNew', '')
      let typeWood = _.get(data, 'typeWood', '')
      let content = _.get(data, 'content', '')
      let typeGoods = [
         {
            name: "Giường ngủ",
            value: '1'
         },
         {
            name: "Tủ Quần áo",
            value: '2'
         },
         {
            name: "Bàn phòng khách",
            value: '3'
         },
         {
            name: "Bàn trà",
            value: '4'
         },
         {
            name: "Tủ giày",
            value: '4'
         }
      ]
      let typeItems = [
         {
            name: "Giường gỗ tự nhiên",
            value: '1'
         },
         {
            name: "Giường gỗ công nghiệp",
            value: '2'
         },
         {
            name: "Giường gỗ cổ điển",
            value: '3'
         },
         {
            name: "Giường gỗ hiện đại",
            value: '4'
         }
      ]
      let typeWoods = [
         {
            name: 'Tự nhiên cao cấp',
            value: 'TN',
         },
         {
            name: 'Công nghiệp',
            value: 'CN',
         },
         {
            name: 'Sồi Nga',
            value: 'SN',
         },
         {
            name: 'Xoan đào',
            value: 'XS',
         }
      ]

      return (
         // <PaperFade className={classes.paper}>
         <Form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={32}>
               <Grid item lg={1}>
                  <Card>
                     <CardContent>
                        <Typography color='primary'>
                           Xem bài đăng
                                </Typography>
                        <CardActionArea className={classes.imgZoom}>
                           {/* {
                                        dataInput.img && dataInput.name && dataInput.code
                                        ?
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="200"
                                                width="250"
                                                image={dataInput.img}
                                                title={`${dataInput.name} - ${dataInput.code}`}
                                            />
                                        : ''
                                    } */}
                           {/* {
                                        dataInput.moneyOld && dataInput.moneyNew
                                        ?
                                            <CardContent>
                                                <Typography style={{ textAlign: 'center', color: 'red' }}>
                                                    {dataInput.moneyOld} - {dataInput.moneyNew}
                                                </Typography>
                                            </CardContent>
                                        : ''
                                    } */}

                        </CardActionArea>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={10} >
                  <Card className={classes.card}>
                     <CardContent>
                        <Typography variant='h5' color='primary'>
                           Them hang hoa
                        </Typography>
                        <Grid container spacing={32}>
                           <Grid item xs={4}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.typeGoods.Loại hàng hóa")}
                                 onChange={(value) => this.onHandleChange(value, 'typeGoods')}
                                 name="typeGoods"
                                 isMulti={false}
                                 value={typeGood}
                                 isClearable={false}
                              >
                                 {
                                    typeGoods.map(item => (
                                       <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                          {item.name}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                           <Grid item xs={4}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.typeItem.Kiểu hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'typeItem')}
                                 name="typeItem"
                                 value={typeItem}
                                 validate={this.validate.area}
                                 isMulti={false}
                                 isClearable={false}
                              >
                                 {
                                    typeItems.map(item => (
                                       <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                          {item.name}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                           <Grid item xs={4}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.typeWoods.Loại gỗ")}
                                 onChange={(value) => this.onHandleChange(value, 'typeWoods')}
                                 name="typeWoods"
                                 value={typeWood}
                                 value={'TN'}
                                 isMulti={false}
                                 isClearable={false}
                              >
                                 {
                                    typeWoods.map(item => (
                                       <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                          {item.name}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.code")}
                                 onChange={(value) => this.onHandleChange(value, 'code')}
                                 value={code}
                                 name="code"
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.name")}
                                 onChange={(value) => this.onHandleChange(value, 'name')}
                                 name="name"
                                 value={name}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.moneyOld")}
                                 onChange={(value) => this.onHandleChange(value, 'moneyOld')}
                                 value={moneyOld}
                                 name="moneyOld"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.moneyNew")}
                                 onChange={(value) => this.onHandleChange(value, 'moneyNew')}
                                 name="moneyNew"
                                 value={moneyNew}
                              />
                           </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                           <Grid item xs={6}>
                                 <TextField
                                    fullWidth
                                    label={I18n.t("Input.goods.image1")}
                                    onChange={(value) => this.onHandleChange(value, 'image1')}
                                    value={image1}
                                    name="image1"
                                 />
                                 <TextField
                                    fullWidth
                                    label={I18n.t("Input.goods.image2")}
                                    onChange={(value) => this.onHandleChange(value, 'image2')}
                                    value={image2}
                                    name="image2"
                                 />
                              </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image3")}
                                 onChange={(value) => this.onHandleChange(value, 'image3')}
                                 value={image3}
                                 name="image3"
                              />
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image4")}
                                 onChange={(value) => this.onHandleChange(value, 'image4')}
                                 value={image4}
                                 name="image4"
                              />
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
                                 value={content}
                                 label={I18n.t("Input.goods.content.Nội dung miêu tả")}
                                 onChange={(value) => this.onHandleChange(value, 'content')}
                                 name="content"
                              />
                           </Grid>
                        </Grid>
                     </CardContent>
                     <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto("/goods")}>
                           <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                     </CardActions>
                  </Card>
               </Grid>
               <Grid item lg={1}></Grid>
               <br />
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