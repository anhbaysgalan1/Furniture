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
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Home from '../Public/Home'
import Header from '../Public/Header/Header'
import Circle from '../Public/Circle'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    Grid,
    CardContent,
    CardActions,
    Typography
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    },
    marginConten: {
        parding: '5px 5px 5px 5px'
    },
    magrinBorder: {
        marginLeft: '100px',
        marginRight: '100px',
    }
})



class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_newsmedia.jpg')"
        return (
            <div>
                <Card> 
                    <CardContent> 
                        <Header classes={classes} />
                    </CardContent>
                    <br></br>
                </Card>
                <Home img={img} />
                <div className={classes.magrinBorder}>
                    <ExpansionPanel expanded={true}>
                        <ExpansionPanelSummary
                            // expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading} variant='h5' >Tuyển dụng</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <strong>
                                    1. Ứng viên phải trả những chi phí nào khi ứng tuyển các công việc tại JS Global VN?
                                </strong><br></br>
                                    Ứng viên được hoàn toàn miễn phí giới thiệu và tư vấn ứng tuyển cho đến khi
                                    vào làm tại công ty. Ứng viên chỉ phải trả các chi phí cá nhân phát sinh sau khi
                                    đã trúng tuyển như phí làm hộ chiếu hoặc phí dịch tài liệu hồ sơ.<br></br>
                                <br></br>
                                <strong>
                                    2. Làm thế nào để ứng tuyển cho các công việc tại JS Global VN?
                                </strong><br></br>
                                Quy trình ứng tuyển tại JS Global VN gồm 5 giai đoạn chính như sau: <br></br>
                                Bước 1: Tra cứu thông tin tuyển dụng tại đây <br></br>
                                Bước 2: Tham gia ứng tuyển bằng 1 trong 2 hình thức dưới đây: <br></br>
                                - Gửi CV về email tuyendung@js.global.com.vn hoặc điền thông tin vào phần đăng ký<br></br>
                                - Điền form online và submit theo hướng dẫn.<br></br>
                                Bước 3: Sau khi nhận được CV của ứng viên, JS Global VN sẽ liên hệ lại với các bạn để phỏng vấn sơ tuyển. <br></br>
                                Bước 4: Tham gia phỏng vấn với nhà tuyển dụng nếu đạt yêu cầu.<br></br>
                                Bước 5: Nhận thông báo trúng tuyển và chuẩn bị thủ tục vào công ty (được hỗ trợ bởi JS Global VN).<br></br>
                                <br></br>
                                <strong>
                                    3. Từ lúc trúng tuyển đến khi sang Nhật làm việc chính thức, mất khoảng bao nhiêu thời gian? 
                                    Các bước cụ thể tiếp theo là gì? Mọi chi phí khi làm thủ tục sẽ do ai chịu trách nhiệm?
                                </strong><br></br>
                                    Từ lúc trúng tuyển đến khi sang Nhật làm việc chính thức mất khoảng 2~3 tháng.  <br></br>
                                    Các bước cụ thể :<br></br>
                                    B1: Sau khi trúng tuyển, công ty Nhật sẽ gửi cho bạn Thông báo trúng tuyển,
                                        Bản chấp nhận tuyển dụng và Hợp đồng của công ty. <br></br>
                                    B2: Chuẩn bị hồ sơ nộp sang Nhật để làm Tư cách lưu trú. Làm tư cách lưu trú trong khoảng 1,5 đến 2 tháng.<br></br>
                                    B3: Sau khi có Tư cách lưu trú, công ty Nhật sẽ gửi về công ty JS Global.
                                    Công ty JS Global sẽ hướng dẫn bạn làm Visa tại Việt Nam. Làm Visa hết khoảng 1 tuần.
                                        Trong thời gian chờ lấy visa, công ty sẽ chốt lịch sang Nhật và tiến hành mua vé máy bay. <br></br>
                                    Tất cả các thủ tục sẽ do công ty Nhật tiến hành và công ty JS Global hỗ trợ.
                                    Các bạn sẽ hoàn toàn không mất bất cứ một khoản chi phí nào cho những thủ tục này.<br></br>
                                <br></br>
                                <strong>4. Các công ty Nhật thường có mức lương khoảng bao nhiêu?
                                    Tiền lương đó có đủ chi trả các chi phí ở Nhật và tiệt kiệm tiền không?</strong><br></br>
                                    Các công ty của Nhật thường có mức lương khoảng từ 220,000 JPY đến 250,000 JPY.
                                    Ngoài ra công ty có trợ cấp nhà ở, đi lại, tiền ăn cho nhân viên.
                                    Trường hợp không hỗ trợ tiền ăn trưa, thì các bạn có thể ăn ở nhà ăn của công ty
                                    với giá khoảng 200 JPY/bữa. Các chi phí khác như điện, gas, ăn uống… khoảng 40,000 JPY/tháng.
                                    Với chi phí như thế, mức lương của các bạn hoàn toàn có thể đủ chi trả cho cuộc sống
                                    và tiết kiệm 100,000 đến 140,000 JPY/tháng.<br></br>
                                <br></br>
                                <strong>5. Các công ty Nhật có nộp bảo hiểm cho nhân viên không?</strong><br></br>
                                    Có. Tất cả các công ty đều nộp bảo hiểm cho nhân viên theo quy định của Nhật Bản,
                                    bao gồm: bảo hiểm sức khỏe, bảo hiểm lao động, bảo hiểm thất nghiệp và một số
                                    loại bảo hiểm khách theo đặc thù công việc và chế độ của công ty.<br></br>
                                <br></br>
                                <strong>6. Ứng viên chưa biết tiếng Nhật có thể ứng tuyển các công việc tại JS Global VN không?</strong><br></br>
                                    Có. Một số công ty Nhật Bản không yêu cầu ứng viên đã biết tiếng Nhật và hơn nữa
                                    ứng viên sẽ được đào tạo tiếng Nhật sau khi đã được nhận và cam kết làm việc tại công ty.
                                    Tuy nhiên, biết tiếng Nhật sẽ là một lợi thế rất lớn khi bạn ứng tuyển vào các công ty Nhật Bản.
                                    Vì thế, JS Global VN luôn khuyến khích các bạn ứng viên bắt đầu học tiếng Nhật càng sớm càng tốt.<br></br>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>Biên phiên dịch</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                    <b>1. Giá biên phiên dịch Nhật – Anh, Nhật Việt – là bao nhiêu?</b><br></br>
                                    Giá biên phiên dịch phụ thuộc vào yêu cầu của khách hàng và nội dung dịch.
                                    JS Global VN sẽ báo giá trong vòng 2 tiếng sau khi nhận được yêu cầu cụ thể.
                                    Vui lòng liên hệ số điện thoại 0987566895 để được tư vấn trực tiếp.<br></br>
                                    <br></br>
                                    <b>2. Làm thế nào để ứng tuyển vào vị trí biên phiên dịch cho JS Global VN ?</b><br></br>
                                    Để ứng tuyển các vị trí biên phiên dịch cho JS Global VN,
                                    bạn vui lòng gửi CV tới email apply.JS Global@gmail.com với tiêu đề
                                    “Ứng tuyển vị trí Biên phiên dịch cho JS Global VN”.<br></br>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>Kết nối thương mại</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                    <b>1. JS Global VN có các dịch vụ nào để hỗ trợ Kết nối thương mại?</b><br></br>
                                    JS Global VN là chuyên gia trong kết nối thương mại Việt – Nhật.
                                    Chúng tôi có mạng lưới kinh doanh rộng khắp Việt Nam – Nhật Bản và có thể 
                                    đáp ứng tất cả các yêu cầu của quý doanh nghiệp như: <br></br>
                                    - Tìm kiếm cơ hội kinh doanh, đầu tư<br></br>
                                    - Điều tra thị trường, tìm kiếm đối tác<br></br>
                                    - Tư vấn pháp lý<br></br>
                                    - Tư vấn lập văn phòng đại diện<br></br>
                                    - Tư vấn xây dựng nhà xưởng, lắp đặt thiết bị<br></br>
                                    - Hỗ trợ tuyển dụng nhân sự<br></br>
                                    <br></br>
                                    <b>2. JS Global VN có giới hạn các ngành nghề tư vấn kết nối không?</b><br></br>
                                    Không. Chúng tôi đã kết nối thành công trên nhiều lĩnh vực từ sản xuất đến thương mại, 
                                    dịch vụ có thể kể đến như công nghệ thông tin, gia công sản xuất, may mặc, 
                                    thực phẩm, máy móc, sản phẩm điện tử, đồ gia dụng, đồ gỗ… Hơn nữa, 
                                    với mạng lưới kinh doanh sâu rộng, chúng tôi tự tin có thể đáp ứng mọi nhu cầu 
                                    kết nối của quý công ty.<br></br>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                <br></br><br></br>
                <Circle classes={classes} />
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))