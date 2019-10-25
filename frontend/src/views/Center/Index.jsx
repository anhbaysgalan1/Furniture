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

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import Home from './Components/Home'
import Circle from './Components/Circle'
import ButtonViews from './Components/ButtonViews'
import What from './Components/What'
import NewHot from './Components/NewHot'
import Footer from './Components/Footer'
import Bad from './Components/Bad'
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
        let img = "url('http://noithatdangcap.vn/app/webroot/uploads/files/1-phong-khach-noi-that-co-dien-chau-au-dinh-thu-tai-Nam-Dinh.jpg')"
        return (
            <div>
                <Header classes={classes} />
                {/* <Home classes={classes} />
                <ButtonViews classes={classes} />
                <br></br>
                <Circle classes={classes} />
                <What classes={classes} img={img} />
                <br></br>
                <NewHot classes={classes} /> */}
                <br></br>
                <Grid container spacing={32}>
                    <Grid item lg={1}></Grid>
                    <Grid item lg={10}>
                        <Bad classes={classes}/>
                    </Grid>
                    <Grid item lg={1}></Grid>
                </Grid>
                <br></br>
                {/* <Footer classes={classes} /> */}
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))