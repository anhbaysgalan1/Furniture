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
import home from '../../../public/images/home.png'
import _ from 'lodash'

const styles = theme => ({
})

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { classes } = this.props
        let img = "https://i2.wp.com/dogoquoccuong.com/wp-content/uploads/2014/08/DSC09545.jpg?fit=3008%2C2000&ssl=1"
        let img1 = "http://sieuthimythuatpro.vn/wp-content/uploads/2018/10/MG_2546.jpg"
        return (
            <div>
                <img 
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1920,h_560/https://thachthatdecor.com.vn/wp-content/uploads/2019/03/slider-1920x560.png" 
                    src={home}
                    height="560" 
                    width="1920" 
                    title="slider" 
                    alt="" 
                    className="slider-133 slide-757" 
                    // style="width: 1528px; visibility: hidden; display: inline;">
                />
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))