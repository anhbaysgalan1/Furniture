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
    Chip,
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
                    Gửi thông tin chúng tôi sẽ hỗ trợ bạn
                </Typography>
                <CardContent>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Họ tên của bạn'
                                name="name"
                                margin='dense'
                                variant='outlined'
                            />
                             <TextField
                                fullWidth
                                label='SĐT của bạn'
                                name="name"
                                margin='dense'
                                variant='outlined'
                            />
                            <TextField
                                fullWidth
                                label='Email của bạn'
                                name="name"
                                margin='dense'
                                variant='outlined'
                            />
                            <TextField
                                fullWidth
                                label='Địa chỉ của bạn'
                                name="name"
                                margin='dense'
                                variant='outlined'
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                rowsMax={6}
                                margin='dense'
                                label='Nội dung cần hỗ trợ'
                                name="name"
                                variant='outlined'
                            />
                        </Grid>
                    </Grid>
                    <Button variant='contained' color='primary'>
                        Gửi thông tin
                    </Button>
                </CardContent>


            </Card>
        )
    }

    renderInfo(classes){
        return(
            <div>
                <Typography variant='h4'>
                    CÔNG TY CỔ PHẦN ĐỒ GỖ NỘI THẤT DODO
                </Typography>
                <Typography variant='h6'>
                    Địa chỉ: 108 Trần Phú, Hà Đông, Hà Nội
                </Typography>
                <Typography variant='h6'>
                    Phone: 0377 535 717 
                </Typography>
                <Typography variant='h6'>
                    Email: noithat.dodo@gmail.com
                </Typography>
            </div>
        )
    }

    contactOnline(classes){
        return (
            <div>
                <Typography variant='h5' >
                    Phản Hồi Trực Tuyến
                </Typography>
                <Typography variant='h6'>
                    Quý khách vui lòng nhấp chuột vào đường dẫn bên dưới để gửi ý kiến phản hồi:
                </Typography>
                <Button color='primary' variant='contained'>
                    <i class="fa fa-facebook-f"></i> Nội thất Dodo
                </Button>
                <Button color='primary' variant='contained'>
                    <i class="fa fa-mail"></i> Mail
                </Button>
            </div>
        )
    }

    render() {
        let { classes } = this.props
        return (
            <span>
                <Grid container spacing={32}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                       {this.renderInfo(classes)}
                       <br />
                       {this.contactOnline(classes)}
                    </Grid>
                    <Grid item xs={4}>
                        {
                            this.renderContent(classes)
                        }
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
