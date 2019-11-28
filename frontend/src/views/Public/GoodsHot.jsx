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

} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
   card: {
      maxWidth: 300,
   },
   imgZoom: {
      transition: "transform .5s, filter 3s ease-in-out",
      filter: "grayscale(150%)",
   },
   imgZoom: {
      "&:hover": {
         filter: "grayscale(0)",
         transform: "scale(1.1)",
         transitionDuration: "1s",
         transitionTimingFunction: "linear",
      }
   }
})

const img = [
   {
      // img: 'https://noithatdogoviet.com/upload/sanpham/giuong-ngu-co-dien-go-go-do-cham-khac-doi-chim-cong.jpg',
      img: 'http://pokedecor.vn/images/2015/03/28/nha-dep-hon-voi-noi-that-do-go-04.jpg',
      title: 'Hiện đại vuông vắn lịch lãm quý phái',
      content: ''
   },
   {
      // img: 'http://dogodoanphuong.com/upload/product/5b682627569971533552167-9249.jpg',
      img: 'http://pokedecor.vn/images/2015/03/28/nha-dep-hon-voi-noi-that-do-go-04.jpg',
      title: 'Thiết kế tiện nghi sang trọng',
      content: '',
   },
   {
      // img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2017/10/04/59d4564373a4f_1507087939.jpg',
      img: 'http://pokedecor.vn/images/2015/03/28/nha-dep-hon-voi-noi-that-do-go-04.jpg',
      title: 'Sang trọng với giường ngủ cổ điển',
      content: ''
   },
   {
      // img: 'https://rongba.vn/wp-content/uploads/2019/02/giuong-go-go-do.jpg',
      img: 'http://pokedecor.vn/images/2015/03/28/nha-dep-hon-voi-noi-that-do-go-04.jpg',
      title: '',
      content: ''
   },
]

class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
      }
   }

   render() {
      let { classes } = this.props
      return (
         <div>
            <Typography variant='h4' color='primary' style={{ textAlign: 'center' }}>
               Sản phẩm tiêu biểu
            </Typography>
            <br></br>
            <Grid container spacing={0}>
               {
                  img.map((item, index) => {
                     return (
                        <Grid item xs={3} key={index}>
                           <img
                              className={classes.imgZoom}
                              src={item.img}
                              height='100%'
                              width='100%'
                           />
                        </Grid>
                     )
                  })
               }
            </Grid>
         </div>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))