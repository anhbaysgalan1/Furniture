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
import What from '../Public/What'
import Header from '../Public/Header/Header'
import Home from '../Public/Home'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    titleContent: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
    },
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderChance(classes) {
        return (
            <Grid container spacing={16}>
                <Grid item lg={2}></Grid>
                <Grid item lg={9}>
                    <Typography variant='h5' className={classes.titleContent}> 
                        Đạt tiêu chuẩn chất lượng xuất khẩu 
                    </Typography>
                    <br></br>
                    <Grid container spacing={8}>
                        <Grid item lg={6}>
                            <img
                                src="https://static.ybox.vn/2016/10/5/60d39296-8abc-11e6-9c2d-04011537df01.png"
                                style={{
                                        backgroundImage: "url('https://static.ybox.vn/2016/10/5/60d39296-8abc-11e6-9c2d-04011537df01.png')",
                                        width: '400px',
                                        height: '200px',
                                        border: 'solid 5px white',
                                        borderRadius: '50%',
                                    }}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <Grid container spacing={8}>
                                <Grid item lg={4}>
                                    <img
                                        src="https://media.ohay.tv/v1/upload/content/2017-12/26/28967-12ded3f078285ddca64c482cb0732e30-ohaytv.jpg"
                                        height='80'
                                        width='150'
                                    />
                                </Grid>
                                <Grid item lg={8}>
                                    <Typography variant='h5'>
                                        Hàn Quốc
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Với kim ngạch xuất khẩu đạt gần 500 triệu USD/năm, 
                                            Hàn Quốc là một trong những thị trường 
                                            quan trọng nhất của Việt Nam đối với việc
                                            tiêu thụ các mặt hàng đồ gỗ và sản phẩm gỗ.
                                        </li>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8}>
                                <Grid item lg={4}>
                                    <img
                                        src="https://laodongxuatkhau.vn/images/2017/12/21/quoc-ky-nhat-ban.jpg"
                                        height='80'
                                        width='150'
                                    />
                                </Grid>
                                <Grid item lg={8}>
                                    <Typography variant='h5'>
                                        Nhật Bản
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Bộ Thương mại đang khuyến khích các 
                                            doanh nghiệp sản xuất đồ gỗ Việt Nam 
                                            đẩy mạnh xuất khẩu sang Nhật Bản. 
                                            Theo dự tính, kim ngạch xuất khẩu 
                                            đồ gỗ sang Nhật năm 2019 sẽ đạt khoảng 
                                            700 triệu USD và có thể tăng gấp đôi, 
                                            đạt 1.5 tỷ USD vào 2022.
                                        </li>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8}>
                                <Grid item lg={4}>
                                    <img
                                        src="https://znews-photo.zadn.vn/w660/Uploaded/mdf_xqkxvu/2019_03_21/zing_q7.jpeg"
                                        height='80'
                                        width='150'
                                    />
                                </Grid>
                                <Grid item lg={8}>
                                    <Typography variant='h5'>
                                        TRUNG QUỐC
                                    </Typography>
                                    <Typography>
                                        <li>
                                            Trung Quốc là một trong những thị trường tiêu thụ gỗ 
                                            khá lớn nhưng lâu nay chỉ chủ yếu nhập gỗ nguyên liệu 
                                            và một phần sản phẩm gỗ mỹ nghệ từ Việt Nam. 
                                        </li>
                                        <li>
                                            Hiện nhu cầu về đồ gỗ nội thất ở Trung Quốc 
                                            đang tăng lên cả về số lượng lẫn sự đa dạng chủng loại, 
                                            mẫu mã.
                                        </li>
                                    </Typography>
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={8}>
                                <Grid item lg={4}>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg"
                                        height='80'
                                        width='150'
                                    />
                                </Grid>
                                <Grid item lg={8}>
                                    <Typography variant='h5'>
                                        NƯỚC THÀNH VIÊN ĐÔNG NAM Á
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
                </Grid>
                <Grid item lg={1}></Grid>
            </Grid>
        )
    }


    render() {
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
        return (
            <div>
                <p>Uy tín</p>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))