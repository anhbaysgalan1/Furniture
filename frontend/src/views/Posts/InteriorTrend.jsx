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

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import What from '../Public/What'
import Home from '../Public/Home'
import Promotion from '../Public/Promotion'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({

})


class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
      }
   }

   render() {
      let { classes } = this.props
      let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
      let dateNew = moment(moment().clone().add(-20, 'd')).format('DD/MM/YYYY 09: 35')

      return (
         <div>
            <Header classes={classes} />
            <br></br>
            <Home classes={classes} img={img} />
            <br></br>
            <Grid container spacing={32} >
               <Grid item xs={2}></Grid>
               <Grid item xs={8}>
                  <Card>
                     <CardContent style={{ textAlign: 'justify' }} >
                        <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
                           XU HƯỚNG THIẾT KẾ NỘI THẤT 2020
                        </Typography>
                        <Typography>
                           <Icon>calendar_today</Icon> {dateNew} | Lượt xem: 562
                        </Typography>
                        <hr></hr>
                        <ul>
                           <li>
                              <Typography>
                                 Thị hiếu và nhu cầu của người tiêu dùng về thiết kế nội thất ngày 
                                 càng khó tính. Họ muốn đi theo thu huống mới nhất hiện nay nhưng 
                                 vẫn phải có nét riêng của họ. Đến với bài viết này, mời các bạn 
                                 cùng với Amazing House tìm hiểu xu hướng thiết kế nội thất 2020 là gì?
                                </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                           Xu hướng thiết kế nội thất 2020
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/a1-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                                 Bạn sẽ làm gì khi không gian của căn nhà bạn nhỏ hẹp nhưng bạn 
                                 lại muốn sử dụng với nhiều mục đích khác nhau như vừa sống vừa 
                                 nấu ăn cùng một chỗ, vừa làm nhà bếp vừa làm nơi làm việc? 
                                 Do vậy, xu hướng thiết kế nội thất năm 2020 là thiết kế không 
                                 gian đa chức năng. Việc thiết kế, bố trí nội thất, chọn màu 
                                 phải thật cẩn thận để cho bạn cảm thấy thoải mái, thông thoáng 
                                 mặc dù không gian thực tế nhỏ.
                                </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                           Phong cách thiết kế là một trong những điều cần thiết khi thiết kế nội thất
                        </Typography>

                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/a4-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                                 Tùy theo không gian và phong cách thiết kế nội thất của ngôi nhà mà chúng ta sẽ lựa chọn các loại vật liệu thiết kế nội thất khác nhau. Xu hướng vật liệu thiết kế nội thất 2020 là tre, nứa, đất nung, đá cẩm thạch, tấm thảm lót, tấm dán tường 3D, kim loại, Neon hay sợi thực vật…Mỗi vật liệu khác nhau sẽ tạo không gian khác nhau và tạo ra những sự riêng biệt của chính nó.
                                </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                           Màu sắc trong thiết kế nội thất
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/a5-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                                 Dù bạn chọn phong cách thiết kế nào, đồ dụng nội thất ra sao thì không thể không nhắc đến các tông màu chọn lựa sao cho phù hợp mà còn mang lại ý nghĩa đặc trưng của nó trong mỗi thiết kế nội thất. Các màu sắc được xem xét và lựa chọn cho phù hợp với căn nhà của bạn như màu xanh biển nhạt, màu bạc hà, màu hồng, màu vàng mật ong, màu hồng, màu pastel, màu đất nung, màu gỗ…
                                </Typography>
                           </li>
                        </ul>
                        <Typography>
                           Với những chia sẽ trên, chúng hy vọng bạn có thể có những ý tưởng cho ngôi nhà tương lai của bạn. Nếu các bạn có nhu cầu tư vấn thiết kế nội thất có thể liên hệ với chúng tôi:
                        </Typography>
                        <Typography>
                           Công ty Cổ phần Kiến trúc – Nội thất Amazing House
                        </Typography>
                        <Typography>
                           Hotline: 091 234 1896 - 090 686 0004
                        </Typography>
                        <Typography>
                           Địa chỉ: Căn 3/13 Park city - Lê Trọng Tấn - Hà Đông - Hà Nội
                        </Typography>
                        <Typography>
                           Website: https://amazinghouse.vn
                        </Typography>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={2}></Grid>
            </Grid>
            <br></br>
            <What classes={classes} />
         </div>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))