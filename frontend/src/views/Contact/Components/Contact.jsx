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
    CardActionArea,
    CardMedia,
    Avatar,
    Dialog,
    DialogContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import Promotion from '../../Public/Promotion'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    title: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
        textAlign: 'center'
    },
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            reload: false
        }
    }

    renderContent(classes) {
        return (
            <Card>
                <Typography variant='h5' className={classes.title}>
                    Điền thông tin chúng tôi sẽ hỗ trợ bạn
                </Typography>
                <CardContent>
                    <Grid container spacing={32}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Họ tên của bạn'
                                name="name"
                                variant='outlined'
                            />
                             <TextField
                                fullWidth
                                label='SĐT của bạn'
                                name="name"
                                variant='outlined'
                            />
                            <TextField
                                fullWidth
                                label='Email của bạn'
                                name="name"
                                variant='outlined'
                            />
                            <TextField
                                fullWidth
                                label='Địa chỉ của bạn'
                                name="name"
                                variant='outlined'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={32}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant='contained' color='primary'>
                                Gửi thông tin
                            </Button>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </CardContent>


            </Card>
        )
    }

    render() {
        let { classes } = this.props
        return (
            <span>
                <Grid container spacing={32}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        {
                            this.renderContent(classes)
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='primary' variant='h5'>
                            SIÊU THỊ ĐỒ GỖ THẠCH THẤT – ĐỒ GỖ NỘI THẤT
                        </Typography>
                    
                            Địa chỉ: Tầng 2, Số 215 Giáp Nhất – Thanh Xuân – Hà Nội
                            Hotline: 0961.594.123 – ĐT: 0248.5898.630
                            Email: thachthat199@gmail.com – Website: thachthatdecor.com.vn
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
