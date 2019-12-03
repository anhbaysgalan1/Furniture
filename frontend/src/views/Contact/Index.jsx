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
import Contact from './Components/Contact'
import Header from '../Public/Header/Header'
import Home from '../Public/Home'
import What from '../Public/What'
import moment from 'moment'
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
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
        return (
            <div>
                <Header classes={classes} />
                <br></br>
                <Home classes={classes} img={img} />
                <br></br>
                <Contact classes={classes} />
                <br></br><br></br>
                <What classes={classes} />
                <br></br>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))