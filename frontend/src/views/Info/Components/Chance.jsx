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
    Hidden,
    DialogContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    textAlignJustify: {
        textAlign: 'justify',
    },
    paddingPhone: {
        padding: '8px',
        textAlign: 'center',
    },
    viewsInfo: {
        overflow: 'hidden'
    },
    flag: {
        height: '80px',
        width: '150px',
        [theme.breakpoints.down('lg')]: {
            height: '70px',
            width: '120px',
        },
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

    render() {
        let { classes } = this.props
        return (
            <div className={classes.viewsInfo}>
                <Grid container spacing={16}>
                    <Grid item xs={12} md={1} lg={2}></Grid>
                    <Grid item xs={12} md={10} lg={9}>
                        <CardContent>
                            <Typography variant='h5'>
                                Mục tiêu xuất khẩu
                            </Typography>
                            <br></br>
                            <Grid container spacing={8} direction="row" justify="center" alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <center>
                                        <Hidden smUp >
                                            <img
                                                src="https://static.ybox.vn/2016/10/5/60d39296-8abc-11e6-9c2d-04011537df01.png"
                                                style={{
                                                    backgroundImage: "url('https://static.ybox.vn/2016/10/5/60d39296-8abc-11e6-9c2d-04011537df01.png')",
                                                    width: '320px',
                                                    height: '150px',
                                                    border: 'solid 5px white',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </Hidden>
                                        <Hidden xsDown >
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
                                        </Hidden>
                                    </center>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={8} direction="row" justify="center" alignItems="center">
                                        <Hidden smUp>
                                            <p>smUp</p>
                                            <Grid item xs={3} sm={3} md={4}>
                                                <img
                                                    src="https://znews-photo.zadn.vn/w660/Uploaded/mdf_xqkxvu/2019_03_21/zing_q7.jpeg"
                                                    height='50'
                                                    width='80'
                                                />
                                            </Grid>
                                            <Grid item xs={9} sm={9} md={8}>
                                                <Typography className={classes.textAlignJustify} >
                                                    <strong>Trung Quốc:</strong> là một trong những thị trường tiêu thụ gỗ
                                                    khá lớn nhưng lâu nay chỉ chủ yếu nhập gỗ nguyên liệu
                                                    và một phần sản phẩm gỗ mỹ nghệ từ Việt Nam.
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={8}>
                                                <Typography className={classes.textAlignJustify} >
                                                    Hiện nhu cầu về đồ gỗ nội thất ở Trung Quốc
                                                    đang tăng lên cả về số lượng lẫn sự đa dạng chủng loại,
                                                    mẫu mã.
                                                </Typography>
                                            </Grid>

                                        </Hidden>
                                        <Hidden xsDown>
                                            <Grid item xs={4} md={4}>
                                                <img
                                                    src="https://znews-photo.zadn.vn/w660/Uploaded/mdf_xqkxvu/2019_03_21/zing_q7.jpeg"
                                                    className={classes.flag}
                                                />
                                            </Grid>
                                            <Grid item xs={8} md={8}>
                                                <Typography variant='h6'>
                                                    TRUNG QUỐC
                                                </Typography>
                                                <Typography className={classes.textAlignJustify} >
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
                                        </Hidden>
                                    </Grid>
                                    <Grid container spacing={8} direction="row" justify="center" alignItems="center">
                                        <Hidden smUp>
                                            <Grid item xs={3} md={4}>
                                                <img
                                                    src="https://laodongxuatkhau.vn/images/2017/12/21/quoc-ky-nhat-ban.jpg"
                                                    height ='50'
                                                    width='80'
                                                />
                                            </Grid>
                                            <Grid item xs={9} md={8}>
                                                <Typography className={classes.textAlignJustify} >
                                                    <strong>Nhật Bản: </strong>Bộ Thương mại đang 
                                                    khuyến khích các doanh nghiệp sản xuất đồ gỗ 
                                                    Việt Nam đẩy mạnh xuất khẩu sang Nhật Bản.
                                                </Typography>
                                            </Grid>    
                                            <Grid item xs={12} md={8}>
                                                <Typography className={classes.textAlignJustify} >
                                                    Theo dự tính, kim ngạch xuất khẩu
                                                    đồ gỗ sang Nhật năm 2019 sẽ đạt khoảng
                                                    700 triệu USD và có thể tăng gấp đôi,
                                                    đạt 1.5 tỷ USD vào 2022.
                                                </Typography>
                                            </Grid>                                       
                                        </Hidden>
                                        <Hidden xsDown>
                                            <Grid item xs={4} md={4}>
                                                <img
                                                    src="https://laodongxuatkhau.vn/images/2017/12/21/quoc-ky-nhat-ban.jpg"
                                                    // height='80'
                                                    // width='150'
                                                    className={classes.flag}
                                                />
                                            </Grid>
                                            <Grid item xs={8} md={8}>
                                                <Typography variant='h5'>
                                                    Nhật Bản
                                                </Typography>
                                                <Typography className={classes.textAlignJustify} >
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
                                        </Hidden>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} direction="row" justify="center" alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={8} direction="row" justify="center" alignItems="center">
                                        <Hidden smUp>
                                            <Grid item xs={3} sm={3} md={4}>
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg"
                                                    height ='50'
                                                    width='80'
                                                />
                                            </Grid>
                                            <Grid item xs={9} sm={9} md={8}>
                                                <Typography className={classes.textAlignJustify} >
                                                    <strong>Nước thành viên Đông Nam Á: </strong>Sống học tập và làm việc ở Hàn Quốc là một cơ hội tốt
                                                    để bạn trau dồi kinh nghiệm trong học tập.
                                                    Đồng thời giúp bạn có mức thu nhập đáng mơ ước
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography className={classes.textAlignJustify} >
                                                    để bạn trau dồi kinh nghiệm trong học tập.
                                                    Đồng thời giúp bạn có mức thu nhập đáng mơ ước
                                                </Typography>
                                            </Grid>
                                        </Hidden>
                                        <Hidden xsDown>
                                            <Grid item xs={4} md={4}>
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg"
                                                    // height='80'
                                                    // width='150'
                                                    className={classes.flag}
                                                />
                                            </Grid>
                                            <Grid item xs={8} md={8}>
                                                <Typography variant='h5'>
                                                    NƯỚC THÀNH VIÊN ĐÔNG NAM Á
                                                </Typography>
                                                <Typography className={classes.textAlignJustify} >
                                                    Sống học tập và làm việc ở Hàn Quốc là một cơ hội tốt
                                                    để bạn trau dồi kinh nghiệm trong học tập.
                                                    Đồng thời giúp bạn có mức thu nhập đáng mơ ước
                                                </Typography>
                                            </Grid>
                                        </Hidden>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={8} direction="row" justify="center" alignItems="center">
                                        <Hidden smUp>
                                            <Grid item xs={3} sm={3} md={3}>
                                                <img
                                                    src="https://media.ohay.tv/v1/upload/content/2017-12/26/28967-12ded3f078285ddca64c482cb0732e30-ohaytv.jpg"
                                                    height ='50'
                                                    width='80'
                                                />
                                            </Grid>
                                            <Grid item xs={9} sm={9} md={9}>
                                                <Typography className={classes.textAlignJustify} >
                                                    <strong>Hàn Quốc: </strong>Với kim ngạch xuất khẩu đạt gần 500 triệu USD/năm,
                                                    Hàn Quốc là một trong những thị trường
                                                    quan trọng nhất của
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography className={classes.textAlignJustify} >
                                                    Việt Nam đối với việc
                                                    tiêu thụ các mặt hàng đồ gỗ và sản phẩm gỗ.
                                                </Typography>
                                            </Grid>
                                        </Hidden>
                                        <Hidden xsDown>
                                            <Grid item xs={4} md={4}>
                                                <img
                                                    src="https://media.ohay.tv/v1/upload/content/2017-12/26/28967-12ded3f078285ddca64c482cb0732e30-ohaytv.jpg"
                                                    // height='80'
                                                    // width='150'
                                                    className={classes.flag}
                                                />
                                            </Grid>
                                            <Grid item xs={8} md={8}>
                                                <Typography variant='h5'>
                                                    Hàn Quốc
                                                </Typography>
                                                <Typography className={classes.textAlignJustify} >
                                                    <li>
                                                        Với kim ngạch xuất khẩu đạt gần 500 triệu USD/năm,
                                                        Hàn Quốc là một trong những thị trường
                                                        quan trọng nhất của Việt Nam đối với việc
                                                        tiêu thụ các mặt hàng đồ gỗ và sản phẩm gỗ.
                                                </li>
                                                </Typography>
                                            </Grid>
                                        </Hidden>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} md={1} lg={1}></Grid>
                </Grid>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))