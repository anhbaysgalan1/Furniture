import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import withStyles from '@material-ui/core/styles/withStyles'
import BaseView from 'views/BaseView'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
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
} from '@material-ui/core'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
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
            backgroundColor: 'red',
            transform: "scale(1.1)",
            transitionDuration: "1s",
            transitionTimingFunction: "linear",
        }
    }
})

const img = [
    {
      img: 'https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg',
      title: 'Hiện đại vuông vắn lịch lãm quý phái',
      content: ''
    },
    {
      img: 'https://sdk.vn/wp-content/uploads/2018/11/s%C6%A1n-g%E1%BB%97-ph%E1%BB%A7-m%E1%BB%9D.jpg',
      title: 'Phong cách hoàng gia, đậm chất cổ điển',
      content: '',
    },
    {
      img: 'https://nhadepnhaxinh.vn/images/p.kh%C3%A1ch_t%E1%BA%A7ng_1_.2_1.jpg',
      title: 'Thiết kế tiện nghi sang trọng',
      content: '',
    },
    {
      img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2017/10/04/59d4564373a4f_1507087939.jpg',
      title: 'Sang trọng với giường ngủ cổ điển',
      content: ''
    },
    {
      img: 'https://vatlieuxaydung.org.vn/Upload/48/Nam_2018/Thang_12/Ngay_19/vlxd.org_nguyentac2.jpg',
      title: '',
      content: ''
    },
    {
      img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
      title: '',
      content: ''
    },
    {
      img: 'http://noithatdephanoi.com.vn/uploads/images/tu-bep-go-son-mau-chu-l-co-dien/n9.jpg',
      title: '',
      content: ''
    },
    {
      img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2018/09/04/5b8e559546990_1536054677.jpg',
      title: '',
      content: ''
    }
  ]
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
                <Typography variant='h6' className={classes.title}> 
                    Sản phẩm khuyến mãi
                </Typography>
                <Grid container spacing={0}>
                    {
                        img.map((item, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                            <img
                                className={classes.imgZoom}
                                src={item.img}
                                height='100%'
                                width='100%'
                            />
                            </Grid>
                        )
                        })
                    }
                </Grid>
           </Card>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))
