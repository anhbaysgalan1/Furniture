import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
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
   Toolbar,
   CardActionArea,
   CardMedia,
   Avatar,
   Dialog,
   DialogContent,
   DialogActions,
   DialogContentText,
   DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import tunhien from '../../../public/tunhien.png'
import congnghiep from '../../../public/congnghiep.png'
import hiendai from '../../../public/hiendai.png'
import codien from '../../../public/codien.png'
import OrderGoods from '../../OrderGoods/OrderGoods'
import _ from 'lodash'

const styles = theme => ({
   title: {
      padding: '5px',
      backgroundColor: '#039be5',
      color: 'white',
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


class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
         open: false,
         dataGoods: {},
         itemPrimary: 0,
      }
      this.onCancel = this.onCancel.bind(this)
      this.onShow = this.onShow.bind(this)
      this.onHide = this.onHide.bind(this)
      this.setPage = this.setPage.bind(this)
      this.additionPage = this.additionPage.bind(this)
      this.minusPage = this.minusPage.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
   }

   onSubmit(values){
      this.props.onSubmit(values)
      this.onHide()
   }

   onShow(element){
      this.setState({ open: true, dataGoods: element })
      this.setState({ reload: !this.state.reload })
   }
   onHide(){
      this.setState({ open: false })
   }
   onCancel(){
      this.onHide()
   }

   setPage(index){
      this.setState({ itemPrimary: index })
      this.setState({ reload: !this.state.reload })
   }

   additionPage(arrLength){
      if(this.state.itemPrimary < arrLength - 1){
         this.setState({ itemPrimary: this.state.itemPrimary + 1 })
         this.setState({ reload: !this.state.reload })
      }
   }

   minusPage(){
      if(this.state.itemPrimary >  0){ 
         this.setState({ itemPrimary: this.state.itemPrimary - 1 })
         this.setState({ reload: !this.state.reload })
      }
   }
   
   renderPage(numberImg, numberPage){
      let arr = []
      for ( let e = 0; e < numberPage ; ++e ){
         let element = {
            element: '',
         }
         arr.push(element)
      }
      let { itemPrimary } = this.state
     
      return (
         <span>
            <Button color='primary' variant='outlined' onClick={() => this.minusPage()} > 
               <Icon>arrow_back_ios</Icon> 
            </Button> 
            {
               arr.map((item, index) => {
                  return (
                     <Button 
                        key={index} color='primary' 
                        variant={ itemPrimary == index ? 'contained' : 'outlined'}
                        onClick={() => this.setPage(index)}
                     >
                        {index + 1} 
                     </Button>
                  )
               })
            }
            <Button color='primary' variant='outlined' onClick={() => this.additionPage(arr.length)} > 
               <Icon>arrow_forward_ios</Icon> 
            </Button> 
         </span>
      )
   }

   setMinMaxImage(itemPrimary, numberImg){
      let minImage = 0
      let maxImage = 11
      if (itemPrimary != 0){
         minImage = numberImg * itemPrimary
         maxImage = numberImg * (itemPrimary + 1) - 1
      }
      return {
         minImage: minImage,
         maxImage: maxImage,
      }
   }

   renderNature() {
      let { classes, goods = [] } = this.props
      let converGoods = []
      goods.map(item => {
         let typeGoods = _.get(item, 'typeGoods', '')
         if(typeGoods == "1"){
            converGoods.push(item)
         }
      })
      let numberImg = 12 // số ảnh muốn hiện
      let numberPage = parseInt(converGoods.length/numberImg) // Số trang phân
      if(converGoods.length%numberImg){
         numberPage = numberPage + 1
      }
      let button = this.renderPage(numberImg, numberPage)
      let { itemPrimary } = this.state // Số trang 
      let minImage = this.setMinMaxImage(itemPrimary, numberImg).minImage
      let maxImage = this.setMinMaxImage(itemPrimary, numberImg).maxImage

      return (
         <span>
            {/* <img src={tunhien} height='80' width='450' /> */}
            <Typography variant='h5' className={classes.title}>
               Bàn ăn tất cả
            </Typography>
            <br></br>
            {button}
            <br></br><br></br>
            <Grid container spacing={16}>
               {
                  converGoods.map((element, index) => {
                     if((index >= minImage) && (index <= maxImage)) {
                        return (
                           <Grid item xs={3} key={index}>
                              <CardActionArea
                                 className={classes.imgZoom}
                                 onClick={() => this.onShow(element)}
                              >
                                 <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    image={element.image1}
                                 />
                                 <CardContent>
                                    <Typography variant='h4' >
                                       {index}
                                    </Typography>
                                    <Typography style={{ textAlign: 'center' }} color="primary" variant='h6' >
                                       {element.name}
                                    </Typography>
                                    <Typography style={{ textAlign: 'center', color: 'red' }}>
                                       {element.moneyNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                                    </Typography>
                                    <del>
                                       <Typography style={{ textAlign: 'center' }}>
                                          {element.moneyOld.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                                       </Typography>
                                    </del>
                                 </CardContent>
                              </CardActionArea>
                           </Grid>
                        )
                     } else 
                        return ''
                  })
               }
            </Grid> 
            <br></br><br></br>
            {button}
         </span>
      )
   }

   renderDetail() {
      let { dataGoods } = this.state
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
               <OrderGoods 
                  dataGoods={dataGoods}
                  // classes={classes}
                  onSubmit={this.onSubmit}
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
      let { classes } = this.props 
      return (
         <span>
            {
               this.renderDetail()
            }
            {
               this.renderNature()
            }
         </span>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))