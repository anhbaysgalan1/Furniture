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
import What from '../Public/What'
import Header from '../Public/Header/Header'
import Home from '../Public/Home'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    title: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
    },
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
        return (
            <div>
               <p>Giường</p>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))