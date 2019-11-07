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
                                    NỘI THẤT DODO ĐÁNH THỨC GIÁ TRỊ CỦA THÀNH CÔNG
                                </Typography>
                                <Typography>
                                    <Icon>calendar_today</Icon> {dateNew} | Lượt xem: 478
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Cuộc sống hiện đại không dừng lại ở việc đáp ứng đủ nhu cầu sống, làm việc; mà đòi hỏi còn phải đáp ứng được tính thẩm mỹ trong mắt mọi người. Cũng theo đó, việc lựa chọn nội thất văn phòng đòi hỏi phải mang giá trị thẩm mỹ cao. Việc chọn lựa các đồ dùng nội thất trong văn phòng ảnh hưởng trực tiếp đến hiệu quả, năng suất công việc hay sự thành công của một doanh nghiệp.
                                </Typography>
                                <Typography>
                                    Phải làm thế nào để có không gian làm việc luôn thoải mái, mọi công việc đều mang đến kết quả tốt? Và đặc biệt hơn hết làm thế nào để tạo sức ảnh hưởng với những cuộc gặp gỡ đối tác ngay tại văn phòng. Những yêu cầu trên phụ thuộc rất nhiều vào việc bạn chọn lựa những sản phẩm nội thất văn phòng phải phù hợp, tiện nghi và mang giá trị thẩm mỹ cao nhất.
                                </Typography>
                                <Typography variant='h5'>
                                    Nội thất văn phòng góp phần làm nên sự thành công của một tập thể:
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography>
                                            Nội thất dùng trong văn phòng phần nào thể hiện được vị thế của doanh nghiệp, văn phòng, công ty đó. Các sản phẩm nội thất dùng trong văn phòng bao gồm bàn làm việc, ghế văn phòng, bàn ghế giám đốc, bàn quầy lễ tân, bàn họp…
                                        </Typography>
                                    </li>
                                </ul>
                                <center>
                                    <img
                                        src='https://lh3.googleusercontent.com/ORVzH3S9hILzEKQDuXqFHd5Be53hZIF8eOmgsXhgrudPr11iNm0etVnQINf6hlxkSQhsxSmt6Q56zwL2dW70wFnKDdAZ880AfL5yfKYHsd-4oxk2k3yTrM-J8Gx0eQ'
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Những sản phẩm nội thất cho văn phòng phù hợp phải đảm bảo về kích thước phù hợp với diện tích văn phòng, màu sắc trang nhã, kiểu dáng có thiết kế đẹp, thẩm mỹ cao… Tạo nên không gian làm việc thoải mái nhất và tạo được nguồn cảm hứng để có thể làm việc tốt.
                                </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Không chỉ vậy, các cuộc gặp gỡ khách hàng hay đối tác đều thực hiện 90% tại văn phòng. Chính vì thế nên việc chọn lựa những bộ bàn ghế, nội thất văn phòng cũng chính là điểm cộng để tạo được ấn tượng tốt cho những cuộc gặp gỡ, ký kết.
                                </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Sự thành công của một tập thể văn phòng, công ty phụ thuộc một phần vào việc chọn lựa bàn, ghế, tủ… các sản phẩm nội thất dành cho văn phòng. Chính vì thế, trước khi chọn lựa bạn cần nắm bắt những xu hướng nội thất văn phòng hiện hành, đồng thời cần nghiên cứu lựa chọn cho phù hợp với không gian phòng làm việc.
                                </Typography>
                                    </li>
                                    <li>
                                        <Typography>

                                        </Typography>
                                    </li>
                                </ul>
                                <Typography>
                                    Nắm bắt xu hướng, nhu cầu chọn mua sắm nội thất cho văn phòng tốt nhất
                        </Typography>
                                <ul>
                                    <li>
                                        <Typography>
                                            Các sản phẩm nội thất dành cho văn phòng đa dạng sản phẩm từ bàn làm việc, ghế văn phòng, bàn họp, bàn quầy lễ tân cho đến các tủ locker, tủ hồ sơ… Việc chọn lựa cần theo xu hướng mới, đồng thời phải có sự kết hợp hài hòa của sản phẩm để không gian làm việc hiện đại, sang trọng, đồng bộ và đặc biệt hơn hết là tạo nên thành công bức phá trong công việc.
                                </Typography>
                                    </li>
                                </ul>
                                <center>
                                    <img
                                        src='https://lh3.googleusercontent.com/CWTuys_uvqdVOppG-AogkRN-ALyk4BtmYSdssG24e5KYGyEkSPSQQzVOVj7b0KYJWGRD5DHCCNmNRerxYsSH_8AfMIvYjB4ACdQB9gCQDkhYsgV28rXZshq28Av2cw'
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Nhu cầu sử dụng nội thất tại các văn phòng khác nhau, tùy thuộc vào đặc trưng riêng các doanh nghiệp. Chọn lựa một xưởng nội thất lớn, đa dạng các sản phẩm có thể đáp ứng những thiết kế theo yêu cầu sẽ mang đến cho doanh nghiệp những bộ nội thất đồng bộ về màu sắc, về chất lượng và cả trong phong cách thiết kế.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Xu hướng mua nội thất văn phòng giá rẻ hiện nay khá phổ biến. Và việc chọn lựa mua nội thất cho văn phòng trực tiếp tại kho, không qua trung gian sẽ là ưu tiên lựa chọn để đảm bảo về kinh phí đầu tư.
                                        </Typography>
                                    </li>
                                </ul>

                                <center>
                                    <img
                                        src="https://lh5.googleusercontent.com/z2Lx6QOtJufnhYquv96K-TOEJKPXcSml4ug84UO7qx6mx4zzvGcVRqKfNwGkhCuWD1esBE5FnEg1PF2RQvWzh0Ha1gA2re3nu6QLgQ6WulqAf0z1JuJ-jJlL4WnBfw"
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <ul>
                                    <li>
                                        <Typography>
                                            Chọn lựa đồ dùng nội thất cho văn phòng cần đảm bảo tiêu chuẩn chất lượng. Các chất liệu được gia công xử lý đúng quy trình trước khi sản xuất để có độ bền cao nhất. Chất liệu gỗ MDF láng mịn, tẩm sấy chống mối mọt, phủ lớp Melamine/ sơn PU để tăng tính thẩm mỹ và bảo vệ.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Đáp ứng đầy đủ những tiêu chí và xu hướng chọn lựa trên, các sản phẩm nội thất văn phòng sản xuất tại Lương Sơn sẽ mang đến cho bạn những trải nghiệm tuyệt vời trong việc chọn mua và sử dụng. Thúc đẩy quá trình làm việc trở nên tích cực hơn, mang đến năng suất làm việc tốt, đồng thời còn tạo được ấn tượng tốt với các đối tác.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Nội thất văn phòng Lương Sơn đã đánh thức giá trị thành công của rất nhiều các doanh nghiệp. Trong tương lai sẽ cùng đồng hành với các doanh nghiệp trẻ để tiếp thêm nguồn năng lượng tích cực tạo nên sự bứt phá. Ngoài ra, nội thất Lương Sơn cũng luôn đồng hành cùng các gia đình Việt qua các sản phẩm nội thất dành cho gia đình.
                                        </Typography>
                                    </li>
                                </ul>
                                <center>
                                    <img
                                        src="https://lh3.googleusercontent.com/jyAtNgTYHTCPJp55EHSvrjFwXVueYyJjlE5eBLKERd9BqUZhsPy9gDfHhZIJSDWxrtT9ta_aLetXAD3dIq9pINk-p_H_IZ2-prBp9wkSYD-vNVSjBEj251ImBiqVfw"
                                        height="100%"
                                        width='100%'
                                        alt='Nội thất Dodo'
                                    />
                                </center>
                                <Typography>
                                    Hãy liên hệ với Nội thất Lương Sơn qua Hotline 0976.19.59.22 hoặc địa chỉ Ngõ 1 Phạm Văn Bạch, Yên Hòa, Cầu Giấy, Hà Nội để được tư vấn, thiết kế các sản phẩm nội thất văn phòng phù hợp cho doanh nghiệp.
                                </Typography>
                                <Typography>
                                    NỘI THẤT VĂN PHÒNG VÀ  GIA ĐÌNH LƯƠNG SƠN
                                </Typography>
                                <Typography>
                                    Địa chỉ: Ngõ 1 - Phạm Văn Bạch - Yên Hòa - Cầu Giấy - Hà Nội
                                </Typography>
                                <Typography>
                                    Hotline: 0976195922
                                </Typography>
                                <Typography>
                                    Website: https://noithatluongson.vn
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