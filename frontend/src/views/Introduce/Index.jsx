import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    Grid,
    CardContent,
    AppBar,
    Toolbar, 
    CardActions,
    Typography
} from '@material-ui/core'
import moment from 'moment'
// import logo from "./logoJS.png"
// import Js from "./Js.png"
// import NewLogo from './newLogo.png'
import Home from '../Public/Home'
import _ from 'lodash'

const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    },
    marginConten: {
        parding: '5px 5px 5px 5px'
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
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/top-feature-bn-signature.jpg')"
        return (
            <div>
                <Home classes={classes} img={img} />
                <br></br>
                <br></br>
                <Grid container spacing={16}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <AppBar position="static">
                                    <Toolbar variant="dense" >
                                        <Typography variant="h6" color='inherit' component='h5'>
                                            Giới thiệu doanh nghiệp
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Grid container spacing={32}>
                                    <Grid item xs={12}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div
                                                    className="card card-image mb-3"
                                                    style={{
                                                        backgroundImage: "url('https://mettisglobal.news/wp-content/uploads/2018/04/IMG642JSCL-696x438.png')",
                                                        height: '100%',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <CardContent>
                                                        <Typography variant="h5" color='inherit' component='h5'>
                                                            Công ty cổ phần JG Global Việt Nam (JS Global VN joint stock company)
                                                        </Typography>
                                                        <Typography variant='h5' component='h5'>
                                                            <ul>
                                                                <li>Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )</li>
                                                                <li>Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan ...</li>
                                                                <li>Với sự nhiệt huyết và sự tận tâm chúng tôi luôn mong muốn giúp các bạn chắp cánh ước mơ bay xa hơn trở
                                                                    thành lao động xuất ngoại chuyên nghiệp.
                                                                </li>
                                                                <li>Phương châm làm việc phục vụ khách hàng chúng tôi tự tin sẽ mang tới cơ hội tốt nhất cho bạn và đồng
                                                                    hành cùng bạn.
                                                                </li>
                                                                <li>JS Global Phục vụ và luôn đem tới cơ hội cho bạn phát triển</li>
                                                            </ul>
                                                        </Typography>
                                                    </CardContent>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <AppBar position="static">
                                    <Toolbar variant="dense" >
                                        <Typography variant="h6" color='inherit' component='h5'>
                                            Tầm nhìn và Sứ mệnh
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Typography color='inherit'  component='h6' variant='h6'>
                                    <ol>
                                        <li>

                                            Tầm nhìn <br></br>
                                            Trở thành công ty xuất sắc trong kết nối nguồn nhân lực tài 
                                            năng của Việt Nam với các doanh nghiệp Nhật Bản nhanh nhất và phù hợp nhất.<br></br>
                                        </li>
                                        <li> 
                                            Sứ mệnh <br></br>
                                            Kết nối cơ hội nghề nghiệp từ các công ty toàn cầu với nhân sự tài năng Việt Nam, 
                                            tư vấn và hỗ trợ cho ứng viên hoàn thiện kỹ năng để có thể làm việc 
                                            và hoạt động khắp nơi trên thế giới. Cung cấp các các giải pháp kết nối hiệu quả 
                                            và nhanh chóng đóng góp cho sự phát triển thịnh vượng của khách hàng.
                                        </li>
                                    </ol>
                                </Typography>
                                <AppBar position="static">
                                    <Toolbar variant="dense" >
                                        <Typography variant="h6" color='inherit' component='h5'>
                                            Phương châm làm việc
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Typography color='inherit' component='h6' variant='h6'>
                                    <ul>
                                        <li>
                                            Phương châm làm việc phục vụ là số một, chúng tôi tự tin 
                                            sẽ mang tới cơ hội tốt nhất cho bạn và luôn đồng hành cùng bạn. <br></br>
                                        </li>
                                        <li>
                                            Lấy mục tiêu phục vụ để phát triển và đem lại sự hài lòng cho các bạn 
                                            hãy cùng chúng tôi xấy dựng ước mơ lớn hơn
                                        </li>
                                    </ul>
                                </Typography>
                            </CardContent>
                        </Card>
                       
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <AppBar position="static">
                                    <Toolbar variant="dense" >
                                        <Typography variant="h6" color='inherit' component='h5'>
                                            Thông tin doanh nghiệp
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Table size='medium'>
                                    <TableBody size='medium'>
                                        <TableRow>
                                            <TableCell align='left'>
                                                Tên Doanh nghiệp
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Công ty cổ phần JS Global VN
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Tên giao dịch
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Công ty cổ phần JS Global VN
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Mã số thuế
                                        </TableCell>
                                            <TableCell size='medium'>
                                                113113113121355
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Ngày cấp
                                        </TableCell>
                                            <TableCell size='medium'>
                                                01/01/2019
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Tình trạng hoạt động
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Đang hoạt động đã được cấp giấy phép kinh doanh
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Nơi đăng kí quản lý
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Chi cục thuế Thanh Xuân
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Địa chỉ trụ sở
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Tầng 12 tòa hà Hồ Gươm, 108 Trần Phú hà Đông hà nội
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Điện thoại
                                        </TableCell>
                                            <TableCell size='medium'>
                                                09856488956
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Chủ sở hữu
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Nguyễn Thị Hải Anh
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Địa chỉ sở hữu
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Tầng 12 tòa nhà Hồ Gươm, 108 Trần Phú Hà Đông, Hà Nội
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Giám đốc
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Nguyễn Thị Hải Anh
                                        </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='medium'>
                                                Ngành nghề kinh doanh
                                        </TableCell>
                                            <TableCell size='medium'>
                                                Tư vấn xuất khẩu lao động nước ngoài Nhật Bản, Hàn Quốc, Đài Loan ...
                                        </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))