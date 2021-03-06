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
    Hidden,
    Grid,
    CardContent,
    CardActions,
    Typography,
    AppBar,
    Toolbar,

} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    },
    marginConten: {
        parding: '5px 5px 5px 5px'
    }
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { classes, img } = this.props
        return (
            <span>
               <Hidden smUp>
                    <div
                        style={{ height: '100%', width: '100%', backgroundSize: "100% 100%", backgroundImage: img }}
                    >
                        <div style={{ color: '#2196f3', marginTop: '10px', padding: '3px' }} className={classes.fromCompany}>
                            <Grid container spacing={32}>
                                <Grid item xs={12} md={5}>
                                    <Typography color='primary' variant='hP'>
                                        CÔNG TY CỔ PHẦN ĐỒ GỖ NỘI THẤT DODO
                                        </Typography>
                                    <Typography color='primary' variant='h5'>
                                        Liên hệ
                                    </Typography>
                                    <hr></hr>
                                    <Typography color='primary'>
                                        Địa chỉ: 108 Trần Phú, Hà Đông, Hà Nội <br></br>
                                        Phone: 0377 535 717<br></br>
                                        Email: noithat.dodo@gmail.com<br></br>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
               </Hidden>
               <Hidden xsDown>
                <div
                        style={{ height: '100%', width: '100%', backgroundSize: "100% 100%", backgroundImage: img }}
                    >
                        <div style={{ color: '#2196f3' }} className={classes.fromCompany}>
                            <Grid container spacing={32}>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography color='primary' variant='h6' component='h6'>
                                        CÔNG TY CỔ PHẦN NỘI THẤT HOÀNG GIA DODO
                                        </Typography>
                                    <Typography color='primary' variant='h4' component='h4'>
                                        Liên hệ
                                        </Typography>
                                    <hr></hr>
                                    <Typography color='primary' component='h4'>
                                        Địa chỉ: 108 Trần Phú, Hà Đông, Hà Nội <br></br>
                                        Phone: 0377 535 717<br></br>
                                        Email: noithat.dodo@gmail.com<br></br>
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <br></br><br></br>
               </Hidden>
            </span>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))