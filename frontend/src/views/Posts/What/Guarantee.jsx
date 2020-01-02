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
import Header from '../../Public/Header/Header'
import What from '../../Public/What'
import Home from '../../Public/Home'
import Promotion from '../../Public/Promotion'
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
                <br></br>
                <Grid container spacing={32} >
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardContent style={{textAlign: 'justify'}} >
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
                                    Bảo hành, hậu mãi chu đáo nhất
                                </Typography>
                                <hr></hr>
                                <ul>
                               <li>
                                    <Typography>
                                        Chính sách bảo hành sản phẩm là một trong những yếu tố giúp
                                        các doanh nghiệp “ghi điểm” đối với khách hàng của mình.
                                        Rất nhiều khách hàng lựa chọn sử dụng sản phẩm của Siêu Thị
                                        Đồ Gỗ Thạch Thất từ những năm 90 của thế kỷ trước giờ vẫn sự
                                        dụng tốt và cũng làm vật kỷ niệm.
                                    </Typography>
                               </li>
                               <li>
                                    <Typography>
                                        Đây cũng là điều mà Nội Thất Dodo đã làm được. Chúng tôi
                                        không ngừng tiếp thu những ý kiến đóng góp của khách hàng và
                                        cải thiện chính sách bảo hành, bảo trì sản phẩm sau bán hàng.
                                        Nhằm mang tới sự hài lòng nhất cho khách hàng khi sử dụng sản
                                        phẩm và dịch vụ của chúng tôi.
                                    </Typography>
                               </li>
                                <Typography variant='h6'>
                                    Chế độ bảo hành sản phẩm dài hạn
                                </Typography>
                                    <li>
                                        <Typography>
                                            Nhằm bảo vệ quyền lợi chính đáng của người tiêu dùng nội thất,
                                            Nội Thất Dodo áp dụng chính sách bảo hành sản phẩm dài hạn.
                                            Mỗi dòng sản phẩm của chúng tôi áp dụng chính sách bảo hành khác
                                            nhau. Tuy nhiên thời gian bảo hành trung bình sản phẩm của chúng
                                            tôi đều cao hơn so với nhiều đơn vị khác trên thị trường hiện nay.
                                        </Typography>
                                    </li>
                                <Typography variant='h6' >
                                    Bảo trì sản phẩm trọn đời
                                </Typography>
                                <li>
                                    <Typography>
                                        Khách hàng sử dụng sản phẩm của Nội Thất Dodo được bảo trì
                                        sản phẩm trọn đời. Trong quá trình sử dụng sản phẩm bạn gặp
                                        bất cứ vấn đề, sự cố nào hãy liên hệ ngay với chúng tôi để được
                                        hỗ trợ, khắc phục trong thời gian sớm nhất.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        Sản phẩm được bảo hành, bảo chỉ tại xưởng sản xuất cho nên tiết
                                        kiệm thời gian tối đa. Chúng tôi khắc phục sự cố trong thời
                                        gian sớm nhất, không làm ảnh hưởng tới cuộc sống sinh hoạt
                                        của gia đình bạn.
                                    </Typography>
                                </li>
                                <Typography variant='h6'>
                                    Thường xuyên có chương trình khuyến mãi, ưu đãi
                                </Typography>
                               <li>
                                    <Typography>
                                        Để khách hàng có cơ hội sở hữu sản phẩm nội thất chất lượng cao với
                                        giá ưu đãi, chúng tôi cũng thường xuyên áp dụng chương trình khuyến
                                        mãi. Điều này giúp khách hàng tiết kiệm tối đa chi phí trong quá
                                        trình đầu tư nội thất cho tổ ấm của mình.
                                    </Typography>
                               </li>
                                <li>
                                    <Typography>
                                        Chính sách chăm sóc khách hàng của Nội Thất Dodo luôn hướng tới
                                        việc đảm bảo quyền lợi của người tiêu dùng. Bởi vậy lựa chọn sử dụng
                                        sản phẩm của chúng tôi là sự lựa chọn sáng suốt nhất của bạn!
                                    </Typography>
                                </li>
                                </ul>
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