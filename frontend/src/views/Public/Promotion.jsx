import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
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
    // imgZoom: {
    //     transition: "transform .5s, filter 3s ease-in-out",
    //     filter: "grayscale(100%)",
    // },
    // imgZoom: {
    //     "&:hover": {
    //         filter: "grayscale(0)",
    //         transform: "scale(1.1)",
    //         transitionDuration: "1s",
    //         transitionTimingFunction: "linear",
    //     }
    // }
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
                img: 'https://gotrangtri.vn/wp-content/uploads/2016/03/ban-an-go-tu-nhien-phong-cach-hien-dai-GHS-4122-5-1.jpg',
                title: 'Giường ngủ S11',
                moneyOld: '3.500.000',
                moneyNew: '2.500.000',
            },
            {
                img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                moneyNew: '3.500.000',
            },
            {
                img: 'http://vilahome.com.vn/wp-content/uploads/2018/05/Mau-giuong-da-nang-thong-minh-hien-dai-1.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                moneyNew: '3.500.000',
            },
            {
                img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                moneyNew: '3.500.000',
            },
            {
                img: 'https://funismart.com/wp-content/uploads/giuong-go-2-trieu-theo-mau-fngn2m.jpg',
                title: 'Bàn ăn cao cấp B22',
                moneyOld: '3.500.000',
                moneyNew: '3.500.000',
            },
        ]
        return (
            <div>
                <Typography variant='h6' className={classes.title} color='primary'>
                    Sản phẩm khuyến mãi
                </Typography>
                <div className={classes.root}>
                    <GridList cellHeight={180} cols={6} spacing={8} >
                        {
                            tileData.map((element, index) => {
                                return (
                                    <GridListTile key={index}>
                                        <img src={element.img} alt={element.title} />
                                        <GridListTileBar
                                            title={element.title}
                                            subtitle={
                                                <span>
                                                    Khuyến mãi: <del>{element.moneyOld}tr</del> - {element.moneyNew}tr
                                                </span>
                                            }
                                        />
                                    </GridListTile>
                                )
                            })
                        }
                    </GridList>
                </div>
            </div>
        )

    }
}

Actions.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Actions))
