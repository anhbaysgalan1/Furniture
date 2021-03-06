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
   DialogTitle,
   DialogContent,
   Dialog,
   DialogActions,

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import Previews from './Components/Previews'
import { withRouter } from 'react-router-dom'
import { typeGoods, promotions } from '../../config/constant'
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
         open: false,
         reload: false,
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
            typeItem: '',
            content: '',
            promotion: '',
         }
      }
      this.onCancel = this.onCancel.bind(this)
      this.onShow = this.onShow.bind(this)
      this.onHide = this.onHide.bind(this)
      this.onHandleChange = this.onHandleChange.bind(this)
      this.validate = {
         code: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(10, I18n.t("Form.maxLeng10"))
         ], 
         required: [
            Validation.required(I18n.t("Form.required")),
         ],
         name: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(50, I18n.t("Form.maxLeng50"))
         ],
         image: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(255, I18n.t("Form.maxLeng255"))
         ],
         content: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(1000, I18n.t("Form.maxLeng1000"))
         ],
      }
   }

   onShow(){
      this.setState({ open: true })
      this.setState({ reload: !this.state.reload })
   }
   onHide(){
      this.setState({ open: false })
   }
   onCancel(){
      this.onHide()
   }

   onHandleChange(value, name) {
      this.setState({
         dataInput: { ...this.state.dataInput, [name]: value }
      })
   }

   renderDetail(data) {
      let { classes, onSubmit } = this.props
      return (
         <Dialog
            fullWidth={true}
            onClose={this.onCancel}
            open={this.state.open}
            maxWidth='lg'
            aria-labelledby="draggable-dialog-title"
         >
            <DialogContent>
               <Previews
                  dataInput={data}
                  // classes={classes}
                  // onSubmit={onSubmit}
               />
            </DialogContent>
            <DialogActions>
               <Button color='primary' onClick={() => this.onCancel()}>
                  Thoát
               </Button>
            </DialogActions>
         </Dialog>
      )
   }

   render() {
      const { classes, onSubmit, data } = this.props
      let image1 = _.get(data, 'image1', '')
      let image2 = _.get(data, 'image2', '')
      let image3 = _.get(data, 'image3', '')
      let image4 = _.get(data, 'image4', '')
      let code   = _.get(data, 'code', '')
      let name   = _.get(data, 'name', '')
      let typeGoodsServer = _.get(data, 'typeGoods', '')
      let typeItemServer  = _.get(data, 'typeItem', '')
      let typeWoodsServer = _.get(data, 'typeWoods', '')
      let moneyOld  = _.get(data, 'moneyOld', '')
      let moneyNew  = _.get(data, 'moneyNew', '')
      let content   = _.get(data, 'content', '')
      let promotion = _.get(data, 'promotion', '')
      let typeItems = []
      let typeWoods = []
      typeGoods.map((item, index) => {
         let typeGoodsInput = _.get(this.state, 'dataInput.typeGoods', '') || typeGoodsServer
         let _value = _.get(item, 'value', '')
         let _typeItems = _.get(item, 'typeItem', [])
         let _typeWoods = _.get(item, 'typeWoods', [])
         if(_value == typeGoodsInput){
            typeItems = _typeItems
            typeWoods = _typeWoods
         }
      })
      return (
         <Form className={classes.form} onSubmit={onSubmit}>
            {
               this.renderDetail(data)
            }
            <Grid container spacing={32}>
               <Grid item lg={1}></Grid>
               <Grid item xs={10} >
                  <Card className={classes.card}>
                     <CardContent>
                        <Typography variant='h5' color='primary'>
                           Sua hang hoa
                        </Typography>
                        <Grid container spacing={32}>
                           <Grid item xs={3}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.typeGoods.Loại hàng hóa")}
                                 onChange={(value) => this.onHandleChange(value, 'typeGood')}
                                 name="typeGoods"
                                 isMulti={false}
                                 validate={this.validate.required}
                                 defaultValue={typeGoodsServer}
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
                           <Grid item xs={5}>
                              <AutoCompleteField
                                 key="2"
                                 fullWidth
                                 select
                                 validate={this.validate.required}
                                 label={I18n.t("Input.goods.typeItem.Kiểu hàng")}
                                 onChange={(value) => this.onHandleChange(value, 'typeItem')}
                                 name="typeItem"
                                 defaultValue={typeItemServer}
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
                                 key="3"
                                 fullWidth
                                 select
                                 validate={this.validate.required}
                                 label={I18n.t("Input.goods.typeWoods.Vật liệu")}
                                 onChange={(value) => this.onHandleChange(value, 'typeWoods')}
                                 name="typeWoods"
                                 defaultValue={typeWoodsServer}
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
                           <Grid item xs={3}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.code")}
                                 onChange={(value) => this.onHandleChange(value, 'code')}
                                 value={code}
                                 validate={this.validate.code}
                                 name="code"
                              />
                           </Grid>
                           <Grid item xs={5}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.name")}
                                 validate={this.validate.name}
                                 onChange={(value) => this.onHandleChange(value, 'name')}
                                 name="name"
                                 value={name}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <MoneyField
                                 fullWidth
                                 validate={this.validate.required}
                                 label={I18n.t("Input.goods.moneyOld.Giá bán cũ")}
                                 name="moneyOld"
                                 defaultValue={moneyOld}
                                 onChange={(value) => this.onHandleChange(value, 'moneyOld')}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <MoneyField
                                 fullWidth
                                 validate={this.validate.required}
                                 label={I18n.t("Input.goods.moneyNew.Giá bán mới")}
                                 name="moneyNew"
                                 defaultValue={moneyNew}
                                 onChange={(value) => this.onHandleChange(value, 'moneyNew')}
                              />
                           </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 validate={this.validate.image}
                                 label={I18n.t("Input.goods.image1")}
                                 onChange={(value) => this.onHandleChange(value, 'image1')}
                                 value={image1}
                                 name="image1"
                              />
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image2")}
                                 validate={this.validate.image}
                                 onChange={(value) => this.onHandleChange(value, 'image2')}
                                 value={image2}
                                 name="image2"
                              />
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image3")}
                                 validate={this.validate.image}
                                 onChange={(value) => this.onHandleChange(value, 'image3')}
                                 value={image3}
                                 name="image3"
                              />
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image4")}
                                 validate={this.validate.image}
                                 onChange={(value) => this.onHandleChange(value, 'image4')}
                                 value={image4}
                                 name="image4"
                              />
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.promotion.Khuyến mại")}
                                 onChange={(value) => this.onHandleChange(value, 'promotion')}
                                 name="promotion"
                                 isMulti={false}
                                 isClearable={false}
                                 value={promotion}
                              >
                                 {
                                    promotions.map(item => (
                                       <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                          {item.name}
                                       </OptionAuto>
                                    ))
                                 }
                              </AutoCompleteField>
                           </Grid>
                           <Grid item xs={6}>
                              <TextField
                                 multiline
                                 validate={this.validate.content}
                                 rows={16}
                                 rowsMax={25}
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
                        <Button variant="contained" color="primary" onClick={() => this.onShow()}>
                           {I18n.t("Button.previews")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                     </CardActions>
                  </Card>
               </Grid>
               <Grid item lg={1}></Grid>
               <br />
            </Grid>
         </Form>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))