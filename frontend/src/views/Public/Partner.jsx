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
import a1 from './Image/a1.jpg'
import a2 from './Image/a2.jpg'
import a3 from './Image/a3.jpg'
import a4 from './Image/a4.jpg'
import a5 from './Image/a5.jpg'
import a6 from './Image/a6.jpg'
import a7 from './Image/a7.jpg'
import a8 from './Image/a8.jpg'
import a9 from './Image/a9.jpg'
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
                img: a1
            },
            {
                img: a2
            },
            {
                img: a3
            },
            {
                img: a4
            },
            {
                img: a5
            },
            {
                img: a6
            },
            {
                img: a7
            },
            {
                img: a8
            },
            {
                img: a9
            },
            {
                img: a1
            },
            {
                img: a2
            },
            {
                img: a3
            },
            {
                img: a4
            },
            {
                img: a5
            },
            {
                img: a6
            },
            {
                img: a7
            },
            {
                img: a8
            },
            {
                img: a9
            }
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
                <Typography variant='h4' style={{textAlign: 'center'}} color='primary'>
                   Khách hàng đối tác
                </Typography>
                <OwlCarousel ref="car" options={options} events={events}>
                    {
                        tileData.map((element, index) => {
                            return (
                                <div key={index} style={{backgroundColor: 'white'}} className={classes.imgZoom}>
                                    <CardContent>
                                        <img src={element.img} alt="Nội thất Dodo"/>
                                    </CardContent>
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
