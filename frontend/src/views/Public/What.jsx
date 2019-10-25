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
import FacebookIcon from '@material-ui/icons/Facebook';
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
import StarRateIcon from '@material-ui/icons/StarRate';
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
  card: {
    maxWidth: 300,
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
    image: "https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg",
    title: 'Đạt tiêu chuẩn xuất khẩu',
  },
  {
    image: "https://i2.wp.com/dogoquoccuong.com/wp-content/uploads/2014/08/DSC09545.jpg?fit=3008%2C2000&ssl=1",
    title: 'Chất lượng hoàng gia',
  },
  {
    image: "https://www.thietkekientrucgroup.com/public/upload/images/noi-that-go-phong-khach%20(76).jpg",
    title: 'Bảo hành tận nhà',
  }
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
    let img = "url('https://c.wallhere.com/photos/c1/f2/lines_wavy_shiny_glitter-716443.jpg!d')"
    return (
      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="card card-image mb-3"
            style={{
              backgroundImage: img,
              height: '500px',
              width: '100%',
            }}
          >
            <div style={{ color: '#2196f3', textAlign: 'center' }} className={classes.fromCompany} >
              <Grid container spacing={32}>
                <Grid item xs={12}>
                  <Typography className={classes.title} variant='h4' component='h4'>
                    BẠN NÊN LỰA CHỌN CHÚNG TÔI
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
                <Grid container spacing={32}>
                  {
                    arrImg.map((element, index) => {
                      return (
                        <Grid item xs={3} key={index}>
                          <Card className={classes.card}>
                            <CardActionArea>
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
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))