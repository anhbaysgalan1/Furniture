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
    Link,
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
})

class Index extends BaseView {
    constructor(props) {
        super(props)
    }

    render() {
        let { classes } = this.props
        return (
            <Card>
                <CardContent>
                    <Typography variant='h6' align='center' component='h6' color='primary'>
                        Nộp hồ sơ ứng tuyển
                    </Typography>
                    <hr></hr>
                    <Typography color='primary'>
                        Cách 1: Click chuật <Link>Trực tiếp</Link> vào Công việc ứng tuyển gửi CV cho chúng tôi
                    </Typography>
                    <br></br>

                    <Typography color='primary'>
                        Cách 2: Điền trực tiếp vào CV Online của chúng tôi tại đây
                    <Button variant='text' color='primary' onClick={() => this.renderCreateCV()}>
                            CV Online
                    </Button>
                    </Typography>
                    <br></br>
                    <Typography color='primary'>
                        Cách 3: Gủi CV tới email tuyendung@.jsglobal.com.vn
                    </Typography>
                    <br></br>

                    <Typography variant='h6' align='center' component='h6' color='primary'>
                        Nộp hồ sơ ứng tuyển
                    </Typography>
                    <hr></hr>
                    <Typography color='primary'>
                        Trường hợp bạn chưa tìm được công việc phù hợp để ứng tuyển, bạn có thể gủi CV sẵn tại đây
                        khi có công việc phù hợp chúng tôi sẽ liên lạc với bạn sau
                    </Typography>
                    <Button fullWidth variant='contained' color='primary'>
                        <Icon>border_color</Icon>&nbsp; Lưu CV Online
                    </Button>
                    <hr></hr>
                    <Typography color='primary'>
                        Liên hệ
                    </Typography>
                    <hr></hr>
                    <Typography variant='h6' component="h6" >
                        <i className="fa fa-envelope" style={{ fontSize: '35px', color: "#90caf9" }}></i>
                        &nbsp; tuyendung@jsglobal.vn
                    </Typography>
                    <Typography variant='h6' component="h6" >
                        <i className="fa fa-phone" style={{ fontSize: '40px', color: "#90caf9" }}></i>
                        &nbsp; 0987654321
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