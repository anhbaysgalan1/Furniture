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
        let dateNew = moment(moment().clone().add(-35, 'd')).format('DD/MM/YYYY 10: 03')

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
                                    GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI CHO KHÔNG GIAN NHỎ
                                </Typography>
                                <Typography>
                                    <Icon>calendar_today</Icon> {dateNew} | Lượt xem: 478
                                </Typography>
                                <hr></hr>
                                <ul>
                                    <li>
                                        <Typography>
                                            Giường ngủ thông minh được nhiều người chọn lựa bởi những 
                                            tiện ích, ưu việt mà nó mang lại. Vì vậy việc chọn lựa 
                                            chiếc giường thông minh cho không gian phòng ngủ sẽ 
                                            giúp bạn tiếp kiệm được diện tích và chi phí, bài viết 
                                            dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp 
                                            thông tin về giường thông minh, để bạn có nhiều thông 
                                            tin hơn về mẫu sản phẩm này.
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant='h5'>
                                    Giường xếp thông minh là gì
                                </Typography>
                                <center>
                                    <img
                                        src='https://noithatdogoviet.com/upload/images/26c22cf34159dfd8e0de58ab0471d006-2.jpg'
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                    <img
                                        src='https://noithatdogoviet.com/upload/images/26c22cf34159dfd8e0de58ab0471d006-2.jpg'
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Với phong cách thiết kế độc đáo nên mẫu giường xếp thông minh còn được gọi là giường đa năng có tác dụng nhằm giải quyết triệt để vấn đề về không gian nhà ở hiện nay, điều này mang đến sự thuận tiện với những gia đình có không gian hạn chế nhưng vẫn muốn không gian sống đầy đủ sự tiện nghi.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Loại sản phẩm này có khung xương được sản xuất bằng thép sơn tĩnh điện siêu bền, cùng với hệ thống lò xo trợ lực giúp cho giường nhẹ nhàng hơn từ trẻ em tới người trung tuổi đều sử dụng dễ dàng. Với chất liệu gỗ là MDF phủ melamine siêu bền cực kì phù hợp với khí hậu với việt nam.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Tưởng chừng chỉ là chiếc giường nhưng nó tích hợp với nhiều tính năng khác, bề ngoài là chiếc giường biến đổi thành chiếc kệ sách, tủ quần áo đôi khi lại còn là một chiếc ghế sofo mang đến sự tiện nghi cho người sử dụng.
                                        </Typography>
                                    </li>
                                </ul>
                                    <Typography variant='h5'>
                                    Cách làm giường ngủ thông minh đơn giản tại nhà
                                    </Typography>
                                    <center>
                                        <img
                                            src='https://noithatdogoviet.com/upload/images/ff85fa55f62af8676f724397b3b65017-4.jpg'
                                            height="100%"
                                            width='100%'
                                            alt='Nội thất Dodo'
                                        />
                                    </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Bước đầu tiên khi muốn thiết kế giường ngủ thông minh trước hết chúng ta cần chuẩn bị nguyên liệu và những dụng cụ cần thiết để có thể tự tay tạo ra riêng cho mình một chiếc giường ngủ thông minh nhé.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Để thiết kế giường ngủ thông minh chúng ta dùng 4 tấm gỗ có kích thước hai ngắn hai dài, ghép 4 tấm gỗ đó lại chúng ta tạo ra được 1 khung hình chữ nhật. Sau đó ta dùng 10 thanh gỗ vuông 1 cỡ bắn keo để ghép nó thành dát giường.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Tiếp đến chúng ta tiếp tục làm thêm một khung như trên để tạo thành thân giường và thân ghế sofa. Sau khi làm được phần thân giường từ hai khung gỗ chúng ta dùng bản lề cố định 2 khung gỗ đó lại với nhau bằng ốc vít. Bảng lề là một chi tiết quan trong để tạo nên chiếc giường thông minh này, với tác dụng giúp người dùng dễ dàng đóng mở ghế.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Sau khi xong thân giường tiếp theo chúng ta làm phần chân giường, ta sử dụng 8 thanh gỗ để làm chân giường, chấn ghế và cả tay vịn.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Để làm lưng ghế, chúng ta sử dụng 3 thanh gỗ ghép lại với nhau, sử dụng súng bắn keo gia cố các thanh gỗ, ba thanh gỗ này này được sắp xếp ở vị trí đều nhau hoặc có thể ghép sát 2 tấm lại cùng một phía để 1 tấm ở phía còn lại. Sau khi đã hoàn thiện được lưng ghế, thân ghế và cả chân ghế thì ghép phần thân ghế với lưng ghế lại với nhau.
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant='h5'>
                                    Các mẫu giường ngủ thông minh
                                </Typography>

                                <center>
                                    <img
                                        src='https://noithatdogoviet.com/upload/images/giuong-va-ban-lam-viec-3.jpg'
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Giường ngủ gấp thông minh kết hợp với giá sách, bàn học và tủ đây là một trong những mẫu giường đa năng phù hợp với không gian nhỏ, hẹp. Với thiết kế đầy đủ tính năng gộp chung với nhau như chiếc giường ngủ, bàn học, tủ dựng quần áo và ghế, mẫu giường gần như gấp gọn toàn bộ tính năng trong căn phòng bình thường.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Giường ngủ gấp thông minh kết hợp sofa cùng tủ quần áo mẫu sản phẩm này mang đến chức năng 2 trong 1 vừa phòng khách vừa phòng ngủ, nhiều gia đình hạn chế về không gian muốn tận dụng khoảng trống của phòng khách mẫu tủ này là 1 lựa chọn cực kì hợp lí. Thiết kế bao gồm giường ngủ, tủ quần áo, cùng giá sách và kệ trang trí khả năng gấp gọn linh hoạt đảm bảo sự gọn gàng ngăn nắp cho căn phòng.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Giường ngủ thông minh cho bé mẫu giường này phù hợp với gia đình có 2 bé, thay vì tạo căn phòng riêng biệt cho 2 bé gây tốn diện tích vừa mất nhiều chi phí. Sử dụng sản phẩm này tạo nên được không gian riêng biệt nhưng tối ưu về mặt diện tích đảm bảo đươc sự tiện nghi, đây là sự kết hợp hoàn hảo giữa nơi nghỉ ngơi và học tập, giường ngủ gấp lên xuống linh hoạt tạo thành bàn học cho con, có thêm kệ và giá sách ở trện cực kì tiện lợi.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Giường ngủ gấp thông minh kết hợp với tủ tiện lợi, nếu bạn thích sự đa năng tiện lợi thì không nên bỏ lỡ mẫu sản phẩm này bao gồm 2 giường gấp, một giường cho người lớn và 1 giường cho trẻ em, tích hợp thêm tủ đầu giường thoải mái sắp xếp vật dụng, giường nhỏ khi gấp lại tạo thành bàn học, giường lớn tạo thành chiếc sofa sang trọng.
                                        </Typography>
                                    </li>
                                </ul>
                                <center>
                                    <img
                                        src='https://noithatdogoviet.com/upload/images/giuong-ngu-thong-minh-va-sofa-2.jpg'
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Mẫu giường ngủ thông minh 2 tầng 7 tiện ích sản phẩm này được thiết kế bao gồm 7 công năng tủ quần áo, 2 giường ngủ, bàn học cho 2 người, bảng trắng kèm hộc kéo chứa đồ, thuận tiện cho những gia đình có 2 bé, diện tích không gian chỉ cần 10m2 là đủ, giường kết hợp thêm giá sách phong cách tối giản khiến căn phòng rộng rãi, lun đảm bảo được tính thẩm mỹ.
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant='h5'>
                                    Giá giường ngủ thông minh
                                </Typography>
                                <center>
                                    <img
                                        src='https://noithatdogoviet.com/upload/images/giuong-ngu-ket-hop-ke-sach-3.jpg'
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Giường ngủ gấp thông minh giá cả như thế nào thì còn phụ thuộc vào kích thước, tính tiện lợi và chất liệu gỗ gia công sản phẩm này, mẫu sản phẩm này thường được làm từ 2 loại gỗ chính đó là gỗ tự nhiên và gỗ công nghiệp
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Gỗ công nghiệp tuy không thua kém gì gỗ tự nhiên nhưng giá thành cực kì hợp lí, bề mặt của loại gỗ này được phủ melamine chống được trầy xước, chống mối mọt, đặc biệt là chống ẩm tốt, chỉ từ 10 đến 25tr bạn đã  sở hữu được 1 mẫu giường chất gia công từ loại gỗ này này rồi.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Giường được gia công từ gỗ tự nhiên bao giờ giá thành cũng cao hơn gỗ công nghiệp. Với chất liệu gỗ tần bì thì giá thành rẻ hơn các  loại gỗ khác, những mẫu sản phẩm được gia công bằng xoan đào hay gỗ óc chó thì giá thành cao hơn nhưng lại cực kì bền đẹp, chất lượng.
                                        </Typography>
                                    </li>

                                </ul>
                                <Typography>
                                    Qua bài viêt này hi vọng bạn sẽ trang bị được nhiều hơn cho mình kiến thức về giường ngủ thông minh, cách đặt mua và lựa chọn sao cho phù hợp. Nếu có bất cứ thắc mắc vào khi cần mua giường ngủ quý khách hàng xin vui lòng liên hệ qua Hotline 09 8888 7878 để được tư vấn và giải đáp một cách tốt nhất bạn nhé.
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