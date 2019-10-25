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
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
  card: {
    maxWidth: 300,
  },
})

const img = [
  {
    img: 'https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg',
    title: 'Hiện đại vuông vắn lịch lãm quý phái',
    content: ''
  },
  {
    img: 'https://sdk.vn/wp-content/uploads/2018/11/s%C6%A1n-g%E1%BB%97-ph%E1%BB%A7-m%E1%BB%9D.jpg',
    title: 'Phong cách hoàng gia, đậm chất cổ điển',
    content: '',
  },
  {
    img: 'https://nhadepnhaxinh.vn/images/p.kh%C3%A1ch_t%E1%BA%A7ng_1_.2_1.jpg',
    title: 'Thiết kế tiện nghi sang trọng',
    content: '',
  },
  {
    img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2017/10/04/59d4564373a4f_1507087939.jpg',
    title: 'Sang trọng với giường ngủ cổ điển',
    content: ''
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
    return (
      <div>
          <Typography variant='h4' color='primary' style={{textAlign: 'center'}}>
                Sản phẩm lựa chọn nhiều nhất
          </Typography>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))