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
import moment from 'moment'
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
        return (
            <Card>
                <AppBar position="static">
                    <Toolbar variant="dense">
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
                </CardContent>
            </Card>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))