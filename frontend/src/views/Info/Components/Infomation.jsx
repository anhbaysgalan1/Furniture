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
    Dialog,
    DialogContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    title: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
        textAlign: 'center'
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
    },
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            reload: false
        }
    }

    renderInfomation(classes) {
        return (
            <Card>
                <CardContent style={{textAlign: 'justify'}} >
                    <Typography style={{ fontStyle: 'italic', textIndent: '30px' }}>
                        Đồ gỗ nội thất Dodo gửi tới quý khách hàng lời giới thiệu, giúp
                        quý khách hàng hiểu hơn và tin tưởng hơn về sản phẩm,
                        dịch vụ của chúng tôi.
                        </Typography>
                    <Typography variant='h5'>
                        SỨ MỆNH:
                        </Typography>
                    <Typography variant='h6'>
                        Đối với thị trường: NHÀ BÁN LẺ NỘI THẤT GỖ HÀNG ĐẦU
                        </Typography>
                    <Typography style={{ textIndent: '30px' }}>
                        Chúng tôi – Tập thể những nhân sự chuyên nghiệp và ưu tú với
                        sứ mệnh trở thành NHÀ BÁN LẺ NỘI THẤT GỖ HÀNG ĐẦU, Chúng tôi
                        luôn nỗ lực để cung cấp đến người sử dụng những giá trị cốt
                        lõi nhất của sản phẩm, mang lại sự tiện nghi trong từng phút
                        giây sử dụng.
                        </Typography>
                    <Typography variant='h6'>
                        Đối với xã hội: HÀI HÒA LỢI ÍCH
                        </Typography>
                    <Typography style={{ textIndent: '30px' }}>
                        Huyện Thạch Thất với truyền thống lâu đời về sản xuất đồ gỗ
                        nội thất, hàng thủ công mỹ nghệ… Chúng tôi có trách nhiệm góp
                        phần xây dựng và phát triển địa phương bằng việc khẳng định
                        thương hiệu chất lượng sản phẩm đồ gỗ Thạch Thất, từ đó tạo hàng
                        ngàn công việc cho lao động địa phương, bên cạnh đó chúng tôi còn
                        trực tiếp đóng góp vào ngân sách hàng năm.
                        </Typography>
                    <p>
                        <strong></strong>
                    </p>
                    <Typography variant='h6'>
                        Đối với nhân sự: THU NHẬP XỨNG ĐÁNG VỚI ĐÓNG GÓP
                        </Typography>
                    <Typography style={{ textIndent: '30px' }}>
                        Nhân sự của chúng tôi được làm việc trong môi trường chuyên nghiệp
                        và đậm chất nhân văn, Chúng tôi có nghĩa vụ đền đáp xứng đáng cho
                        những đóng góp sức lao động to lớn của họ.
                        </Typography>
                    <Typography variant='h6'>
                        Đối với đối tác: LỢI NHUẬN LUÔN ĐỒNG HÀNH CÙNG CHẤT LƯỢNG
                        </Typography>
                    <Typography style={{ textIndent: '30px' }}>
                        Chất lượng sản phẩm của từng đối tác sẽ là thước đo để mang lợi nhuận về,
                        Chúng tôi có trách nhiệm kiểm soát chất lượng cùng đối tác và chịu trách
                        nhiệm đến cùng đối với từng sản phẩm bán ra.
                        </Typography>
                    <Typography variant='h6'>
                        TẦM NHÌN: ĐỒ GỖ NỘI THẤT DODO
                        </Typography>
                    <Typography style={{ textIndent: '30px' }}>
                        Chúng tôi khát vọng trở thành ĐỒ GỖ NỘI THẤT ĐÔ DÔ để có thể
                        cung cấp sỉ và lẻ cho thị trường các tỉnh từ miền bắc đến miền trung.
                        </Typography>
                    <Typography variant='h6'>
                        GIÁ TRỊ CỐT LÕI:
                    </Typography>
                    <ul>
                        <li>
                            <Typography>
                                Tín: Chúng tôi đặt chữ tín lên hàng đầu từ chất lượng sản phẩn,
                                dịch vụ đến các chính sách hậu mãi.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Tâm: Tất cả các hành động đều phải thượng tôn pháp luật, luôn
                                bồi dưỡng, trau dồi và rèn luyện đạo đức nghề nghiệp. Mỗi sản
                                phẩm sản xuất ra là được trau chuốt tỷ mỷ từng cm và đảm bảo
                                công năng sử dụng lâu dài.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Tốc: Cam kết cung cấp sản phẩm đến người sử dụng nhanh nhất,
                                chính xác nhất với chất lượng đúng theo đơn hàng.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Tốt: Giá bán sản phẩm được chúng tôi xây dựng dựa trên giá
                                vốn hàng bán và chi phí hoạt động tối thiểu, cùng lợi nhuận
                                định mức chấp nhận được trên cơ sở đã so sánh với giá sản phẩm
                                tương đương trên thị trường. Chúng tôi cam kết giá cả tốt hơn
                                các nhà phân phối khác.
                            </Typography>
                        </li>
                        <Typography variant='h6' >
                            GIỚI THIỆU CHUNG:
                        </Typography>
                        <li>
                            <Typography>
                                Chúng tôi là đơn vị trực tiếp sản xuất ra sản phẩm đồ gỗ nội
                                ngoại thất từ những năm 1980, đã cung cấp hàng triệu sản phẩm
                                đồ gỗ nội ngoại thất từ Cao Bằng tới các tỉnh Miền Nam. Trên
                                chặng đường hơn 30 năm xây dựng và trưởng thành, Chúng tôi đã
                                tích lũy được nhiều bài học quý giá về thành công cũng như thất
                                bại và chúng tôi luôn tự hào đã phát triễn vững chắc mặc dù đã
                                vượt qua biết bao sóng gió thương trường. Nay, Chúng tôi đang xây
                                dựng một thương hiệu cho giai đoạn phát triển mới: “ĐỒ GỖ NỘI THẤT DODO”
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                ĐỒ GỖ NỘI THẤT DODO cung cấp hơn 300 mẫu sản phẩm đồ gỗ nội thất
                                cho phòng khách, phòng ngủ, phòng bếp, phòng ăn, phòng làm việc,
                                trường học, phòng trưng bày, thư viện, phòng tiếp tân, cửa đi,
                                cửa sổ, vách ngăn, ốp vách trang trí tường, trần, sàn… Vật liệu
                                chủ yếu gồm: gỗ tự nhiên, gỗ công nghiệp, inox, nhôm, kính,
                                đá tự nhiên, đá nhân tạo…
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Với hệ thống dây truyền sản xuất được nhập khẩu từ các nước phát triển
                                và hệ thống nhà xưởng đồng bộ hơn 2000m2, Chúng tôi trực tiếp sản xuất
                                sản phẩm, song song đó chúng tôi còn thuê các đơn vị khác gia công theo
                                yêu cầu và nhập sản phẩm từ các đơn vị sản xuất đồ gỗ uy tín chất lượng
                                cao tại địa phương để cung cấp cho thị trường sản phẩm đa dạng phong phú hơn.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Tất các các sản phẩm bán ra đều được chúng tôi kiểm tra chất lượng rất
                                khắt khe từ khâu nhập gỗ, tẩm sấy cho đến công đoạn sơn PU hoàn thiện,
                                Quý khách hoàn toàn có thể yên tâm về chất lượng sản phẩm do Siêu Thị
                                cung cấp và Chúng tôi là đơn vị chịu trách nhiệm tới cùng về chất lượng
                                sản phẩm, cũng như các chính sách bảo hành, hậu mãi sau này.
                            </Typography>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        )
    }

    renderImageInfo(classes) {
        return (
            <span>
                <img
                    className={classes.imgZoom}
                    src='http://dogomyduc.vn/uploads/Slider1.JPG'
                    height='300'
                    width='100%'
                />
                <img
                    className={classes.imgZoom}
                    src='https://nhatdoland.com/uploads/images//1571636760_top4.PNG'
                    height='300'
                    width='100%'
                />
                <img
                    className={classes.imgZoom}
                    src="http://tubepgoviet.vn/media/plugins/images/xuong-go-2(2).jpg"
                    height='300'
                    width='100%'
                />
            </span>
        )
    }


    renderContent(classes) {
        return (
            <Card>
                <Typography variant='h5' className={classes.title}>
                    Hỗ trợ trực tiếp 24/7
                </Typography>
                <CardContent>
                    <Typography color='primary' component='h5'>
                        <Icon fontSize='large' color='primary'>contact_phone</Icon><br></br>
                        Mạnh Nhẫn: 09856268956
                    </Typography>
                    <hr></hr>
                    <Typography color='primary' component='h5'>
                        <FacebookIcon fontSize='large' color='primary'></FacebookIcon><br></br>
                        Facebook: Đồ Gồ Nội Thất Dodo
                    </Typography>
                    <hr></hr>
                    <Typography color='primary' component='h5'>
                        <Icon fontSize='large' color='primary'>email</Icon><br></br>
                        Gmail: noithat.dodo@gmail.com
                    </Typography>
                    <hr></hr>
                    <Typography color='inherit' component='h5' style={{ fontStyle: 'italic', textAlign: 'center' }} >
                        Nếu có câu hỏi hãy liên hệ với chúng tôi
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    render() {
        let { classes } = this.props
        return (
            <span>
                <Grid container spacing={32}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={6}>
                        {
                            this.renderInfomation(classes)
                        }
                    </Grid>
                    <Grid item xs={3}>
                        {
                            this.renderContent(classes)
                        }
                        {
                            this.renderImageInfo(classes)
                        }
                        <br></br>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </span>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))