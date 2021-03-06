import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../../../views/BaseView'
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
    Hidden,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
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
    }
})

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderPhongThuy(classes) {
        let img = [
            {
                img: 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://thachthatdecor.com.vn/wp-content/uploads/2019/06/kich-thuoc-giuong-ngu-theo-lo-ban-5.jpg',
                title: 'Kích thước giường ngủ theo lỗ ban hợp phong thủy',
                content: 'Bàn ghế ăn cho gia đình hiện nay được thiết kế với kiểu dáng và ...'
            },
            {
                img: 'https://gotrangtri.vn/wp-content/uploads/2016/03/ban-an-go-tu-nhien-phong-cach-hien-dai-GHS-4122-5-1.jpg',
                title: 'Cách chọn vị trí đặt bàn ăn theo phong thủy',
                content: 'Bàn ghế ăn là một trong những món đồ nội thất quan trọng trong'
            },
            {
                img: 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://thachthatdecor.com.vn/wp-content/uploads/2019/11/kich-thuoc-ban-an-theo-phong-thuy-1-1-300x200.jpg',
                title: 'Chọn kích thước bàn ăn theo phong thủy mang tài lộc vào',
                content: 'Bàn ghế ăn là một trong những món đồ nội thất quan trọng trong'
            },

        ]
        return (
            <span>
                {
                    img.map((element, index) => {
                        let link = '/size-bad'
                        switch (index) {
                            case 1:
                                link = '/change-table'
                                break
                            case 2:
                                link = '/change-size-table-eat'
                                break
                        }
                        return (
                            <Grid container spacing={8} key={index}>
                                <Grid item xs={4} md={4}>
                                    <img
                                        className={classes.imgZoom}
                                        onClick={() => this.goto(link)}
                                        src={element.img}
                                        height='100'
                                        width='100%'
                                        alt="DODO"
                                    />
                                </Grid>
                                <Grid item xs={8} md={8}>
                                    <Typography style={{ fontWeight: 'bold' }} onClick={() => this.goto(link)} >
                                        {element.title}
                                    </Typography>
                                    <Typography onClick={() => this.goto(link)} >
                                        {element.content}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </span>
        )
    }

    render() {
        let { classes } = this.props
        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={12} md={3}>
                        <Hidden smUp>
                            <Typography variant='h5' >
                                Phong Thủy
                            </Typography>
                            <hr></hr>
                        </Hidden>
                        <Hidden xsDown>
                            <Typography variant='h5' style={{ textAlign: 'center' }} >
                                Phong Thủy
                            </Typography>
                            <hr></hr>
                        </Hidden>
                        {
                            this.renderPhongThuy(classes)
                        }
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Hidden smUp>
                            <Typography variant='h5'>
                                Xu hướng
                            </Typography>
                            <hr></hr>
                        </Hidden>
                        <Hidden xsDown>
                            <Typography variant='h5' style={{ textAlign: 'center' }} >
                                Xu hướng
                            </Typography>
                            <hr></hr>
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Hidden smUp>
                            <Typography variant='h5'>
                                Kết nối tư vấn
                            </Typography>
                            <hr></hr>
                        </Hidden>
                        <Hidden xsDown>
                            <Typography variant='h5' style={{ textAlign: 'center' }} >
                                Kết nối tư vấn
                            </Typography>
                            <hr></hr>
                        </Hidden>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))