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
import Page from './Page'
import ViewDetail from './ViewDetail'
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

let img = 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg'

let arrImg = [
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   {
      // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
      img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
      code: 'S51',
      title: 'Giường hiện đại S51',
      money: '2.500.000 đ'
   },
   // {
   //    img: 'https://noithatami.com/wp-content/uploads/2018/10/giuong-ngu-co-ngan-keo.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'https://thumuabanghe.vn/wp-content/uploads/2017/11/giuong-go-1m6-gia-re.png',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'https://noithatami.com/wp-content/uploads/2018/10/giuong-ngu-co-ngan-keo.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'https://thumuabanghe.vn/wp-content/uploads/2017/11/giuong-go-1m6-gia-re.png',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'https://vietba.vn/wp-content/uploads/2019/06/giuong-ngu-co-ngan-keo.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'https://noithatminhtri.com/wp-content/uploads/2017/11/Mau-giuong-ngu-dep-bang-go-cong-nghiep-cao-cap-GN-15.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'http://sofabella.vn/wp-content/uploads/2015/03/GIUONG-NGu-B1240.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'http://dongtrieunhatrang.com/wp-content/uploads/2019/05/Gi%C6%B0%E1%BB%9Dng-g%E1%BB%97-Xoan-01.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'https://funismart.com/wp-content/uploads/giuong-go-2-trieu-theo-mau-fngn2m.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'http://noithatamia.com/wp-content/uploads/anh-dai-dien-mau-giuong-ngu-go-mau-trang-dep-tai-amia-600x563.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'http://vilahome.com.vn/wp-content/uploads/2018/05/Mau-giuong-da-nang-thong-minh-hien-dai-1.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
   // {
   //    img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
   //    code: 'S51',
   //    title: 'Giường hiện đại S51',
   //    money: '2.500.000 đ'
   // },
]

class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
         open: false,
         dataGoods: {},
      }
      this.onCancel = this.onCancel.bind(this)
      this.onShow = this.onShow.bind(this)
      this.onHide = this.onHide.bind(this)
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

   renderNature() {
      let { classes } = this.props
      return (
         <span>
            <img src={tunhien} height='80' width='450' />
            {/* <Page classes={classes} /> */}
            <Grid container spacing={16}>
               {
                  arrImg.map((element, index) => {
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
                                 image={element.img}
                                 title={element.title}
                              />
                              <CardContent>
                                 <Typography style={{ textAlign: 'center' }} color="primary">
                                    {element.title}
                                 </Typography>
                                 <Typography style={{ textAlign: 'center', color: 'red' }}>
                                    {element.money}
                                 </Typography>
                              </CardContent>
                           </CardActionArea>
                        </Grid>
                     )
                  })
               }
            </Grid>
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
            maxWidth='md'
            aria-labelledby="draggable-dialog-title"
         >
            <DialogContent>
               <ViewDetail
                  // dataGoods={dataGoods}
                  // classes={classes}
                  // onSubmit={onSubmit}
               />
            </DialogContent>
            <DialogActions>
               <Button color='primary' onClick={() => this.onCancel()}>
                  Hủy bỏ
               </Button>
               <Button color='primary' type='submit' autoFocus>
                  Gửi
               </Button>
            </DialogActions>

         </Dialog>
      )
   }

   render() {
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