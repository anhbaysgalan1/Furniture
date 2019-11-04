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
               <Hidden xsDown>
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
                        <Hidden smDown>
                            <Grid item xs={6} md={3}>
                                <IconButton color="primary"> 
                                    <Icon style={{fontSize: '40px'}} color='primary' >email</Icon>
                                    noithat.dodo@gmail.com
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Hidden mdDown>
                            <Grid item xs={6} md={3}>
                                <IconButton color="primary">
                                    <Icon style={{fontSize: '40px'}} color='primary' >phone</Icon>
                                    0377 535 717
                                </IconButton>
                            </Grid>
                        </Hidden>
                    </Grid>
                    {/* <p>Dai ca Dai ca</p> */}
               </Hidden>
               {/* <Hidden xsUp> <p>xsUp</p> </Hidden> <Hidden xsDown> <p>xsDown</p> </Hidden>
               <Hidden smUp> <p>smUp</p> </Hidden> <Hidden smDown> <p>smDown</p> </Hidden>
               <Hidden mdUp> <p>mdUp</p> </Hidden> <Hidden mdDown> <p>mdDown</p> </Hidden>
               <Hidden lgUp> <p>lgUp</p> </Hidden> <Hidden lgDown> <p>lgDown</p> </Hidden>
               <Hidden xlUp> <p>xlUp</p> </Hidden> <Hidden xlDown> <p>xlDown</p> </Hidden> */}
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))