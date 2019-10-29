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
                content: 'Nếu muốn lựa chọn được chiếc giường ngủ hợp phong thủy thì ...'
            },
            {
                img: 'https://gotrangtri.vn/wp-content/uploads/2016/03/ban-an-go-tu-nhien-phong-cach-hien-dai-GHS-4122-5-1.jpg',
                title: 'Cách chọn vị trí đặt bàn ăn theo phong thủy',
                content: 'Bàn ghế ăn là một trong những món đồ nội thất quan trọng trong'
            },
        ]
        return (
            <span>
                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <img
                            className={classes.imgZoom}
                            onClick={() => this.goto("/size-bad")} 
                            src={img[0].img}
                            height='100'
                            width='100%'
                            alt="DODO"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography style={{fontWeight: 'bold'}} onClick={() => this.goto("/size-bad")} >
                            {img[0].title}
                        </Typography>
                        <Typography onClick={() => this.goto("/size-bad")} >
                            {img[0].content}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <img
                            className={classes.imgZoom} 
                            onClick={() => this.goto("/change-table")}
                            src={img[1].img}
                            height='100'
                            width='100%'
                            alt="DODO"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography style={{fontWeight: 'bold'}} onClick={() => this.goto("/change-table")}>
                            {img[1].title}
                        </Typography>
                        <Typography onClick={() => this.goto("/change-table")}>
                            {img[1].content}
                        </Typography>
                    </Grid>
                </Grid>
            </span>
        )
    }

    render() {
        let { classes } = this.props
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <Typography variant='h5' style={{textAlign: 'center'}} >
                            Phong Thủy
                        </Typography>
                        <hr></hr>
                        {
                            this.renderPhongThuy(classes)
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h5' style={{textAlign: 'center'}} >
                            Xu hướng
                        </Typography>
                        <hr></hr>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h5' style={{textAlign: 'center'}} >
                            Kết nối tư vấn
                        </Typography>
                        <hr></hr>
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