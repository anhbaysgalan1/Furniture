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
import Tabs from '../Tabs/Tabs'
import What from '../Public/What'
import Header from '../Public/Header/Header'
import GoodsHot from './Components/GoodsHot'
import OwlCarousel from 'react-owl-carousel2'
import 'react-owl-carousel2/lib/styles.css'
import Promotion from '../Public/Promotion'
import IntroduceGoods from './Components/IntroduceGoods'
import moment from 'moment'
import _ from 'lodash'
// import "bootstrap/less/bootstrap.less"

const styles = theme => ({
})

// all, modern, classic, fourChair, sixChairs, eightChairs, circle
let titleTabs = [
    {
        label: "Tất cả",
        tabBad: 'all'
    },
    {
        label: "Bàn ăn hiện đại",
        tabBad: 'modern'
    },
    {
        label: "Bàn ăn cổ điển",
        tabBad: 'classic'
    },
    {
        label: "Bàn ăn hiện đại 4 ghế",
        tabBad: 'fourChair'
    },
    {
        label: "Bàn ăn hiện đại 6 ghế",
        tabBad: 'sixChairs'
    },
    {
        label: "Bàn ăn hiện đại 8 ghế",
        tabBad: 'eightChairs'
    },
    {
        label: "Bàn ăn hiện đại tròn",
        tabBad: 'circle'
    },
]

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            activePage: 15
        }
    }

    render() {
        let { classes, onSubmit, goods = [] } = this.props
        return (
            <div>
                {/* <Header classes={classes} />
                <IntroduceGoods classes={classes} />
                <br></br>
                <GoodsHot classes={classes} />
                <br></br>
                <Promotion classes={classes} />  
                <br></br> */}
                <Tabs titleTabs={titleTabs} classes={classes} onSubmit={onSubmit} goods={goods} />
                <br></br>
                {/* <What classes={classes} /> */}
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))