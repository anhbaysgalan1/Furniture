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
            <Card>
                <AppBar position="static">
                    <Toolbar variant="dense" >
                        <Typography variant='h6' color='inherit' component='h5'>
                            Hỗ trợ trực tiếp 24/7
                        </Typography>
                    </Toolbar>
                </AppBar>
                <CardContent>
                    <Typography color='primary' component='h5'>
                        <Icon fontSize='large' color='primary'>contact_phone</Icon><br></br>
                        Hải Anh: 09856268956
                    </Typography>
                    <hr></hr>
                    <Typography color='primary' component='h5'>
                        <Icon fontSize='large' color='primary'>contact_phone</Icon><br></br>
                        Mạnh Nhẫn: 09856268956
                    </Typography>
                    <hr></hr>
                    <Typography color='primary' component='h5'>
                        <FacebookIcon fontSize='large' color='primary'></FacebookIcon><br></br>
                        Facebook: JS Global VN
                    </Typography>
                    <hr></hr>
                    <Typography color='primary' component='h5'>
                        <Icon fontSize='large' color='primary'>email</Icon><br></br>
                        Gmail: tuyendung@js.global.com
                    </Typography>
                    <hr></hr>
                    <Typography color='inherit' component='h5'>
                        Nếu có thắc mắc nào hãy liên hệ với chúng thôi chúng tôi.
                    </Typography>
                </CardContent>
                
            </Card>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))