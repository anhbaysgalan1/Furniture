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
    }
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            reload: false
        }
    }

    renderPhongThuy(classes) {
        let img = [
            {
                img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg',
                title: 'Kích thước giường ngủ theo lỗ ban hợp phong thủy',
                content: 'Nếu muốn lựa chọn được chiếc giường ngủ hợp phong thủy thì ...'
            },
            {
                img: 'https://gotrangtri.vn/wp-content/uploads/2016/03/ban-an-go-tu-nhien-phong-cach-hien-dai-GHS-4122-5-1.jpg',
                title: 'Cách chọn vị trí đặt bàn ăn theo phong thủy',
                content: 'Bàn ghế ăn là một trong những món đồ nội thất quan trọng trong'
            },
            {
                img: 'http://noithatphovip.com/file/giuong-ngu-go-xoan-nam-phi-1m8-x-2m-kieu-vay-ca-vat-phan-gnx292-2641f.jpg',
                title: 'Cách hóa giải giường ngủ trên bếp để bảo vệ sức khỏe của bạn',
                content: 'Các chuyên gia phong thủy cho biết rằng: một trong những yếu'
            },
            {
                img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg',
                title: 'Kích thước giường ngủ theo lỗ ban hợp phong thủy',
                content: 'Nếu muốn lựa chọn được chiếc giường ngủ hợp phong thủy thì ...'
            },
            {
                img: 'https://gotrangtri.vn/wp-content/uploads/2016/03/ban-an-go-tu-nhien-phong-cach-hien-dai-GHS-4122-5-1.jpg',
                title: 'Cách chọn vị trí đặt bàn ăn theo phong thủy',
                content: 'Bàn ghế ăn là một trong những món đồ nội thất quan trọng trong'
            },
            {
                img: 'http://noithatphovip.com/file/giuong-ngu-go-xoan-nam-phi-1m8-x-2m-kieu-vay-ca-vat-phan-gnx292-2641f.jpg',
                title: 'Cách hóa giải giường ngủ trên bếp để bảo vệ sức khỏe của bạn',
                content: 'Các chuyên gia phong thủy cho biết rằng: một trong những yếu'
            },
            {
                img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg',
                title: 'Kích thước giường ngủ theo lỗ ban hợp phong thủy',
                content: 'Nếu muốn lựa chọn được chiếc giường ngủ hợp phong thủy thì ...'
            },
        ]
        return (
            <Card>
                <Typography variant='h5' className={classes.title}>
                    Sản phẩm khuyến mãi
                </Typography>
                <CardContent>
                    {
                        img.map((item, index) => {
                            return (
                                <Grid container spacing={16} key={index}>
                                    <Grid item xs={4}>
                                        <img 
                                            className={classes.imgZoom}
                                            src={item.img}
                                            height='100'
                                            width='100%'
                                            alt="DODO"
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography style={{fontWeight: 'bold'}}>
                                            {item.title}
                                        </Typography>
                                        <Typography>
                                            {item.content}
                                        </Typography>
                                    </Grid>
                                    <hr></hr>
                                </Grid>
                            )
                        })
                    }
                </CardContent>
            </Card>
        )
    }


    render() {
        let { classes } = this.props
        return (
            <span>
                {
                    this.renderPhongThuy(classes)
                }
            </span>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))