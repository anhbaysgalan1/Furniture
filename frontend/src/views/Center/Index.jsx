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
import What from '../Public/What'
import NewHot from './Components/NewHot'
import Footer from './Components/Footer'
import Bad from './Components/Bad'
import TableEat from './Components/TableEat'
import TableRestaurant from './Components/TableRestaurant'
import DiningRoom from './Components/DiningRoom'
import Promotion from '../Public/Promotion'
import ListGoods from './Components/ListGoods'
import List from './Components/List'
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
        return (
            <div>
                {/* <Header classes={classes} /> */}
                <Home classes={classes} />
                {/* <ButtonViews classes={classes} /> */}
                <br></br>
                <What classes={classes} />
                {/* <Circle classes={classes} />
                <br></br>
                <NewHot classes={classes} />
                <br></br>
                <Promotion classes={classes} /> */}
                <br></br>
                {/* <ListGoods classes={classes}/> */}
                <br></br>
                {/* <Grid container spacing={8}>
                    <Grid item lg={1}></Grid>
                    <Grid item lg={10}>
                        <Bad classes={classes}/>
                        <br></br>
                        <TableEat classes={classes} />
                        <br></br>
                        <DiningRoom classes={classes} />
                        <br></br>
                        <TableRestaurant classes={classes} />
                    </Grid>
                    <Grid item lg={1}></Grid>
                </Grid>
                <br></br>
                <List classes={classes} />
                <Footer classes={classes} /> */}
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))