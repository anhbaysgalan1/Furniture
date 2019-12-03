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
    Hidden,

} from '@material-ui/core'
import { Fragment } from "react"
import { MDBBtn } from "mdbreact"
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    cssBorder: {
        margin: '50px',
        fontSize: '15px',
        width: '150px',
        height: '150px',
        border: 'solid 5px #039be5',
        background: '#039be5',
        borderRadius: '50%',
        [theme.breakpoints.down('xs')]: {
            margin: '10px',
            fontSize: '10px',
            width: '90px',
            height: '90px',
            border: 'solid 1px #039be5',
            background: '#039be5',
            // borderRadius: '50%',
        },
    },
    titleCircle: {
        fontSize: '25px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '15px',
        },
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
        return (
            <center>
                <Hidden mdUp>
                    <p>HHHHHHH</p>
                    <Typography color='primary' className={classes.titleCircle}>
                        Phương trâm làm việc của chúng tôi
                    </Typography>
                    <Grid container spacing={32}>
                        <Grid item xs={4}>
                            <Button className={classes.cssBorder} >
                                Khách hàng là số 1
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.cssBorder} >
                                Phục vụ chuyên nghiệp
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.cssBorder} >
                                Uy tín hàng đầu
                            </Button>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smDown>
                    <Typography variant="h4" color='primary'>
                        Phương trâm làm việc của chúng tôi
                    </Typography>
                    <Grid container spacing={32}>
                        <Grid item xs={4}>
                            <Button className={classes.cssBorder} >
                                Khách hàng là số 1
                        </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.cssBorder} >
                                Phục vụ chuyên nghiệp
                        </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.cssBorder} >
                                Uy tín hàng đầu
                        </Button>
                        </Grid>
                    </Grid>
                </Hidden>
            </center>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))