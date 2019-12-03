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
                <br></br>
                <Grid container spacing={32}>
                    <Grid item xs={2}> </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardContent style={{textAlign: 'justify'}} >
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
                                    Chất lượng vượt trội
                                </Typography>
                                <hr></hr>
                                <ul>
                                    <Typography style={{ fontStyle: 'italic', textIndent: '30px' }} >
                                        Nội thất Dodo luôn nỗ lực không ngừng để mang tới những
                                        sản phẩm có chất lượng cao mà lại có giá cả hợp lý nhất. Khách hàng
                                        sử dụng những món đồ nội thất của chúng tôi sẽ không phải lo lắng về
                                        chất lượng của sản phẩm. Chúng tôi luôn mang tới những sản phẩm chất
                                        lượng nhất dành cho khách hàng bởi:
                                    </Typography>
                                    <Typography variant='h6'>
                                        Sản phẩm được sản xuất tại xưởng nên có chất lượng cao
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Thay vì đi chọn mua đồ nội thất từ những địa chỉ phân phối trung
                                            gian trên thị trường, khách hàng nên lựa chọn những món đồ được
                                            đóng tại xưởng. Bởi sản phẩm được chúng tôi kiểm soát về chất lượng
                                            một cách chặt chẽ.
                                        </li>
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Kiểm soát chất lượng sản phẩm ngay từ khâu nguyên liệu đầu vào.
                                            Luôn sử dụng những chất liệu gỗ đảm bảo yêu cầu kỹ thuật để sản xuất
                                            đồ nội thất. Chúng tôi luôn sử dụng nguyên liệu có nguồn gốc xuất xứ
                                            rõ ràng, tránh tiềm ẩn những nguy cơ gây hại cho sức khỏe người dùng.
                                        </li>
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Những bộ ghế sofa phòng khách, bàn ghế gỗ, giường ngủ, tủ quần áo,
                                            bàn ghế ăn…đều có chất lượng ổn định và sử dụng trong thời gian lâu
                                            dài. Các món đồ nội thất của chúng tôi được sản xuất tại xưởng ở
                                            Thạch Thất Hà Nội, cho nên khách hàng cũng có thể giám sát quá trình
                                            sản xuất khi đặt đóng đồ nội thất của chúng tôi. Điều này mang tới sự
                                            yên tâm dành cho khách hàng trong quá trình sử dụng sản phẩm.
                                        </li>
                                    </Typography>
                                    <Typography variant='h6' >
                                        Đội ngũ nhân công lành nghề
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Chúng tôi may mắn có được đội ngũ công nhân viên lành nghề, có kinh
                                            nghiệm lâu năm và trách nhiệm cao trong quá trình sản xuất đồ nội
                                            thất. Bởi vậy chúng tôi luôn mang tới những sản phẩm hoàn hảo, chỉnh
                                            chu trong từng đường nét thiết kế. Điều này giúp nâng cao chất lượng
                                            sản phẩm mà lại mang tới giá trị thẩm mỹ cao.
                                        </li>
                                    </Typography>
                                    <Typography variant='h6'>
                                        Hệ thống máy móc hiện đại
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Nội thất Dodo trang bị những máy móc hiện đại nhất giúp quá trình
                                            sản xuất đồ nội thất nhanh hơn, chính xác hơn. Bởi vậy có thể tiết
                                            kiệm tối đa thời gian cũng như chi phí, sức lực con người. Hệ thống
                                            máy móc hiện đại giúp quá trình đo đạc, cắt ghép sản phẩm chuẩn xác
                                            và nhanh chóng hơn.
                                        </li>
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Chất lượng của sản phẩm chính là yếu tố quan trọng góp phần làm nên
                                            uy tín của một thương hiệu. Chính vì thế chúng tôi sẽ không ngừng nỗ
                                            lực để mang tới sản phẩm bền, đẹp và có giá cả tốt nhất. Mọi thông tin
                                            cần tư vấn xin liên hệ ngay với chúng tôi để được giải đáp.
                                        </li>
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