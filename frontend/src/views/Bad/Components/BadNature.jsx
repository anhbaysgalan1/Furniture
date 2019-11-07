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
    card: {
        maxWidth: 300,
    },
    title: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
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

let img = 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg'

let arrImg = [
    {
        // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
        img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
        code: 'S51',
        title: 'Giường hiện đại S51',
        money: '2.500.000 đ'
     },
     {
        // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
        img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
        code: 'S51',
        title: 'Giường hiện đại S51',
        money: '2.500.000 đ'
     },
     {
        // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
        img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
        code: 'S51',
        title: 'Giường hiện đại S51',
        money: '2.500.000 đ'
     },
     {
        // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
        img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
        code: 'S51',
        title: 'Giường hiện đại S51',
        money: '2.500.000 đ'
     },
     {
        // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
        img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
        code: 'S51',
        title: 'Giường hiện đại S51',
        money: '2.500.000 đ'
     },
     {
        // img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
        img: 'http://noithatgiaredng.com/StoreData/Product/99/color/tam%20compact%20mau%20trang.jpg',
        code: 'S51',
        title: 'Giường hiện đại S51',
        money: '2.500.000 đ'
     },
     
     


    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
    // {
    //     img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
    //     code: 'S51',
    //     title: 'Giường hiện đại S51',
    //     money: '2.500.000 đ'
    // },
]

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            reload: false
        }
    }

    renderBad(classes) {
        return (
            <span>
                <Grid container spacing={16}>
                    <Grid item xs={6}>
                        <Typography variant='h5' className={classes.title}>
                            Giường ngủ tự nhiên
                        </Typography>
                    </Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
                <Grid container spacing={16}>
                    {
                        arrImg.map((element, index) => {
                            return (
                                <Grid item xs={3} key={index}>
                                    <CardActionArea className={classes.imgZoom}>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="200"
                                            image={element.img}
                                            title={element.title}
                                        />
                                        <CardContent>
                                            <Typography style={{textAlign: 'center'}} color="primary">
                                                {element.title}
                                            </Typography>
                                            <Typography style={{textAlign: 'center', color: 'red'}}>
                                                {element.money}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                            )
                        })
                    }
                </Grid>
               
            </span>
        )
    }

    render() {
        let { classes } = this.props
        return this.renderBad(classes)
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))