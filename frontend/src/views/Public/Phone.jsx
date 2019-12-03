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

    render() {
        let { classes } = this.props
        return (
            <span>
                <Typography variant='h5' className={classes.title}>
                    Hỗ trợ trực tiếp 24/7
                </Typography>
                <Card>
                    <CardContent>
                        <Typography color='primary' component='h5'>
                            <Icon fontSize='large' color='primary'>contact_phone</Icon><br></br>
                            Mạnh Nhẫn: 09856268956
                        </Typography>
                        <hr></hr>
                        <Typography color='primary' component='h5'>
                            {/* <FacebookIcon fontSize='large' color='primary'></FacebookIcon><br></br> */}
                            Facebook: Nội thất Hoàng Gia Dodo
                        </Typography>
                        <hr></hr>
                        <Typography color='primary' component='h5'>
                            <Icon fontSize='large' color='primary'>email</Icon><br></br>
                            Gmail: noithat.dodo@gmail.com
                        </Typography>
                        <hr></hr>
                        <Typography color='inherit' component='h5' style={{ fontStyle: 'italic', textAlign: 'center' }} >
                            Nếu có câu hỏi hãy liên hệ với chúng tôi 
                        </Typography>
                    </CardContent>
                </Card>
            </span>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))