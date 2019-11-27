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
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import Previews from './Components/Previews'
import { withRouter } from 'react-router-dom'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'

let promotions = [
   {
      name: 'Không',
      value: '0'
   },
   {
      name: 'Có',
      value: '1'
   }
]

let typeGoods = [
   {
      name: "Giường ngủ",
      value: "0",
      typeItems: [
         {
            name: "Giường ngủ hiện đại",
            value: "0"
         }, {
            name: "Giường ngủ cổ điển",
            value: "1"
         }, {
            name: "Giường ngủ gỗ tự nhiên cao cấp",
            value: "2"
         }, {
            name: "Giường ngủ gỗ công nghiệp",
            value: "3"
         }
      ],
      typeWoods: [
         {
            name: "Sồi nga",
            value: "0",
         }, {
            name: "Xoan đào",
            value: "1",
         }, {
            name: "Công nghiệp",
            value: "2",
         }
      ]
   }, {
      name: "Bàn ăn",
      value: "1",
      typeItems: [
         {
            name: "Bàn ăn hiện đại",
            value: "0"
         }, {
            name: "Bàn ăn cổ điển",
            value: "1"
         }, {
            name: "Bàn ăn 4 ghế",
            value: "2"
         }, {
            name: "Bàn ăn 6 ghế",
            value: "3"
         }, {
            name: "Bàn ăn 8 ghế",
            value: "4"
         }, {
            name: "Bàn ăn tròn",
            value: "5"
         },
      ],
      typeWoods: [
         {
            name: "Sồi nga",
            value: "0",
         }, {
            name: "Xoan đào",
            value: "1",
         }, {
            name: "Công nghiệp",
            value: "2",
         }
      ]
   }, {
      name: "Tủ Quần áo",
      value: "2",
      typeItems: [
         {
            name: "Tủ quần áo hiện đại",
            value: "0"
         }, 
         {
            name: "Tủ quần áo gỗ tự nhiên",
            value: "1"
         }, 
         {
            name: "Tủ quần áo gỗ công nghiệp",
            value: "2"
         }, 
         {
            name: "Tủ quần áo 2 cánh",
            value: "3"
         }, 
         {
            name: "Tủ quần áo 3 cánh",
            value: "4"
         }
      ],
      typeWoods: [
         {
            name: "Sồi nga",
            value: "0"
         }, {
            name: "Xoan đào",
            value: "1"
         }, {
            name: "Công nghiệp",
            value: "2"
         }
      ]
   }, {
      name: "Bàn trà phòng khách",
      value: "3",
      typeItems: [
         {
            name: "Bàn trà hiện đại",
            value: "0"
         }, {
            name: "Bàn trà cổ điển",
            value: "1"
         }
      ],
      typeWoods: [
         {
            name: "Sồi nga",
            value: "0",
         }, {
            name: "Xoan đào",
            value: "1",
         }, {
            name: "Công nghiệp",
            value: "2",
         }
      ]
   }, {
      name: "Tủ giày",
      value: "4",
      typeItems: [
         {
            name: "Tủ giày hiện đại",
            value: "0"
         }, {
            name: "Tủ giày cổ điển",
            value: "1"
         }
      ],
      typeWoods: [
         {
            name: "Sồi nga",
            value: "0",
         }, {
            name: "Xoan đào",
            value: "1",
         }, {
            name: "Công nghiệp",
            value: "2",
         }
      ]
   }
]

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
         name: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(255, I18n.t("Form.maxLeng255"))
         ],
         permission: [
            Validation.required(I18n.t("Form.required"))
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
   renderDetail() {
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
                  dataInput={this.state.dataInput}
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
      const { classes, onSubmit } = this.props
      let { dataInput } = this.state
      let disabledPreview = dataInput.image1 && dataInput.image2 && dataInput.image3 && dataInput.image4 ? false : true
      let defaultName = `Tủ quần áo gỗ công nghiệp ` + this.state.dataInput.code //////////////////
      let defaultContent = `Tủ quần áo gỗ công nghiệp ` + this.state.dataInput.code //////////////////
      let defaultImage = this.state.dataInput.image1
      let typeItems = []
      let typeWoods = []
      typeGoods.map((item, index) => {
         let typeGoods = _.get(this.state, 'dataInput.typeGoods', '')
         if(item.value == typeGoods){
            typeItems = item.typeItems
            typeWoods = item.typeWoods
         }
      })
      return (
         <Form className={classes.form} onSubmit={onSubmit}>
            {
               this.renderDetail() 
            }
            <Grid container spacing={32}>
               <Grid item xs={1} lg={1}></Grid>
               <Grid item xs={10}>
                  <Card className={classes.card}>
                     <CardContent>
                        <Typography variant='h5' color='primary'>
                           Them hang hoa
                        </Typography>
                        <Grid container spacing={32}>
                           <Grid item xs={3}>
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.typeGoods.Loại hàng hóa")}
                                 onChange={(data) => this.onHandleChange(data.value, 'typeGoods')}
                                 name="typeGoods"
                                 // defaultValue='0'
                                 isMulti={false}
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
                                 label={I18n.t("Input.goods.typeItem.Kiểu hàng")}
                                 onChange={(data) => this.onHandleChange(data.value, 'typeItem')}
                                 name="typeItem"
                                 isDisabled={ typeItems.length ? false : true }
                                 isMulti={false}
                                 defaultValue='2' /////////////////////////
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
                                 label={I18n.t("Input.goods.typeWoods.Loại gỗ")}
                                 onChange={(data) => this.onHandleChange(data.value, 'typeWoods')}
                                 name="typeWoods"
                                 defaultValue='0'
                                 isDisabled={ typeWoods.length ? false : true }
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
                                 label={I18n.t("Input.goods.code.Mã hàng")}
                                 onChange={(data) => this.onHandleChange(data, 'code')}
                                 defaultValue='TQACN' //////////////////////
                                 name="code"
                              />
                           </Grid>
                           <Grid item xs={5}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.name.Tên Hàng")}
                                 onChange={(data) => this.onHandleChange(data, 'name')}
                                 defaultValue={defaultName}
                                 name="name"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <MoneyField
                                 fullWidth
                                 label={I18n.t("Input.goods.moneyOld.Giá bán cũ")}
                                 name="moneyOld"
                                 defaultValue="4500000"
                                 onChange={(data) => this.onHandleChange(data, 'moneyOld')}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <MoneyField
                                 fullWidth
                                 label={I18n.t("Input.goods.moneyNew.Giá bán mới")}
                                 name="moneyNew"
                                 defaultValue="3500000"
                                 onChange={(data) => this.onHandleChange(data, 'moneyNew')}
                              />
                           </Grid>
                        </Grid>
                       
                        <Grid container spacing={32}>
                           <Grid item xs={6}>
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image1")}
                                 onChange={(data) => this.onHandleChange(data, 'image1')}
                                 name="image1"
                              />
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image2")}
                                 onChange={(data) => this.onHandleChange(data, 'image2')}
                                 name="image2"
                                 defaultValue={defaultImage}
                              />
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image3")}
                                 onChange={(data) => this.onHandleChange(data, 'image3')}
                                 name="image3"
                                 defaultValue={defaultImage}
                              />
                              <TextField
                                 fullWidth
                                 label={I18n.t("Input.goods.image4")}
                                 onChange={(data) => this.onHandleChange(data, 'image4')}
                                 name="image4"
                                 defaultValue={defaultImage}
                              />
                              <AutoCompleteField
                                 key="1"
                                 fullWidth
                                 select
                                 label={I18n.t("Input.goods.promotion.Khuyến mại")}
                                 onChange={(data) => this.onHandleChange(data.value, 'promotion')}
                                 name="promotion"
                                 isMulti={false}
                                 isClearable={false}
                                 value="1"
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
                                 rows={16}
                                 rowsMax={25}
                                 variant="outlined"
                                 fullWidth
                                 defaultValue={defaultContent}
                                 label={I18n.t("Input.goods.content.Nội dung miêu tả")}
                                 onChange={(data) => this.onHandleChange(data, 'content')}
                                 name="content"
                              />
                           </Grid>
                        </Grid>
                     </CardContent>
                     <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto("/goods")}>
                           <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button disabled={disabledPreview} variant="contained" color="primary" onClick={() => this.onShow()}>
                           {I18n.t("Button.previews")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                     </CardActions>
                  </Card>
               </Grid>
               <Grid item xs={1} lg={1}></Grid>
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

