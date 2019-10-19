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
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    },
    marginConten: {
        parding: '5px 5px 5px 5px'
    },
    cssBorder: {
        margin: '50px',
        fontSize: '20px',
        width: '200px',
        height: '200px',
        border: 'solid 10px #039be5',
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
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Typography align='center' color='primary' variant="h4" component='h4'>
                            Bạn cần thông tin chi tiết hơn
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                        <Grid container spacing={32}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                                <Button className={classes.cssBorder} onClick={() => this.goto(`/contact`)} >
                                    Liên Hệ với chúng tôi
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={32}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                                <Button className={classes.cssBorder} onClick={() => this.goto(`/question`)} >
                                    Các câu hỏi thường gặp
                                </Button>
                            </Grid>
                            <Grid item xs={3}></Grid>
                           
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={32}>
                            <Grid item xs={3}>
                                <Button className={classes.cssBorder} onClick={() => this.goto(`/registration`)} >
                                    Đăng ký nhận tin tức
                                </Button>
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
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