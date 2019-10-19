import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact"
import { Item, ItemButon } from '@material-ui/core'
import { MDBCarouselCaption, MDBMask } from "mdbreact"
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact"
import { Component } from "react";
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
                                                // src="http://newsky.edu.vn/wp-content/uploads/PH%C3%9A-S%E1%BB%B8.jpg"
                                                src='https://shinhan.com.vn/public/uploads/slider/Slider-house-2019_1.jpg'
                                                alt="First slide"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="2">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                // src="https://vieclamdailoan.vn/images/uploads/2016/05/17/0-5-tieu-chi-lua-chon-cong-ty-uy-tin.jpg"
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
                                                // src="https://donhangnhatban.com/wp-content/uploads/2019/08/xuat-khau-lao-dong-nhat-ban.png"
                                                alt="Third slide"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                </MDBCarouselInner>
                            </MDBCarousel>
                        </MDBContainer>
                    </Grid>
                </Grid>
    
                {/* https://mdbootstrap.com/docs/react/advanced/carousel/ */}
                {/* <Grid container spacing={32}>
                    <Grid item xs={6}>
                        <MDBContainer className="mt-4" >
                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBCarousel
                                        // interval={1500} // thời gian hiện ảnh ms
                                        className="z-depth-1"
                                        onHoverStop='false' // true note ( boolean : string ) dừng hiệu ứng khi con chuật ở trên ảnh
                                        activeItem={1} // vị trí mặc định hiện ảnh bắt đầu từ 1, Nếu không có sẽ hiện all ảnh , 
                                        length={2} // Số ảnh sẽ hiện, nếu không có sẽ bị ẩn ảnh
                                        multiItem={false} // true hiện all tẩt cả ảnh
                                        showControls={false} //true  Hiện Previous, Next để chuyển ảnh
                                        showIndicators={false} // true hiện số ảnh 1,2,3 ... bên dưới
                                        slide={false} // true hiệu ứng trôi, false hiệu ứng mờ dần
                                    >
                                        <MDBCarouselInner>
                                            <MDBCarouselItem itemId="1">
                                                <video className="video-fluid d-block" autoPlay loop>
                                                    <source src="https://mdbootstrap.com/img/video/Tropical.mp4" type="video/mp4" />
                                                </video>
                                            </MDBCarouselItem>
                                            <MDBCarouselItem itemId="2">
                                                <video className="video-fluid d-block" autoPlay loop>
                                                    <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                                                </video>
                                            </MDBCarouselItem>
                                            <MDBCarouselItem itemId="3">
                                                <video className="video-fluid d-block" autoPlay loop>
                                                    <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4" />
                                                </video>
                                            </MDBCarouselItem>
    
                                        </MDBCarouselInner>
                                    </MDBCarousel>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </Grid>
                </Grid> */}
    
               
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))

// const CarouselPage = () => {
//     return (
//         <div>
//             <Grid container spacing={32}>
//                 <Grid item xs={12}>
//                     <MDBContainer>
//                         <MDBCarousel
//                             interval={10000} // thời gian hiện ảnh ms
//                             className="z-depth-1"
//                             onHoverStop={false} // true dừng hiệu ứng khi con chuật ở trên ảnh
//                             activeItem={3} // vị trí mặc định hiện ảnh bắt đầu từ 1, Nếu không có sẽ hiện all ảnh , 
//                             length={3} // Số ảnh sẽ hiện, nếu không có sẽ bị ẩn ảnh
//                             multiItem={false} // true hiện all tẩt cả ảnh
//                             showControls={false} //true  Hiện Previous, Next để chuyển ảnh
//                             showIndicators={false} // true hiện số ảnh 1,2,3 ... bên dưới
//                             slide={false} // true hiệu ứng trôi, false hiệu ứng mờ dần
//                             style={{height: '400px', width: '100%'}}
//                         >
//                             <MDBCarouselInner>
//                                 <MDBCarouselItem itemId="1">
//                                     <MDBView>
//                                         <img
//                                             onClick={(value) => this.testImg(value)}
//                                             className="d-block w-100"
//                                             // src="http://newsky.edu.vn/wp-content/uploads/PH%C3%9A-S%E1%BB%B8.jpg"
//                                             src='https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-nen-thien-nhien-cho-may-tinh-cuc-dep_091927826.jpg'
//                                             alt="First slide"
//                                         />
//                                     </MDBView>
//                                 </MDBCarouselItem>
//                                 <MDBCarouselItem itemId="2">
//                                     <MDBView>
//                                         <img
//                                             className="d-block w-100"
//                                             src="https://vieclamdailoan.vn/images/uploads/2016/05/17/0-5-tieu-chi-lua-chon-cong-ty-uy-tin.jpg"
//                                             alt="Second slide"
//                                         />
//                                     </MDBView>
//                                 </MDBCarouselItem>
//                                 <MDBCarouselItem itemId="3">
//                                     <MDBView>
//                                         <img
//                                             className="d-block w-100"
//                                             src="https://donhangnhatban.com/wp-content/uploads/2019/08/xuat-khau-lao-dong-nhat-ban.png"
//                                             alt="Third slide"
//                                         />
//                                     </MDBView>
//                                 </MDBCarouselItem>
//                             </MDBCarouselInner>
//                         </MDBCarousel>
//                     </MDBContainer>
//                 </Grid>
//             </Grid>

//             {/* https://mdbootstrap.com/docs/react/advanced/carousel/ */}
//             {/* <Grid container spacing={32}>
//                 <Grid item xs={6}>
//                     <MDBContainer className="mt-4" >
//                         <MDBRow>
//                             <MDBCol md="6">
//                                 <MDBCarousel
//                                     // interval={1500} // thời gian hiện ảnh ms
//                                     className="z-depth-1"
//                                     onHoverStop='false' // true note ( boolean : string ) dừng hiệu ứng khi con chuật ở trên ảnh
//                                     activeItem={1} // vị trí mặc định hiện ảnh bắt đầu từ 1, Nếu không có sẽ hiện all ảnh , 
//                                     length={2} // Số ảnh sẽ hiện, nếu không có sẽ bị ẩn ảnh
//                                     multiItem={false} // true hiện all tẩt cả ảnh
//                                     showControls={false} //true  Hiện Previous, Next để chuyển ảnh
//                                     showIndicators={false} // true hiện số ảnh 1,2,3 ... bên dưới
//                                     slide={false} // true hiệu ứng trôi, false hiệu ứng mờ dần
//                                 >
//                                     <MDBCarouselInner>
//                                         <MDBCarouselItem itemId="1">
//                                             <video className="video-fluid d-block" autoPlay loop>
//                                                 <source src="https://mdbootstrap.com/img/video/Tropical.mp4" type="video/mp4" />
//                                             </video>
//                                         </MDBCarouselItem>
//                                         <MDBCarouselItem itemId="2">
//                                             <video className="video-fluid d-block" autoPlay loop>
//                                                 <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
//                                             </video>
//                                         </MDBCarouselItem>
//                                         <MDBCarouselItem itemId="3">
//                                             <video className="video-fluid d-block" autoPlay loop>
//                                                 <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4" />
//                                             </video>
//                                         </MDBCarouselItem>

//                                     </MDBCarouselInner>
//                                 </MDBCarousel>
//                             </MDBCol>
//                         </MDBRow>
//                     </MDBContainer>
//                 </Grid>
//             </Grid> */}

           
//         </div>
//     )
// }

// export default CarouselPage
