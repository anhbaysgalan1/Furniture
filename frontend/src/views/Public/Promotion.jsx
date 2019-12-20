import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import InfoIcon from '@material-ui/icons/Info'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    Grid,
    CardContent,
    CardActions,
    Typography
} from '@material-ui/core'
import OwlCarousel from 'react-owl-carousel2'
import 'react-owl-carousel2/lib/styles.css'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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
    }
})


class Actions extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { classes } = this.props
        let tileData = [
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://vecto.com.vn/wp-content/uploads/2017/04/tu_bep_soi_nga-500x495.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                promotion: '20',
                moneyNew: '3.500.000',
            },
            
        ]
        const options = { 
            items: 7, 
            nav: false, 
            rewind: false, 
            autoplay: true, 
            loop: true,
            autoplayTimeout: 3000,
            // autoplayHoverPause: false, // sẽ dừng lại khi chỏ chuật vào
        }
        const events = {
            // onDragged: function(event) {...},
            // onChanged: function(event) {...}
        }
        return (
            <div>
                <Typography variant='h6' className={classes.title} color='primary'>
                    Sản phẩm khuyến mãi
                </Typography>
                <OwlCarousel ref="car" options={options} events={events}>
                    {
                        tileData.map((element, index) => {
                            return (
                                <div key={index} style={{backgroundColor: 'white'}} className={classes.imgZoom}>
                                    {/* <Card> */}
                                        <CardContent>
                                            <img height='100' width='500' src={element.img} alt="Nội thất Dodo"/>
                                            <Typography style={{textAlign: 'center'}}>
                                                {element.title}
                                            </Typography>
                                            <Typography style={{textAlign: 'center', color:'red'}}>
                                                <del>{element.moneyOld}đ </del> - {element.moneyNew}đ
                                            </Typography>
                                        </CardContent>
                                    {/* </Card> */}
                                </div>
                            )
                        })
                    }
                </OwlCarousel>
            </div>
        )

    }
}

Actions.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Actions))
