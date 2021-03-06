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
   Hidden, 

} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import StarRateIcon from '@material-ui/icons/StarRate'
import what2 from '../../public/images/what2.jpg'
import what3 from '../../public/images/what3.jpg'
import what4 from '../../public/images/what4.jpg'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
   viewPhone: {
      [theme.breakpoints.down('xs')]: {
         padding: '8px'
      },
   },
   card: {
      maxWidth: 300,
      [theme.breakpoints.down('sm')]: {
         // position: 'fixed',
         maxWidth: 170,
      }
   },
   title: {
      color: 'white',
      marginTop: '30px',
      marginBottom: '15px'
   },
   cssIcon: {
      color: 'white',
      fontSize: '30px'
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
   }
})

const arrImg = [
   {
      image: "https://thebank.vn/static/6/1135/714/90/2018/10/16/thebank_suthatvephiquetthetindungkhithanhtoan1min_1539654231.jpg",
      title: 'Mua hàng tiện lợi',
   },
   {
      image: what4, //"https://www.thietkekientrucgroup.com/public/upload/images/noi-that-go-phong-khach%20(76).jpg",
      title: 'Bảo hành tận nhà',
   },
   {
      image: what2, //"https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg",
      title: 'Đạt chuẩn xuất khẩu',
   },
   {
      image: what3, //"https://i2.wp.com/dogoquoccuong.com/wp-content/uploads/2014/08/DSC09545.jpg?fit=3008%2C2000&ssl=1",
      title: 'Chất lượng hoàng gia',
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
      // let img = "url('http://noithatdangcap.vn/app/webroot/uploads/files/1-phong-khach-noi-that-co-dien-chau-au-dinh-thu-tai-Nam-Dinh.jpg')"
      let img = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuUdQSvSrGwfA1ATgX4LgizzClGH-SO-jj4k_vMZOk2hgq5Jzf&s')"
      // let img = "url('https://png.pngtree.com/58pic/32/49/67/20U58PICI9dWcd7X7yX8e_PIC2018.jpg')"
      return (
         <span>
            <Hidden smUp>
               <p>UP</p>
               <div style={{ backgroundImage: img, height: '100%', width: '100%' }} >
                  <div style={{ color: '#2196f3', textAlign: 'center' }} className={classes.fromCompany} >
                     <Grid container spacing={16}>
                        <Grid item xs={12}>
                           <Hidden smUp>
                              <Typography className={classes.title} variant='h6'>
                                 HÃY ĐẾN VỚI CHÚNG TÔI
                              </Typography>
                           </Hidden>
                           <Hidden xsDown>
                              <Typography className={classes.title} variant='h4'>
                                 HÃY ĐẾN VỚI CHÚNG TÔI
                              </Typography>
                           </Hidden>
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                        </Grid>
                     </Grid>
                     <br></br>
                     <center>
                        <Grid container spacing={8} >
                           {
                              arrImg.map((element, index) => {
                                 let link = '/convenient'
                                 switch (index) {
                                    case 1:
                                       link = './export'
                                       break
                                    case 2:
                                       link = './quality'
                                       break
                                    case 3:
                                       link = './guarantee'
                                 }
                                 return (
                                    <Grid item xs={6} md={3} key={index} className={classes.viewPhone}>
                                       <Card className={classes.card}>
                                          <CardActionArea onClick={() => this.goto(link)}>
                                             <CardMedia
                                                className={classes.imgZoom}
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="100"
                                                image={element.image}
                                                title={element.title}
                                             />
                                             <CardContent>
                                                <Typography>
                                                   {element.title}
                                                </Typography>
                                             </CardContent>
                                          </CardActionArea>
                                       </Card>
                                    </Grid>
                                 )
                              })
                           }
                        </Grid>
                     </center>
                  </div>
               </div>
            </Hidden>
            <Hidden xsDown>
               <div style={{ backgroundImage: img, height: '500px', width: '100%', }} >
                  <div style={{ color: '#2196f3', textAlign: 'center' }} className={classes.fromCompany} >
                     <Grid container spacing={16}>
                        <Grid item xs={12}>
                           <Typography className={classes.title} variant='h4' component='h4'>
                              HÃY ĐẾN VỚI CHÚNG TÔI
                           </Typography>
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                           <StarRateIcon className={classes.cssIcon} />
                        </Grid>
                     </Grid>
                     <br></br>
                     <center>
                        <Grid container spacing={16} >
                           {
                              arrImg.map((element, index) => {
                                 let link = '/convenient'
                                 switch (index) {
                                    case 1:
                                       link = './export'
                                       break
                                    case 2:
                                       link = './quality'
                                       break
                                    case 3:
                                       link = './guarantee'
                                 }
                                 return (
                                    <Grid item xs={6} sm={3} md={3} key={index} className={classes.viewPhone}>
                                       <Card className={classes.card}>
                                          <CardActionArea onClick={() => this.goto(link)}>
                                             <CardMedia
                                                className={classes.imgZoom}
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="200"
                                                image={element.image}
                                                title={element.title}
                                             />
                                             <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                   {element.title}
                                                </Typography>
                                             </CardContent>
                                          </CardActionArea>
                                       </Card>
                                    </Grid>
                                 )
                              })
                           }
                        </Grid>
                     </center>
                  </div>
               </div>
            </Hidden>
         </span>
         
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))