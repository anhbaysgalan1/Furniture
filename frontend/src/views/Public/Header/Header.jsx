import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    CardMedia,
    CardHeader,
    Typography,
    Avatar,
    Hidden,
} from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'
import { Link } from 'react-router-dom'
import Phone from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email';
import DD from './DD.png'
import LogoDD from './logoDD.png'


const styles = theme => ({
    button: {
        marginRight: '5px'
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        // margin: 10,
        width: 60,
        height: 60,
    },
})

class Index extends BaseView {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        return (
            <div style={{ backgroundColor: 'white' }}>
               <Hidden smUp>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={2} md={1}>
                            <img src={DD}
                                alt="Smiley face"
                                height="25"
                                width="25">
                            </img>
                        </Grid>
                        <Grid item xs={10} md={5}>
                            <img src={LogoDD}
                                alt="Smiley face"
                                height="100%"
                                width="100%">
                            </img>
                        </Grid>
                    </Grid>
               </Hidden>
               <Hidden smDown>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={2} md={1}>
                            <img src={DD}
                                alt="Smiley face"
                                height="80%"
                                width="70%">
                            </img>
                        </Grid>
                        <Grid item xs={10} md={5}>
                            <img src={LogoDD}
                                alt="Smiley face"
                                height="100%"
                                width="100%">
                            </img>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <IconButton color="primary"> 
                                <Icon style={{fontSize: '40px'}} color='primary' >email</Icon>
                                noithat.dodo@gmail.com
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <IconButton color="primary">
                                <Icon style={{fontSize: '40px'}} color='primary' >phone</Icon>
                                0377 535 717
                            </IconButton>
                        </Grid>
                    </Grid>
               </Hidden>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))