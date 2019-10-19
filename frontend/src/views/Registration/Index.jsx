import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact"
import { Form, TextField, Validation } from 'components/Forms'
import {
    IconButton,
    Icon,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    Typography,
    AppBar,
    Tooltip,
    Toolbar
} from '@material-ui/core'
import Circle from '../Public/Circle'
import PaperFade from "components/Main/PaperFade"
import Home from '../Public/Home'
import moment from 'moment'
import Header from '../Public/Header/Header'
import _ from 'lodash'


const styles = theme => ({
    paper: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    }
})

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderAdvertise() {
        return (
            <MDBContainer>
                <MDBCarousel
                    interval={5000} // thời gian hiện ảnh ms
                    className="z-depth-1"
                    onHoverStop={false} // true dừng hiệu ứng khi con chuật ở trên ảnh
                    activeItem={3} // vị trí mặc định hiện ảnh bắt đầu từ 1, Nếu không có sẽ hiện all ảnh , 
                    length={3} // Số ảnh sẽ hiện, nếu không có sẽ bị ẩn ảnh
                    multiItem={false} // true hiện all tẩt cả ảnh
                    showControls={false} //true  Hiện Previous, Next để chuyển ảnh
                    showIndicators={false} // true hiện số ảnh 1,2,3 ... bên dưới
                    slide={true} // true hiệu ứng trôi, false hiệu ứng mờ dần
                    style={{ height: '400px', width: '800px' }}
                >
                    <MDBCarouselInner>
                        <MDBCarouselItem itemId="1">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src='https://donhangnhatban.com/wp-content/uploads/2019/08/xuat-khau-lao-dong-nhat-ban.png'
                                    alt="First slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="2">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src="https://japan.net.vn/images/uploads/2015/12/08/thuc-tap-sinh-nhatban.jpg"
                                    alt="Second slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="3">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src="https://photo-3-baomoi.zadn.vn/w1000_r1/2018_09_28_327_27922481/49e2491d765c9f02c64d.jpg"
                                    alt="Third slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
            </MDBContainer>
        )
    }

    renderForm(){
        return (
            <Card> 
                 <CardContent>
                    <Form>
                        <AppBar position="static">
                                <Toolbar variant="dense" >
                                    <Typography variant="h5" color='inherit' component='h5'>
                                        Điền thông tin chúng tôi sẽ gửi thông tin tới cho bạn
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        <Grid container spacing={8}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={() => { }}
                                    fullWidth
                                    variant='outlined'
                                    label={I18n.t("Input.Họ và tên")}
                                    name="name"
                                />
                                <TextField
                                    onChange={() => { }}
                                    fullWidth
                                    label={I18n.t("Input.Số điện thoại di động")}
                                    name="phone"
                                    variant='outlined'
                                />
                                <TextField
                                    onChange={() => { }}
                                    fullWidth
                                    label={I18n.t("Input.Email")}
                                    name="mail"
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Button style={{fontSize: '25px'}} fullWidth type="submit" variant="contained" color="primary">
                                    {I18n.t("Button.Đăng kí")}
                                </Button>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </Form>
                 </CardContent>
            </Card>
        )
    }

    render() {
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_card.jpg')"
        return (
            <div>
                <Card> 
                    <CardContent> 
                        <Header classes={classes} />
                    </CardContent>
                    <br></br>
                </Card>
                <Home img={img} classes={classes} />
                <Grid container spacing={16}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                            {
                                this.renderAdvertise()
                            }
                            {
                                this.renderForm(classes)
                            }
                    </Grid>
                    <Grid item xs={3}></Grid>
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