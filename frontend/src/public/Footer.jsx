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
    Hidden,

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
                <Hidden smUp>
                    <Typography variant='h6'>
                        Để lại thông tin chúng tôi sẽ liên hệ với bạn
                    </Typography>
                    <Form>
                        <Grid container spacing={8}>
                            <Grid item xs={4}>
                                <TextField
                                    margin='none'
                                    fullWidth
                                    label='Tên'
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    margin='none'
                                    fullWidth
                                    label='SĐT'
                                    name="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin='none'
                                    fullWidth
                                    label='Email'
                                    name="mail"
                                />
                                <TextField
                                    margin='none'
                                    fullWidth
                                    label='Địa chỉ'
                                    name="address"
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    rowsMax={6}
                                    margin="dense"
                                    label="Nội dung cần hỗ trợ, tư vấn"
                                    name="content"
                                />
                            </Grid>
                        </Grid>
                        <CardActions>
                            <Button variant='contained' color='primary'>
                                Gửi
                            </Button>
                        </CardActions>
                    </Form>
                </Hidden>
                <Hidden xsDown>
                    <Typography variant='h6' component="h6" >
                        Để lại thông tin chúng tôi sẽ liên hệ với bạn
                    </Typography>
                    <Form>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Tên'
                                    margin='none'
                                    name="name"
                                />
                                <TextField
                                    fullWidth
                                    label='SĐT'
                                    margin='none'
                                    name="phone"
                                />
                                <TextField
                                    fullWidth
                                    margin='none'
                                    label='Gmail'
                                    name="mail"
                                />
                                <TextField
                                    fullWidth
                                    label='Địa chỉ'
                                    margin='none'
                                    name="address"
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    margin='none'
                                    rowsMax={6}
                                    label="Nội dung cần hỗ trợ, tư vấn"
                                    name="content"
                                />
                            </Grid>
                        </Grid>
                        <CardActions>
                            <Button variant='contained' color='primary'>
                                Gửi
                            </Button>
                        </CardActions>
                    </Form>
                </Hidden>
            </span>
        )
    }

    renderInfoCompany() {
        return (
            <span>
                <Hidden smUp>
                    <Typography variant='h6'>
                        Thông tin công ty
                    </Typography>
                    <hr></hr>
                    <Typography>
                        <i className="fa fa-home" style={{ fontSize: '20px', color: "#90caf9" }}></i>
                        &nbsp; ĐỒ GỖ NỘI THẤT DODO
                    </Typography>
                    <Typography component="h6" >
                        <i className="fa fa-home" style={{ fontSize: '20px', color: "#90caf9" }}></i>
                        &nbsp; Hồ Gươm Plaza 108 Trần Phú Hà Đông Hà Nội
                    </Typography>
                    <Typography component="h6" >
                        <i className="fa fa-envelope" style={{ fontSize: '17px', color: "#90caf9" }}></i>
                        &nbsp; noithat.dodo@gmail.com
                    </Typography>
                    <Typography component="h6" >
                        <i className="fa fa-phone" style={{ fontSize: '20px', color: "#90caf9" }}></i>
                        &nbsp;&nbsp; 0377 535 717
                    </Typography>
                </Hidden>
                <Hidden xsDown>
                    <Typography variant='h5' component="h5">
                        Thông tin công ty
                    </Typography>
                    <hr></hr>
                    <Typography component="h6" >
                        <i className="fa fa-home" style={{ fontSize: '30px', color: "#90caf9" }}></i>
                        &nbsp; ĐỒ GỖ NỘI THẤT DODO
                    </Typography>
                    <Typography component="h6" >
                        <i className="fa fa-home" style={{ fontSize: '30px', color: "#90caf9" }}></i>
                        &nbsp; Hồ Gươm Plaza 108 Trần Phú Hà Đông Hà Nội
                    </Typography>
                    <Typography component="h6" >
                        <i className="fa fa-envelope" style={{ fontSize: '25px', color: "#90caf9" }}></i>
                        &nbsp; noithat.dodo@gmail.com
                    </Typography>
                    <Typography component="h6" >
                        <i className="fa fa-phone" style={{ fontSize: '25px', color: "#90caf9" }}></i>
                        &nbsp; 0377 535 717
                    </Typography>
                </Hidden>
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
                        // backgroundImage: "url('https://png.pngtree.com/58pic/32/49/67/20U58PICI9dWcd7X7yX8e_PIC2018.jpg')"
                    }}
                >
                    <CardContent>
                        <Grid container spacing={32}>
                            <Grid item xs={12} md={4}>
                                {
                                    this.renderInfoCompany()
                                }
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {this.renderForm()}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={8}>
                                    <Typography variant='h6' component="h6" >
                                        Đồ gỗ nội thất Hoàng gia Dodo
                                    </Typography>
                                    <Map latitudeIn={20.979531} longitudeIn={105.785417} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </div>
                <Hidden smUp>
                    <Typography style={{ color: 'white', backgroundColor: '#9e9e9e', padding: '3px' }}>
                        Đồ gỗ nội thất Dodo - noithat.dodo@gmail.com
                    </Typography>
                </Hidden>
                <Hidden xsDown>
                    <Typography style={{ color: 'white', backgroundColor: '#9e9e9e', padding: '5px' }} variant='h6'>
                        Đồ gỗ nội thất Dodo - noithat.dodo@gmail.com
                    </Typography>
                </Hidden>
            </div>
        )
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Footer))