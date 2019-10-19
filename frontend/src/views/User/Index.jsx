import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import { 
    IconButton, 
    Icon, 
    Tooltip, 
    Button, Card, 
    CardActions,
    CardContent, 
    Grid, 
    CardHeader, 
    Typography, 
    AppBar,
    Toolbar,

} from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import ExportExcel from 'components/ExportExcel/ExportExcel'
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation'
import { 
    MDBCarousel, 
    MDBCarouselInner, 
    MDBCarouselItem, 
    MDBView, 
    MDBContainer 
} from "mdbreact"
import Home from './Components/Home'
import { Link } from 'react-router-dom'
import ButtonViews from './Components/ButtonViews'
import CardActionArea from './Components/CardActionArea'
import Header from '../Public/Header/Header'
import Foggy from './Components/Foggy'
import Job from './Components/Job'
import TeamImg from './Components/TeamImg'
import Advertise from './Components/Advertise'
import News from './Components/News'
import Circle from '../Public/Circle'
import Skeleton from './Components/Skeleton'
import _ from 'lodash'


const styles = theme => ({
    button: {
        marginRight: '5px'
    },
    cssBorder: {
        margin: '50px',
        fontSize: '20px',
        width: '200px',
        height: '200px',
        border: 'solid 10px #039be5',
        background: '#039be5',
        borderRadius: '50%',
    }
})

class Index extends BaseView {
    constructor(props) {
        super(props)
    }

    renderHeaderHome(classes) {
        return (
            <div>
                <Card raised={true}>
                    <CardContent> 
                        <Header classes={classes} />
                    </CardContent>
                    <Home classes={classes} />
                </Card>
            </div>
        )
    }

    renderTeam (){
        return (
            <div>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar >
                            <Typography variant="h5" color='inherit' component='h5'>
                                Team JS Global
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </CardContent>
                <TeamImg />
            </div>
        )
    }

    renderNews(classes) {
        return (
            <span>
                <Grid container spacing={32}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Card>
                            <AppBar position="static">
                                <Toolbar >
                                    <Typography variant="h5" color='inherit' component='h5'>
                                        Tin tức
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <CardContent>
                                <News />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <AppBar position="static">
                                <Toolbar >
                                    <Typography variant="h6" color='inherit' component='h6'>
                                    Bài viết được quan tâm
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <CardContent>
                                <Typography>
                                    Những điều không thể bỏ qua khi sống tại Toyama Nhật Bản
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Chị Trần Thị Khanh - CEO JS Global VN Trên Báo Nhật Fukushima
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Hội Thảo Định Hướng Việc Làm Tại Nhật Bản Tháng
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Hội Thảo Tiếng Nhật Và Cơ Hội Việc Làm
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Sinh Viên Đại Học Bách Khoa Tìm Hiểu Cơ Hội Làm Việc Nghìn Đô Sau Khi Tốt Nghiệp!
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Mời Tham Gia Workshop CƠ HỘI VIỆC LÀM TẠI NHẬT BẢN NĂM 2019
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Tỉnh Hyogo Nhật Bản có gì khiến người ta mê mẩn quên lối về?
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Kanagawa Nhật Bản - Nơi lý tưởng cho lao động yêu công nghệ, kỹ thuật
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    5 LỜI KHUYÊN cho lao động khi tham gia chương trình XKLĐ Nhật 2020
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Lưu ý PHẢI BIẾT khi đi Nhật Bản làm điều dưỡng năm 2019
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    4 lưu ý về đơn hàng kỹ sư công nghệ thông tin tại Nhật Bản
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    So sánh mức lương xuất khẩu lao động Hàn Quốc với Nhật Bản năm 2020
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    Đổi yên Nhật ở đâu? Có cần đổi tiền khi đi xuất khẩu lao động Nhật Bản
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    5 lý do XKLĐ Nhật Bản 2020 lựa chọn số 1 của người lao động
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    3 Ngân hàng hỗ trợ vay vốn đi xuất khẩu lao động Nhật Bản
                                </Typography>
                                <hr></hr>
                                <Typography>
                                    3 Ngân hàng hỗ trợ vay vốn đi xuất khẩu lao động Nhật Bản
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </span>
        )
    }

    renderAction(classes) {
        return (
            <span>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar >
                            <Typography variant="h5" color='inherit' component='h5'>
                            Hoạt động
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </CardContent>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        
                        <CardActionArea classes={classes} />
                    </Grid>
                </Grid>
                <hr></hr>
            </span>
        )
    }

    renderInfo(classes) {
        return (
            <span>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar >
                            <Typography variant="h5" color='inherit' component='h5'>
                                Giới thiệu
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </CardContent>
                <Grid container spacing={32}>
                    <Grid item xs={8}>
                        <Foggy />
                    </Grid>
                    <Grid item xs={4}>
                        <Advertise />
                    </Grid>
                </Grid>
                <Typography variant="h5" color='inherit' component='h5'>
                    Mỗi nấc thang và sự quyết định thay đôi sẽ đưa bạn tới những thành công ngoài mong đợi
                </Typography>
                    <Grid container spacing={32}>
                        <Grid item xs={4}>
                        
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color='inherit' component='h6'>
                                Thành Công luôn dành cho người biết cố gắng va thay đổi
                            </Typography>
                            
                            <Typography color='inherit' component='h5'>
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            </Typography>
                          
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={3}>
                        
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color='inherit' component='h6'>
                                Thành Công luôn dành cho người biết cố gắng va thay đổi
                            </Typography>
                            
                            <Typography color='inherit' component='h5'>
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            </Typography>
                          
                        </Grid>
                        <Grid item xs={3}>
                        
                        </Grid>
                        <Grid item xs={2}>
                        
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color='inherit' component='h6'>
                                Thành Công luôn dành cho người biết cố gắng va thay đổi
                            </Typography>
                            
                            <Typography color='inherit' component='h5'>
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            </Typography>
                          
                        </Grid>
                        <Grid item xs={4}>
                        
                        </Grid>
                        <Grid item xs={1}>
                        
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color='inherit' component='h6'>
                                Thành Công luôn dành cho người biết cố gắng va thay đổi
                            </Typography>
                            
                            <Typography color='inherit' component='h5'>
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )
                            Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan 
                            </Typography>
                          
                        </Grid>
                        <Grid item xs={5}>
                        
                        </Grid>
                    </Grid>
                <hr></hr>
            </span>
        )
    }

    renderJob(classes) {
        return (
            <span>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar >
                            <Typography variant="h5" color='inherit' component='h5'>
                                Tuyển dụng
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </CardContent>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Job />
                        <br></br>
                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={7}>
                        <Typography variant='h6' >
                            KỸ SƯ XÂY DỰNG
                        </Typography>
                        <Typography>
                            NỘI DUNG TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            - Công việc cụ thể:<br></br>
                            + Đọc bản vẽ <br></br>
                            + Quản lý giám sát thi công<br></br>
                            + Hướng dẫn thực tập sinh<br></br>
                            - Thời gian hợp đồng của người lao động: 3 - 5 năm.<br></br>
                        </Typography>
                        <Typography>
                            TIÊU CHÍ TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            Độ tuổi: từ 18-30 tuổi
                            + Trình độ văn hóa: Tốt nghiệp từ cao đẳng trở lên chuyên ngành về xây dựng
                            + Yêu cầu kinh nghiệm làm việc: Có kinh nghiệm làm việc trong lĩnh vực xây dựng, 
                            các công việc liên quan đến chân tay, chịu được áp lực cao trong công việc...
                            Ngoại hình sáng sủa (không có hình xăm), hòa đồng, chín chắn. 
                            Có sức khỏe tốt (không mắc một trong những bệnh tật được đề cập trong bài viết này), 
                            thật thà, nhanh nhẹn. 
                        </Typography>
                        <Typography>
                            Khi tham gia chương trình kỹ sư cơ khí làm việc tại Nhật Bản, 
                            ngoài mức thu nhập cao, môi trường làm việc tốt, người lao động còn được đảm bảo nhiều chế độ, lợi ích mà những bạn đi theo chương trình thực tập sinh kỹ năng không có được. 
                            Để hiểu rõ hơn những lợi ích của mình khi đi Nhật theo diện kỹ sư
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={7}>
                        <Typography variant='h6' >
                            KỸ SƯ Ô TÔ
                        </Typography>
                        <Typography>
                            NỘI DUNG TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            - Công việc cụ thể:<br></br>
                            + Đọc bản vẽ <br></br>
                            + Quản lý giám sát thi công<br></br>
                            + Hướng dẫn thực tập sinh<br></br>
                            - Thời gian hợp đồng của người lao động: 3 - 5 năm.<br></br>
                        </Typography>
                        <Typography>
                            TIÊU CHÍ TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            Độ tuổi: từ 18-30 tuổi
                            + Trình độ văn hóa: Tốt nghiệp từ cao đẳng trở lên chuyên ngành về xây dựng
                            + Yêu cầu kinh nghiệm làm việc: Có kinh nghiệm làm việc trong lĩnh vực xây dựng, 
                            các công việc liên quan đến chân tay, chịu được áp lực cao trong công việc...
                            Ngoại hình sáng sủa (không có hình xăm), hòa đồng, chín chắn. 
                            Có sức khỏe tốt (không mắc một trong những bệnh tật được đề cập trong bài viết này), 
                            thật thà, nhanh nhẹn. 
                        </Typography>
                        <Typography>
                            Khi tham gia chương trình kỹ sư cơ khí làm việc tại Nhật Bản, 
                            ngoài mức thu nhập cao, môi trường làm việc tốt, người lao động còn được đảm bảo nhiều chế độ, lợi ích mà những bạn đi theo chương trình thực tập sinh kỹ năng không có được. 
                            Để hiểu rõ hơn những lợi ích của mình khi đi Nhật theo diện kỹ sư
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={7}>
                        <Typography variant='h6' >
                            KỸ SƯ ĐIỆN - ĐIỆN TỬ
                        </Typography>
                        <Typography>
                            NỘI DUNG TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            - Công việc cụ thể:<br></br>
                            + Đọc bản vẽ <br></br>
                            + Quản lý giám sát thi công<br></br>
                            + Hướng dẫn thực tập sinh<br></br>
                            - Thời gian hợp đồng của người lao động: 3 - 5 năm.<br></br>
                        </Typography>
                        <Typography>
                            TIÊU CHÍ TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            Độ tuổi: từ 18-30 tuổi
                            + Trình độ văn hóa: Tốt nghiệp từ cao đẳng trở lên chuyên ngành về xây dựng
                            + Yêu cầu kinh nghiệm làm việc: Có kinh nghiệm làm việc trong lĩnh vực xây dựng, 
                            các công việc liên quan đến chân tay, chịu được áp lực cao trong công việc...
                            Ngoại hình sáng sủa (không có hình xăm), hòa đồng, chín chắn. 
                            Có sức khỏe tốt (không mắc một trong những bệnh tật được đề cập trong bài viết này), 
                            thật thà, nhanh nhẹn. 
                        </Typography>
                        <Typography>
                            Khi tham gia chương trình kỹ sư cơ khí làm việc tại Nhật Bản, 
                            ngoài mức thu nhập cao, môi trường làm việc tốt, người lao động còn được đảm bảo nhiều chế độ, lợi ích mà những bạn đi theo chương trình thực tập sinh kỹ năng không có được. 
                            Để hiểu rõ hơn những lợi ích của mình khi đi Nhật theo diện kỹ sư
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={7}>
                        <Typography variant='h6' >
                            KỸ SƯ CƠ KHÍ
                        </Typography>
                        <Typography>
                            NỘI DUNG TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            - Công việc cụ thể:<br></br>
                            + Đọc bản vẽ <br></br>
                            + Quản lý giám sát thi công<br></br>
                            + Hướng dẫn thực tập sinh<br></br>
                            - Thời gian hợp đồng của người lao động: 3 - 5 năm.<br></br>
                        </Typography>
                        <Typography>
                            TIÊU CHÍ TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            Độ tuổi: từ 18-30 tuổi
                            + Trình độ văn hóa: Tốt nghiệp từ cao đẳng trở lên chuyên ngành về xây dựng
                            + Yêu cầu kinh nghiệm làm việc: Có kinh nghiệm làm việc trong lĩnh vực xây dựng, 
                            các công việc liên quan đến chân tay, chịu được áp lực cao trong công việc...
                            Ngoại hình sáng sủa (không có hình xăm), hòa đồng, chín chắn. 
                            Có sức khỏe tốt (không mắc một trong những bệnh tật được đề cập trong bài viết này), 
                            thật thà, nhanh nhẹn. 
                        </Typography>
                        <Typography>
                            Khi tham gia chương trình kỹ sư cơ khí làm việc tại Nhật Bản, 
                            ngoài mức thu nhập cao, môi trường làm việc tốt, người lao động còn được đảm bảo nhiều chế độ, lợi ích mà những bạn đi theo chương trình thực tập sinh kỹ năng không có được. 
                            Để hiểu rõ hơn những lợi ích của mình khi đi Nhật theo diện kỹ sư
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={7}>
                        <Typography variant='h6' >
                            KỸ SƯ CÔNG NGHỆ THÔNG TIN
                        </Typography>
                        <Typography>
                            NỘI DUNG TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            - Công việc cụ thể:<br></br>
                            + Đọc bản vẽ <br></br>
                            + Quản lý giám sát thi công<br></br>
                            + Hướng dẫn thực tập sinh<br></br>
                            - Thời gian hợp đồng của người lao động: 3 - 5 năm.<br></br>
                        </Typography>
                        <Typography>
                            TIÊU CHÍ TUYỂN DỤNG
                        </Typography>
                        <Typography>
                            Độ tuổi: từ 18-30 tuổi
                            + Trình độ văn hóa: Tốt nghiệp từ cao đẳng trở lên chuyên ngành về xây dựng
                            + Yêu cầu kinh nghiệm làm việc: Có kinh nghiệm làm việc trong lĩnh vực xây dựng, 
                            các công việc liên quan đến chân tay, chịu được áp lực cao trong công việc...
                            Ngoại hình sáng sủa (không có hình xăm), hòa đồng, chín chắn. 
                            Có sức khỏe tốt (không mắc một trong những bệnh tật được đề cập trong bài viết này), 
                            thật thà, nhanh nhẹn. 
                        </Typography>
                        <Typography>
                            Khi tham gia chương trình kỹ sư cơ khí làm việc tại Nhật Bản, 
                            ngoài mức thu nhập cao, môi trường làm việc tốt, người lao động còn được đảm bảo nhiều chế độ, lợi ích mà những bạn đi theo chương trình thực tập sinh kỹ năng không có được. 
                            Để hiểu rõ hơn những lợi ích của mình khi đi Nhật theo diện kỹ sư
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
            </span>
        )
    }

    renderChance(classes) {
        return (
            <span>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar >
                            <Typography variant="h5" color='inherit' component='h5'>
                            Cơ hội
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </CardContent>
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <center>
                            <div
                                className="card card-image mb-3"
                                style={{
                                    backgroundImage: "url('https://static.ybox.vn/2016/10/5/60d39296-8abc-11e6-9c2d-04011537df01.png')",
                                    width: '600px',
                                    height: '400px',
                                    border: 'solid 5px white',
                                    borderRadius: '50%',
                                }}
                            >
                                <Grid container spacing={32}>
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                </Grid>
                            </div>
                        </center>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={4}>
                                <img
                                    src="https://media.ohay.tv/v1/upload/content/2017-12/26/28967-12ded3f078285ddca64c482cb0732e30-ohaytv.jpg"
                                    height='100'
                                    width='180'
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h4'>
                                    Hàn Quốc
                                </Typography>
                                <Typography>
                                    Sống học tập và làm việc ở Hàn Quốc là một cơ hội tốt
                                    để bạn trau dồi kinh nghiệm trong học tập.
                                    Đồng thời giúp bạn có mức thu nhập đáng mơ ước
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <img
                                    src="https://laodongxuatkhau.vn/images/2017/12/21/quoc-ky-nhat-ban.jpg"
                                    height='100'
                                    width='180'
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h4'>
                                    Nhật Bản
                                </Typography>
                                <Typography>
                                    Sống học tập và làm việc ở Hàn Quốc là một cơ hội tốt
                                    để bạn trau dồi kinh nghiệm trong học tập.
                                    Đồng thời giúp bạn có mức thu nhập đáng mơ ước
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <img
                                    src="https://znews-photo.zadn.vn/w660/Uploaded/mdf_xqkxvu/2019_03_21/zing_q7.jpeg"
                                    height='100'
                                    width='180'
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h4'>
                                    Đài Loan
                                </Typography>
                                <Typography>
                                    Sống học tập và làm việc ở Hàn Quốc là một cơ hội tốt
                                    để bạn trau dồi kinh nghiệm trong học tập.
                                    Đồng thời giúp bạn có mức thu nhập đáng mơ ước
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg"
                                    height='100'
                                    width='180'
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h4'>
                                    Úc
                                </Typography>
                                <Typography>
                                    Sống học tập và làm việc ở Hàn Quốc là một cơ hội tốt
                                    để bạn trau dồi kinh nghiệm trong học tập.
                                    Đồng thời giúp bạn có mức thu nhập đáng mơ ước
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h6'>
                            Nhiều cơ hội sang Hàn Quốc làm việc
                        </Typography>
                        <Typography>
                        Theo nội dung Bản ghi nhớ giữa Bộ Việc làm và Lao động Hàn Quốc và 
                        Bộ Lao động - Thương binh và Xã hội Việt Nam về chương trình đưa người lao động (NLĐ) 
                        Việt Nam đi làm việc tại Hàn Quốc theo chương trình cấp phép cho lao động nước ngoài 
                        của Hàn Quốc (chương trình EPS), kỳ thi tiếng Hàn năm 2019 đối với các ngành sản xuất chế tạo, 
                        xây dựng và ngư nghiệp sẽ được tổ chức vào tháng 7 và tháng 9-2019.
                        <i>
                        Theo đó, NLĐ có độ tuổi từ 18-39; không có án tích theo quy định của pháp luật; 
                        chưa từng bị trục xuất khỏi Hàn Quốc; nếu đã từng cư trú tại Hàn Quốc 
                        theo visa E9 (lao động EPS) hoặc visa E10 (thuyền viên tàu đánh cá) thì tổng thời gian 
                        cư trú phải dưới 5 năm; không bị cấm xuất cảnh Việt Nam; không có thân nhân đang 
                        cư trú bất hợp pháp tại Hàn Quốc. NLĐ đăng ký thi ngành ngư nghiệp cần có kinh 
                        nghiệm đánh bắt hoặc nuôi trồng thủy hải sản trên biển, có sức khỏe và chịu được sóng nước 
                        để làm việc trên tàu biển hoặc đã được đào tạo và cấp chứng chỉ đối với các 
                        ngành nghề liên quan đến ngư nghiệp. Đối với ngành sản xuất chế tạo và xây dựng, 
                        NLĐ chưa từng đi làm việc tại Hàn Quốc, 
                        cư trú dài hạn tại các địa phương không tạm dừng tuyển chọn lao động năm 2019.
                        
                        NLĐ đã từng làm việc tại Hàn Quốc theo chương trình EPS về nước đúng hạn hợp đồng. 
                        NLĐ đã từng làm việc tại Hàn Quốc theo chương trình EPS, ở lại cư trú 
                        bất hợp pháp nhưng đã tự nguyện về nước trong các khoảng thời gian 
                        từ ngày 1-4-2016 đến hết ngày 31-12-2016, từ ngày 10-7-2017 đến 
                        hết ngày 31-10-2017 và từ ngày 1-10-2018 đến hết ngày 31-3-2019 cũng được phép dự tuyển.
                        </i>
                        </Typography>

                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h6'>
                            Cơ hội việc làm tại nhật
                        </Typography>
                        <Typography>
                        Hiện nay, do Nhật Bản đang thiếu hụt trầm trọng nhân lực trong các ngành kỹ thuật, 
                        đặc biệt là công nghệ thông tin và xây dựng, do vậy cơ hội việc làm cho 
                        các bạn đã theo học ngành này là rất lớn. 

                        Khác với Việt Nam, các công ty Nhật Bản tuyển dụng các bạn sinh viên từ trước
                        khi ra trường gần 1 năm. Chính vì vậy, muốn xin được việc ngay khi 
                        tốt nghiệp trường tiếng (thường là 2 năm), các bạn sinh viên cần 
                        bắt đầu xin việc ngay khi bắt đầu vào năm thứ 2.

                        Tuy nhiên, do không biết được vấn đề này, nên rất nhiều bạn 
                        bắt đầu xin việc rất muộn (khoảng 2-3 tháng trước khi ra trường), 
                        khi mùa tuyển dụng chính của Nhật đã kết thúc, và đành phải học 
                        tiếp lên senmon để có thêm visa và thời gian để tiếp tục xin việc.

                        Ngoài ra, phần lớn các bạn mới chỉ học 2-3 tháng tiếng Nhật ở Việt Nam 
                        trước khi sang Nhật du học, nên vào thời điểm đầu năm thứ 2 trường tiếng, 
                        khả năng giao tiếp tiếng Nhật của nhiều bạn còn chưa tốt. Vì vậy 
                        nhiều bạn chưa dám đi xin việc ngay do không đủ tự tin về trình độ tiếng Nhật của mình, 
                        hoặc nếu có đi phỏng vấn thì cũng khó được nhận…  
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h6'>
                            Cơ hội việc làm tại Đài Loan
                        </Typography>
                        <Typography>
                        Hiện nay, do Nhật Bản đang thiếu hụt trầm trọng nhân lực trong các ngành kỹ thuật, 
                        đặc biệt là công nghệ thông tin và xây dựng, do vậy cơ hội việc làm cho 
                        các bạn đã theo học ngành này là rất lớn. 

                        Khác với Việt Nam, các công ty Nhật Bản tuyển dụng các bạn sinh viên từ trước
                        khi ra trường gần 1 năm. Chính vì vậy, muốn xin được việc ngay khi 
                        tốt nghiệp trường tiếng (thường là 2 năm), các bạn sinh viên cần 
                        bắt đầu xin việc ngay khi bắt đầu vào năm thứ 2.

                        Tuy nhiên, do không biết được vấn đề này, nên rất nhiều bạn 
                        bắt đầu xin việc rất muộn (khoảng 2-3 tháng trước khi ra trường), 
                        khi mùa tuyển dụng chính của Nhật đã kết thúc, và đành phải học 
                        tiếp lên senmon để có thêm visa và thời gian để tiếp tục xin việc.

                        Ngoài ra, phần lớn các bạn mới chỉ học 2-3 tháng tiếng Nhật ở Việt Nam 
                        trước khi sang Nhật du học, nên vào thời điểm đầu năm thứ 2 trường tiếng, 
                        khả năng giao tiếp tiếng Nhật của nhiều bạn còn chưa tốt. Vì vậy 
                        nhiều bạn chưa dám đi xin việc ngay do không đủ tự tin về trình độ tiếng Nhật của mình, 
                        hoặc nếu có đi phỏng vấn thì cũng khó được nhận…  
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h6'>
                            Cơ hội việc làm tại úc
                        </Typography>
                        <Typography>
                        Hiện nay, do Nhật Bản đang thiếu hụt trầm trọng nhân lực trong các ngành kỹ thuật, 
                        đặc biệt là công nghệ thông tin và xây dựng, do vậy cơ hội việc làm cho 
                        các bạn đã theo học ngành này là rất lớn. 

                        Khác với Việt Nam, các công ty Nhật Bản tuyển dụng các bạn sinh viên từ trước
                        khi ra trường gần 1 năm. Chính vì vậy, muốn xin được việc ngay khi 
                        tốt nghiệp trường tiếng (thường là 2 năm), các bạn sinh viên cần 
                        bắt đầu xin việc ngay khi bắt đầu vào năm thứ 2.

                        Tuy nhiên, do không biết được vấn đề này, nên rất nhiều bạn 
                        bắt đầu xin việc rất muộn (khoảng 2-3 tháng trước khi ra trường), 
                        khi mùa tuyển dụng chính của Nhật đã kết thúc, và đành phải học 
                        tiếp lên senmon để có thêm visa và thời gian để tiếp tục xin việc.

                        Ngoài ra, phần lớn các bạn mới chỉ học 2-3 tháng tiếng Nhật ở Việt Nam 
                        trước khi sang Nhật du học, nên vào thời điểm đầu năm thứ 2 trường tiếng, 
                        khả năng giao tiếp tiếng Nhật của nhiều bạn còn chưa tốt. Vì vậy 
                        nhiều bạn chưa dám đi xin việc ngay do không đủ tự tin về trình độ tiếng Nhật của mình, 
                        hoặc nếu có đi phỏng vấn thì cũng khó được nhận…  
                        </Typography>
                    </Grid>
                </Grid>
            </span>
        )
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                { this.renderHeaderHome(classes) }
                <br></br>
                { this.renderTeam(classes)}
                { this.renderNews(classes) }
                { this.renderAction(classes) }
                { this.renderInfo(classes) }
                { this.renderJob(classes) }
                { this.renderChance(classes) }
                <br></br> <br></br>
                <ButtonViews classes={classes} />
                <br></br> <br></br>
                <Circle classes={classes} />
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))