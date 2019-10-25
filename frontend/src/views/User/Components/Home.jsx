import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact"
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    Grid,
    CardContent,
    CardActions,
    Typography
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'


const styles = theme => ({
})



class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    testImg(value){
        console.log('log', value)
    }

    render() {
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <MDBContainer>
                            <MDBCarousel
                                interval={10000} // thời gian hiện ảnh ms
                                className="z-depth-1"
                                onHoverStop={false} // true dừng hiệu ứng khi con chuật ở trên ảnh
                                activeItem={3} // vị trí mặc định hiện ảnh bắt đầu từ 1, Nếu không có sẽ hiện all ảnh , 
                                length={3} // Số ảnh sẽ hiện, nếu không có sẽ bị ẩn ảnh
                                multiItem={false} // true hiện all tẩt cả ảnh
                                showControls={false} //true  Hiện Previous, Next để chuyển ảnh
                                showIndicators={false} // true hiện số ảnh 1,2,3 ... bên dưới
                                slide={false} // true hiệu ứng trôi, false hiệu ứng mờ dần
                                style={{height: '400px', width: '100%'}}
                            >
                                <MDBCarouselInner>
                                    <MDBCarouselItem itemId="1">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src='https://shinhan.com.vn/public/uploads/slider/Slider-house-2019_1.jpg'
                                                alt="First slide"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="2">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src="https://shinhan.com.vn/public/uploads/slider/Cards/20190909-Card-Vali-Slider.jpg"
                                                alt="Second slide"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="3">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src="https://shinhan.com.vn/public/uploads/slider/Slider-car-2019_1.jpg"
                                                alt="Third slide"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                </MDBCarouselInner>
                            </MDBCarousel>
                        </MDBContainer>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Index) 
// export default withStyles(styles)(withRouter(Index))