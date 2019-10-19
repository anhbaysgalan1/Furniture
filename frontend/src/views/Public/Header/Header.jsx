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
} from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'
import { Link } from 'react-router-dom'
import Phone from '@material-ui/icons/Phone'
import logoJS from "./logoJS.png"
import JsGlobal from "./JsGlobal.png"
import long from './long.png'


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
            <span>
                <Grid container alignContent='flex-end' direction='row' spacing={0}>
                    <Grid item xs={2}>
                        <img src={logoJS} 
                            alt="Smiley face"
                            height="70"
                            width="100%">
                        </img>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={JsGlobal}
                            alt="Smiley face"
                            height="70"
                            width="100%">
                        </img>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container alignContent='flex-end' direction='row' spacing={32}>
                            <Grid item xs={2}>
                                <Phone color="primary" fontSize='large' />
                            </Grid>
                            <Grid item xs={10}>
                            <Typography component='h6' variant='h6'>
                                Hotline: <br></br>
                                0945 577 008
                            </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{marginTop: '20px'}}>
                    
                        <Button>
                            <img src="https://appian.com/assets/sites/4/2018/01/blog-low-code-v2.jpg"
                                alt="Smiley face"
                                height="35"
                                width="75">
                            </img>
                        </Button>
                        <Button>
                            <img src="https://cdn.webshopapp.com/shops/94414/files/54968390/vietnam-flag-icon-free-download.jpg"
                                alt="Smiley face"
                                height="35"
                                width="75">
                            </img>
                        </Button>
                        <Button>
                            <img src="https://www.tedxrockcreekpark.com/image/thedarkglobe.files.wordpress.com/2012/03/japanese_flag.jpg"
                                alt="Smiley face"
                                height="35"
                                width="75">
                            </img>
                        </Button>
                    </Grid>
                </Grid>
            </span>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))