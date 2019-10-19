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
import Map from './Components/Map'
import MapHCM from './Components/MapHCM'
import Home from '../Public/Home'
import Phone from '../Public/Phone'
import Circle from '../Public/Circle'
import Header from '../Public/Header/Header'
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
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/uploads/corporate/top-feature-bn/time-deposit.jpg')"
        return (
            <div>
                <Card> 
                    <CardContent> 
                        <Header classes={classes} />
                    </CardContent>
                    <br></br>
                </Card>
                <Home img={img} />
                <Grid container spacing={8}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        <center>
                            <Typography color='primary' variant='h5' component="h6" >
                                JS Global Hà Nội
                            </Typography>
                        </center>
                        <Map />
                    </Grid>
                    <Grid item xs={5}>
                        <center> 
                            <Typography color='primary' variant='h5' component="h6" >
                                JS Global Hồ Chí Minh
                            </Typography>
                        </center>
                        <MapHCM />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <br></br><br></br>
                <Grid container spacing={32}>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <AppBar position="static">
                                <Toolbar variant="dense" >
                                    <Typography variant='h6' color='inherit' component='h5'>
                                        Nhập thông tin cá nhân của bạn chúng tôi sẽ liên hệ với bạn sau
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Họ tên'
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='SĐT'
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='email'
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Địa chỉ'
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Tôi muốn tìm hiểu về công việc'
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Tại đất nước'
                                            name="name"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={32}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            variant='outlined'
                                            rows={5}
                                            rowsMax={10}
                                            label='Nội dung muốn tìm hiểu'
                                            name="name"
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
                    </Grid>
                    <Grid item xs={3}>
                        <Phone classes={classes} />
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
                <Circle classes={classes} />
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))