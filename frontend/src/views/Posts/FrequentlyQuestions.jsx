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
      let dateNew = moment(moment().clone().add(-13, 'd')).format('DD/MM/YYYY 08: 45')

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
                           5 CÂU HỎI THƯỜNG GẶP VỀ BÀN GHẾ GỖ
                        </Typography>
                        <Typography>
                           <Icon>calendar_today</Icon> {dateNew} | Lượt xem: 478
                        </Typography>
                        <hr></hr>
                        <ul>
                           <li>
                              <Typography>
                                 <strong>Bàn ghế gỗ phòng khách</strong> luôn là một trong những lựa chọn hàng đầu 
                                 trong không gian nội thất được mọi người bỏ nhiều công sức để tìm 
                                 hiểu và lựa chọn? Tuy nhiên, không phải ai cũng có đủ kinh nghiệm 
                                 để đưa ra quyết định chính xác cho mình khi đặt mua một bộ sản phẩm 
                                 đẹp và phù hợp với túi tiền của mình.
                                 Hôm nay, Đồ Gỗ Việt xin giải đáp cho bạn một vài những thắc mắc
                                 mà khách hàng thường gặp phải như:
                              </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                           Nên mua bàn ghế gỗ gì?
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/sofa-go-soi-my-tay-chu-g-7-mon-2.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                                 Bàn ghế gỗ chất liệu xoan đào: Trong tất cả các loại gỗ tự nhiên được dùng 
                                 để chế tác đồ nội thất hiện nay thì gỗ xoan đào là loại gỗ có mức giá 
                                 khá phải chăng và chất lượng khá tốt. Có độ bền, màu sắc đẹp, hợp túi 
                                 tiền của đại đa số khách hàng. Do đó luôn là lựa chọn số 1 được yêu thích 
                                 trên thị trường hiện nay.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                                 Bàn ghế gỗ hương: Salon gỗ hương được đánh giá rất cao nhờ màu sắc 
                                 đỏ đẹp tự nhiên, rất đặc trưng mà không loại gỗ nào có được. Vân gỗ 
                                 đẹp, nổi bật… độ bền cực tốt nhất là các loại gỗ hương đá, hương vân 
                                 có độ bền và giá trị sử dụng rất cao.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                                 Salon gỗ gõ đỏ: Gõ đỏ là một loại gỗ có màu vàng đẹp tự nhiên, 
                                 sau thời gian dài sử dụng sẽ chuyển thành màu đỏ đậm đặc trưng 
                                 khá thú vị. Với mức giá trung bình khá, chất liệu gỗ tốt đây là 
                                 loại gỗ được hầu hết người tiêu dùng ưu tiên đặt mua. 
                              </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                           Bàn ghế gỗ tràm có tốt không?
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/20170812_152544-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                                 Gỗ tràm hay còn gọi là gỗ Keo là một trong những loại gỗ tự nhiên 
                                 được sử dụng nhiều để làm giấy và các đồ gỗ gia dụng khác. Tuy nhiên 
                                 xét về độ bền, tính thẩm mỹ, giá trị mang đến cho người dùng thì gỗ 
                                 bàn ghế làm từ gỗ tràm hoàn toàn không được đánh giá cao. Khả năng 
                                 chống ẩm mốc, mối mọt kém, màu sắc không đẹp, vân gỗ không ưa nhìn.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                                 Điểm hấp dẫn duy nhất của sản phẩm làm từ gỗ tràm là mức giá rẻ dễ mua, 
                                 dễ sử dụng mà thôi. Do đó tùy theo điều kiện tài chính của từng người mà 
                                 có thể đánh giá rằng bàn ghế gỗ tràm có tốt hay không? Còn xét về chất 
                                 lượng thì người dùng không nên mua để sử dụng. Bạn nên có thể đặt mua 
                                 các loại gỗ tốt hơn như xoan đào… tuy đắt hơn chút nhưng chất lượng thì 
                                 lại hoàn toàn đảm bảo.
                              </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                           Kinh nghiệm khi mua bàn ghế gỗ
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/mua-ban-ghe-o-dau-1.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                                 Phân biệt gỗ tự nhiên và gỗ pha: Những sản phẩm được pha thêm gỗ có vân gỗ giả tự nhiên không thật, màu sắc không đồng đều trên tổng thể sản phẩm. Các chi tiết được ráp nối lại với nhau không đều, nhìn rất lộ và xấu. Khách hàng khi mua nên kiểm tra các bộ phận như mặt sau sản phẩm, các khớp nối trên bộ phận để phân biệt rõ ràng nhất.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Hàng cũ và hàng mới: Hàng cũ là những sản phẩm đã xuống màu được sơn lại do đó màu sơn thường lẫn lộn với nhau, không đều và đồng nhất về màu sắc. Nước sơn không đẹp và có độ bóng ấn tượng như hàng mới. Bạn có thể quan sát kiểu sơn, màu sơn trên sản phẩm để phân biệt.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Giá cả: Hầu hết tất cả các cửa hàng đều để mức giá sản phẩm cao hơn so với giá bán. Nếu khéo léo khách hàng hoàn toàn có thể mặc cả để có mức giá tốt nhất cho mình. Khi mua một sản phẩm dù là ưng ý đến đâu bạn cũng nên có sự trả giá để tiết kiệm chi phí sở hữu một cách tốt nhất.
                              </Typography>
                           </li>
                        </ul>
                        <Typography variant='h5'>
                           Bàn ghế gỗ kích thước bao nhiêu?
                        </Typography>
                        <ul>
                           <uli>
                              <Typography>
                                 Trong chế tác đồ nội thất nói chung và bàn ghế gỗ nói riêng các sản phẩm đều được chia theo từng kích thước khác nhau để phân loại sao cho phù hợp. Trong đó các mẫu salon gỗ, sofa thường được chia theo kích thước của tay ghế như 8cm, 10cm, 12cm, 14cm, 16cm, 18cm, 20cm… Hay còn gọi một cách dân dã là tay 8, tay 10, tay 12, tay 14….
                              </Typography>
                           </uli>
                        </ul>
                        <Typography variant='h5'>
                           Bàn ghế gỗ hương tay 12 giá bao nhiêu?
                        </Typography>
                        <center>
                           <img
                              src='https://noithatdogoviet.com/upload/images/salon-go-huong-cham-voi-tay-10-6-mon-3.jpg'
                              height="100%"
                              width='100%'
                              alt='Nội thất Dodo'
                           />
                        </center>
                        <ul>
                           <li>
                              <Typography>
                                 Trên thị trường hiện nay, bàn ghế làm từ gỗ hương tay 12 có mức giá giao động từ 26.500.000 VNĐ – 35.000.000 VNĐ. Trong đó mức chênh lệch dựa trên chất liệu gỗ sử dụng như gỗ hương vân, gỗ hương đá, hương thường mà có những mức giá khác nhau.
                              </Typography>
                           </li>
                           <li>
                              <Typography>
                              Tổng hợp những mẫu bàn ghế salon gỗ hương đẹp nhất và 20+ mẫu bàn ghế gỗ đẹp nhất hiện nay.
                              </Typography>
                           </li>
                        </ul>
                        <Typography>
                           Trên đây là một hướng dẫn và chia sẻ kinh nghiệm cơ bản dành cho khách hàng khi quyết định tìm kiếm và đặt mua cho mình những bộ bàn ghế gỗ phòng khách đẹp giá tốt trên thị trường hiện nay. Mọi yêu cầu về sản phẩm dịch vụ hoặc mong muốn được giải đáp bạn có thể liên hệ trực tiếp với Fanpage của chúng tôi qua FB messenger hoặc Hotline 09 8888 7878(Mr Thắng) - 09 4444 2288 (Mr Nghi) bạn nhé.
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