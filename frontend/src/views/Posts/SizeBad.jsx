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

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import Home from '../Public/Home'
import What from '../Public/What'
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
      return (
         <div>
            <Header classes={classes} />
            <br></br>
            <Home classes={classes} img={img} />
            <Grid container spacing={32} >
               <Grid item xs={2}> </Grid>
               <Grid item xs={8}>
                  <Card>
                     <CardContent style={{ textAlign: 'justify' }} >
                        <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
                           Kích thước giường ngủ theo lỗ ban hợp phong thủy
                        </Typography>
                        <hr></hr>
                        <ul>
                           <Typography>
                              Nếu muốn lựa chọn được chiếc giường ngủ hợp phong thủy thì bạn cần phải chú ý
                              tới kích thước giường ngủ theo lỗ ban. Dưới đây là cách chọn kích thước
                              giường ngủ theo thước lỗ ban cho từng loại giường. Bạn hãy tham khảo ngay nhé!
                           </Typography>
                           <Typography>
                             <li>
                                 Thước lỗ ban là gì?
                              </li>
                           </Typography>
                           <Typography>
                              Thước lỗ ban 42,9 cm có 8 cung lớn, mỗi cung lớn lại được chia thành 4 cung nhỏ và
                              chúng có ý nghĩa khác nhau. Dưới đây là một số ý nghĩa các cung trong thước lỗ ban.
                           </Typography>
                           <img
                              src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_750,h_246/http://thachthatdecor.com.vn/wp-content/uploads/2019/06/kich-thuoc-giuong-ngu-theo-lo-ban-1.jpg"
                              alt="Dodo"
                           />
                           <Typography>
                              <li>
                                 Tìm hiểu một số các cung trong thước lỗ ban 42,9 cm
                              </li>
                           </Typography>
                           <Typography>
                              Thước lỗ ban 42,9 cm có 8 cung lớn, mỗi cung lớn lại được chia
                              thành 4 cung nhỏ và chúng có ý nghĩa khác nhau.
                              Dưới đây là một số ý nghĩa các cung trong thước lỗ ban.
                           </Typography>
                           <Typography>
                              Một chu kỳ của thước lỗ ban 42,9 cm có 8 cung theo thứ tự từ tráng sang phải đó là:
                              Tài – Bệnh – Ly – Nghĩa – Quan – Kiếp – Hại – Bản. Cứ sau 42,9 cm thì chu kỳ này
                              lại lặp lại. Dựa theo nguyên tắc này bạn sẽ dễ tính toán kích thước giường ngủ
                              hợp phong thủy.Dựa trên những cung trong thước lỗ ban 42,9 cm bạn có thể biết
                              được cung nào cung xấu và cung nào cung tốt. Do đó lựa chọn kích thước giường ngủ
                              theo lỗ ban nên nằm trong những cung tốt để mang tới nhiều điều may mắn, tốt lành cho gia chủ.
                           </Typography>
                           <Typography>
                              <li>
                                 Hướng dẫn cách đo kích thước giường ngủ theo lỗ ban
                              </li>
                           </Typography>
                           <Typography>
                              Khi sử dụng thước lỗ ban 42,9 cm bạn có thể nhìn thấy rõ khoảng tốt có màu đỏ và
                              khoảng xấu có màu đen để giúp bạn biết được giường ngủ có kích thước hợp phong thủy hay không.
                           </Typography>
                           <Typography>
                              Nguyên tắc để đo kích thước giường ngủ theo lỗ ban đó là đo kích thước phủ bì dài, rộng, cao
                              hoặc đo đường kính. Do đó rất đơn giản để sử dụng thước lỗ ban để đo kích thước cho giường ngủ.
                              Phải đo kích thước phủ bì của giừng ngủ, lựa chọn kích thước rơi và cung tốt là những cung
                              có màu đỏ.
                           </Typography>
                           <Typography>
                              <li>
                                 Một số kích thước giường ngủ theo lỗ ban cho từng loại giường ngủ
                              </li>
                           </Typography>
                           <Typography>
                              Mỗi loại giường ngủ lại có kích thước khác nhau. Dưới đây là một số gợi ý lựa
                              chọn kích thước giường ngủ hợp phong thủy cho bạn tham khảo.
                           </Typography>
                           <Typography>
                              Kích thước giường đơn
                           </Typography>
                           <img
                              src='https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600,h_600/http://thachthatdecor.com.vn/wp-content/uploads/2019/06/kich-thuoc-giuong-ngu-theo-lo-ban-2.jpg'
                              alt='Dodo'
                           />
                           <Typography>
                              Kích thước giường ngủ trung bình
                           </Typography>
                           <img
                              src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600,h_377/http://thachthatdecor.com.vn/wp-content/uploads/2019/06/kich-thuoc-giuong-ngu-theo-lo-ban-3.jpg"
                              alt='Dodo'
                           />
                           <Typography>
                              Kích thức giường ngủ đôi – King size
                           </Typography>
                           <img
                              src='https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600,h_349/http://thachthatdecor.com.vn/wp-content/uploads/2019/06/kich-thuoc-giuong-ngu-theo-lo-ban-4.jpg'
                              alt='Dodo'
                           />
                           <Typography>
                              Kích thước giường ngủ Super King
                           </Typography>
                           <img
                              src='https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://thachthatdecor.com.vn/wp-content/uploads/2019/06/kich-thuoc-giuong-ngu-theo-lo-ban-5.jpg'
                              alt='Dodo'
                           />
                           <Typography>
                              Trên đây là một số thông tin về kích thước giường ngủ theo lỗ ban.
                              Bạn hãy tham khảo ngay để lựa chọn được chiếc giường ngủ đẹp,
                              hợp phong thủy cho phòng ngủ của mình.
                              Hãy tới ngay showroom Đồ Gỗ Thạch Thất để được tư vấn và lựa
                              chọn những mẫu giường ngủ đẹp, hợp phong thủy.
                           </Typography>
                        </ul>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={2}> </Grid>
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