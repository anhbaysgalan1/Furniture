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
      let dateNew = moment(moment().clone().add(-5, 'd')).format('DD/MM/YYYY 07: 22')

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
                            06 BỘ BÀN ĂN LÀM TỪ GỖ SỒI ĐẸP CHO PHÒNG ĂN GIA ĐÌNH
                        </Typography>
                        <Typography>
                           <Icon>calendar_today</Icon> {dateNew} | Lượt xem: 536
                        </Typography>
                        <hr></hr>
                        <Typography>
                        Chất liệu gỗ sồi từ lâu đã được sử dụng rất rộng rãi trong những đồ nội thất gia đình tại Việt Nam. Đặc biệt là các bộ bàn ăn đẹp cho phòng bếp luôn được khách hàng quan tâm lựa chọn bởi màu sắc đẹp, độ bền tốt, giá thành hợp lý hợp với thị hiếu của người tiêu dùng. Một số mẫu bàn ăn làm từ gỗ sồi đẹp dưới đây sẽ giúp bạn tham khảo, lựa chọn theo sở thích và điều kiện tài chính của mình.
                        </Typography>
                        <Typography variant='h5'>
                            Bàn ăn gỗ sồi dạng nan
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/ban-ghe-an-go-soi-tu-nhien-dep-gia-re-5.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                              Là một mẫu sản phẩm nằm trong phân khúc tầm trung với giá trị thẩm mỹ, kinh tế, chất lượng hoàn hảo với người tiêu dùng. Được làm hoàn toàn từ gỗ sồi Mỹ nhập khẩu tốt hơn rất nhiều so với bàn làm từ gỗ sồi Nga cùng loại.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Thiết kế cơ bản dạng chân cao, gồm 6 ghế đơn dạng nan mỏng. Kiểu cơ bản thường gặp trên hầu hết các mẫu bàn ăn thường gặp trên thị trường hiện nay. Tuy nhiên vân gỗ đẹp hơn và màu vàng trầm hơn nhìn sang trọng và cổ điển hơn rất nhiều. Bạn có thể xem thêm một số mẫu bàn ăn giá dưới 10 triệu để cân nhắc sở hữu.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Bàn 120 x 80 x 75cm - 4 ghế nan.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Bàn 140 x 80 x 75cm - 4 ghế nan.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Bàn 160 x 80 x 75cm - 6 ghế nan.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Bàn 180 x 90 x 75cm - 8 ghế nan.
                              </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                        Bộ bàn ăn oval 5 ghế
                        </Typography>
                        <ul>
                            <li>
                                <Typography>
                                Khác với các mẫu bàn cơ bản thường gặp dạng vuông và hình chữ nhật, bộ này được thiết kế theo hình oval, thon ở 2 đầu. Nhờ đó người sử dụng có thể ngồi ăn một cách tiện lợi và dễ dàng hơn cũng như đẹp về mặt thẩm mỹ hơn so với các mẫu bàn vuông.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                Về cơ bản bộ này vẫn sử dụng chung các mẫu ghế gỗ sồi thường gặp với dạng nan phía sau lưng, không có gì khác biệt so với các mẫu khác. 
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant='h5'>
                        Bàn ăn sồi Mỹ 8 ghế nan đẹp
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/bo-ban-an-go-soi-my-dep-gia-re-1-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                            <li>
                                <Typography>
                                Một mẫu bàn ăn sồi Mỹ mà chúng tôi muốn giới thiệu cho khách hàng khác hơn đôi chút so với các mẫu cùng loại. Với đặc trưng là mặt nan dạng mỏng được gắn thêm kính cường lực. Không thiết kế theo dạng mặt phẳng như ban đầu để tăng thêm tính thẩm mỹ của sản phẩm
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                Với phần mặt bàn dạng nan cùng với các mẫu ghế cùng kiểu sẽ tăng thêm tính thẩm mỹ cho bộ bàn ăn này, tạo nên sự tương đồng trong thiết kế. Giúp cho việc bày trí, sắp xếp và sử dụng trở lên dễ dàng hơn rất nhiều.
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant='h5'>
                        Bàn ăn sồi Nga kích thước 1m2
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/bo-ban-an-nho-4-ghe-go-soi-nga-tu-nhien-2-tang-1m2-3-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                            <li>
                                <Typography>
                                Chú trọng nhiều hơn đến hoa văn với các họa tiết được chạm trổ nhiều hơn ở phần lưng ghế và mặt bạn. Giúp tăng thêm tính thẩm mỹ cho sản phẩm. Thích hợp với khách hàng yêu thích sự cầu kỳ và cuốn hút trong thiết kế.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                Làm từ gỗ sồi Nga nguyên khối nhờ đó màu của cả bộ đều là tông vàng nhẹ ngả sang màu trắng, sáng và ưa nhìn hơn so với màu sồi Mỹ. Tuy nhiên chất lượng và độ bền thì kém hơn một chút so với bộ cùng kiểu làm từ sồi Mỹ.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                Với bộ bàn ăn này khi khách hàng đặt mua sẽ được tặng thêm kính đi kèm với sản phẩm thay vì phải mua thêm kính mặt bàn như các mẫu bàn ăn khác. Tiết kiệm được một số chi phí tương đối cho người tiêu dùng.
                                </Typography>
                            </li>
                        
                        </ul>
                        <Typography variant='h5'>
                        Bàn ăn sồi Nga màu nâu đẹp
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/bo-ban-ghe-an-go-soi-nga-hinh-oval-2-tang-1m6-6-ghe-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                            <li>
                                <Typography>
                                    Thiết kế theo kiểu oval với 2 phần đầu tròn nhìn khá đẹp và thon hơn rất nhiều so với các mẫu bàn vuông cùng loại. Vẫn sử dụng chất liệu gỗ sồi Nga làm nguyên liệu tuy nhiên được sơn thêm màu nâu giả cánh gián nhìn cổ điển và sang trọng hơn. Nếu không ưa chuộng các mẫu có màu sáng thì bạn có thể chuyển qua lựa chọn bộ bàn ăn này.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Phần kính bàn ăn được sử dụng 2 loại kính gồm kính thường (hàng đi kèm) hoặc kính cường lực (hàng đặt) đều đảm bảo chất lượng kính tốt nhất để tăng khả năng chịu lực và chống trầy xước trên sản phẩm dành cho khách hàng.
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant='h5'>
                            Bàn ăn sồi Nga mặt vuông màu nâu 
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/ban-an-soi-nga-2-tang-mau-nau-dep-ben-gia-re-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                            <li>
                                <Typography>
                                    Tương tự như mẫu bàn ăn sồi Nga mặt vuông cùng loại từ thiết kế, kích thước cho đến kiểu dáng. Sự khác biệt duy nhất là màu của sản phẩm được sơn màu nâu socola cổ điển khá mới lạ. Có cùng giá thành và những ưu đãi đi kèm, đây là lựa chọn mà chúng tôi gợi ý để người dùng có thể cân nhắc khi đặt mua.
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant='h5' >
                            Một số ưu đãi dành cho khách hàng khi mua bàn ăn
                        </Typography>
                        <ul>
                            <li>
                                <Typography>
                                    Tất cả các mẫu bàn ăn của chúng tôi thường được đi kém với những tấm kính mặt bàn loại thường, tuy nhiên chúng tôi sẽ tặng thêm kính cường lực với các đơn hàng mua nhiều. Hoặc hỗ trợ chi phí mài lá hẹ cho đẹp hơn với các tấm cường lực mà bạn muốn đặt thêm.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Một bộ thường được đi kèm từ 4 - 8 ghế tùy theo đặt hàng của người tiêu dùng, ngoài ra chúng tôi còn cung cấp các ghế đơn bán lẻ theo bộ để bạn mua thêm. Với mức giá rẻ nhất và tối ưu nhất giúp bạn có thể tiết kiệm tối đa chi phí khi sở hữu.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Các đơn hàng giao trong TPHCM đều được chúng tôi miễn phí toàn bộ chi phí vận chuyển. Các đơn ngoại tỉnh sẽ được hỗ trợ phí chành xe và giao hàng đến tận nơi cho bạn. Tìm hiểu thêm kinh nghiệm mua bàn ăn đẹp tại TPHCM để có địa chỉ đáng tin cậy nhất.
                                </Typography>
                            </li>
                        </ul>
                        <Typography>
                            Hiện nay thương hiệu Nội Thất Đồ Gỗ Việt vẫn luôn là địa chỉ cung cấp các sản phẩm nội thất đẹp cho gia đình với mức giá tốt nhất cùng đa dạng về kiểu dáng và thiết kế cho khách hàng. Chắc chắn sẽ là lựa chọn tuyệt vời để người dùng có thể cân nhắc và sở hữu theo điều kiện cá nhân của riêng mình. Mọi chi tiết xin vui lòng liên hệ qua Hotline 09 8888 7878 để được tư vấn, hỗ trợ và phục vụ tốt nhất bạn nhé
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