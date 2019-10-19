import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'
import { Link } from 'react-router-dom'
import MailIcon from '@material-ui/icons/MailOutline'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import HomeIcon from '@material-ui/icons/Home'
import PhoneIcon from '@material-ui/icons/LocalPhone'
import Map from './Map'
import MapHCM from './MapHCM'
import {
    IconButton,
    Icon,
    Grid,
    Tooltip,
    Button,
    Card,
    Typography,
    CardActions,
    CardContent,
} from '@material-ui/core'


const styles = theme => ({
    button: {
        marginRight: '5px'
    },
    iconFooter: {
        marginTop: '20px'
    }
})

class Footer extends BaseView {
    constructor(props) {
        super(props)
    }

    renderForm() {
        return (
            <span>
                <Form>
                    <Grid container spacing={32}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Tên'
                                name="name"
                            />
                            <TextField
                                fullWidth
                                label='SĐT'
                                name="phone"
                            />
                            <TextField
                                fullWidth
                                label='Gmail'
                                name="mail"
                            />
                        </Grid>
                    </Grid>
                </Form>

            </span>
        )
    }

    renderInfoCompany() {
        return (
            <span>
                <i>
                    <Typography variant='h5' component="h5">
                        Thông tin công ty
                    </Typography>
                </i>
                <hr></hr>
                <Typography component="h6" >
                    <i className="fa fa-home" style={{ fontSize: '40px', color: "#90caf9" }}></i>
                    &nbsp; CÔNG TY CỔ PHẦN JS GLOBAL.VN
                </Typography>
                <Typography component="h6" >
                    <i className="fa fa-home" style={{ fontSize: '40px', color: "#90caf9" }}></i>
                    &nbsp; Hồ Gươm Plaza 108 Trần Phú Hà Đông Hà Nội
                </Typography>
                <Typography component="h6" >
                    <i className="fa fa-envelope" style={{ fontSize: '35px', color: "#90caf9" }}></i>
                    &nbsp; tuyendung.vn.@jsglobal.com.vn
                </Typography>
                <Typography component="h6" >
                    <i className="fa fa-phone" style={{ fontSize: '40px', color: "#90caf9" }}></i>
                    &nbsp; 0987654321
                </Typography>
                <br></br>
                <Typography variant='h6' component="h6" >
                    Kết nối với chúng tôi
                </Typography>
                <Button>
                    <Icon>facebook</Icon>
                </Button>
                <Button>
                    <MailIcon color="error" fontSize='large' />
                </Button>
            </span>
        )
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <div
                    style={{
                        backgroundImage: 'url(https://img.thuthuatphanmem.vn/uploads/2018/10/01/anh-nen-dep-mau-hong_040306417.jpg)'
                    }}
                >
                    <CardContent>
                        <Grid container spacing={32}>
                            <Grid item lg={12}>
                                <marquee>
                                    <Typography variant='h6' component='h6'>
                                        JS Global luôn đồng hàng cùng bạn chắp cánh ước mơ, giúp bạn trở thành lao động xuất ngoại chuyên nghiệp, liên tục tuển dụng 24/7
                                    </Typography>
                                </marquee>
                                <hr></hr>
                            </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                            <Grid item xs={4}>
                                {
                                    this.renderInfoCompany()
                                }
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='h6' component="h6" >
                                    Để lại thông tin chúng tôi sẽ liên hệ với bạn
                                </Typography>
                                {this.renderForm()}

                            </Grid>
                            <Grid item xs={5}>
                                <Grid container spacing={8}>
                                    <Grid item xs={6}>
                                        <Typography variant='h6' component="h6" >
                                            JS Global Hà Nội
                                        </Typography>
                                        <Map latitudeIn={20.979531} longitudeIn={105.785417} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='h6' component="h6" >
                                            JS Global Hồ Chí Minh
                                        </Typography>
                                        <MapHCM />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                            <Grid item lg={12}>
                                <marquee>
                                    <Typography variant='h6' component="h6" >
                                        Cảm ơn bạn đã quan tâm tới dịch vụ của chúng tôi nếu cần giúp đỡn hãy để lại thông tin tôi sẽ liên lạc với bạn.
                                    </Typography>
                                </marquee>
                            </Grid>
                        </Grid>
                    </CardContent>
                </div>
                <Typography style={{ color: 'white', backgroundColor: '#9e9e9e' }} variant='h6'>
                    <span style={{ marginLeft: '10px', height: '50px' }}>
                        Công ty cổ phần JS Global tuyendung.vn@js.global.com.vn
                    </span>
                </Typography>
            </div>
        )
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Footer))