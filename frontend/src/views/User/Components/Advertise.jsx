import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact"
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import { Grid } from '@material-ui/core'
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
    }

    render() {
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <MDBContainer>
                            <MDBCarousel
                                interval={3000} // thời gian hiện ảnh ms
                                className="z-depth-1"
                                onHoverStop={false} // true dừng hiệu ứng khi con chuật ở trên ảnh
                                activeItem={1} // vị trí mặc định hiện ảnh bắt đầu từ 1, Nếu không có sẽ hiện all ảnh , 
                                length={1} // Số ảnh sẽ hiện, nếu không có sẽ bị ẩn ảnh
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
                                                src='https://globalcenter.edu.vn/wp-content/uploads/2018/01/c%C3%A1ch-b%E1%BB%91-tr%C3%AD-b%C3%A0n-l%C3%A0m-vi%E1%BB%87c-v%C4%83n-ph%C3%B2ng.jpg'
                                                alt="First slide"
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

export default withStyles(styles)(withRouter(Index))