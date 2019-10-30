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
    }
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
                <Typography variant="h4" color='primary'>
                    Phương trâm làm việc của chúng tôi
                </Typography>
                <Grid container spacing={32}>
                    <Grid item xs={4}>
                        <Button className={classes.cssBorder} 
                            // onClick={() => this.goto(`/contact`)} 
                        >
                            Khách hàng là số 1 
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.cssBorder} 
                            // onClick={() => this.goto(`/question`)} 
                        >
                            Phục vụ chuyên nghiệp
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.cssBorder} 
                            // onClick={() => this.goto(`/registration`)} 
                        >
                            Uy tín hàng đầu
                        </Button>
                    </Grid>
                </Grid>
            </center>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))