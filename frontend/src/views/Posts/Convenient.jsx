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
    AppBar,
    Toolbar,

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import What from '../Public/What'
import Home from '../Public/Home'
import Promotion from '../Public/Promotion'
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

    render() {
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
        return (
            <div>
                <Header classes={classes} />
                <br></br>
                <Home classes={classes} img={img} />
                <br></br>
                <Grid container spacing={32} >
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
                                    Mua hàng tiện lợi nhất
                                </Typography>
                                <Typography style={{ fontStyle: 'italic', textIndent: '30px' }} >
                                    Một trong những lý do khách hàng nên lựa chọn mua sản phẩm tại 
                                    Nội thất Dodo đó là quá trình mua sản phẩm dễ dàng 
                                    tiện lợi. Điều này giúp bạn tiết kiệm được thời gian một tối đa, 
                                    đây là yếu tố vô cùng quan tọng trong cuộc sống hiện đại ngày nay. 
                                    Đồng thời khách hàng có thể sở hữu sản phẩm của chúng tôi khi sinh 
                                    sống ở bất cứ đâu.  
                                </Typography>
                                <hr></hr>
                                <ul> 
                                    <Typography variant='h6'>
                                        Đa dạng phương thức mua sắm
                                    </Typography>      
                                    <li>
                                        <Typography>
                                            Khi mua sắm đồ nội thất tại Nội thất Dodo khách hàng 
                                            có thể dễ dàng lựa chọn nhiều phương thức mua sắm khác nhau như:
                                        </Typography> 
                                    </li>   
                                    <li>
                                        <Typography>
                                            Đặt mua hàng online trên website của chúng tôi:
                                        </Typography> 
                                    </li> 
                                    <li>
                                        <Typography>
                                            Trên website của chúng tôi thường xuyên cập nhật những mẫu sản 
                                            phẩm mới cùng với những thông tin chi tiết như: chất liệu, kích 
                                            thước, phong cách thiết kế… Chính vì vậy khách hàng có thể 
                                            dễ dàng lựa chọn được món đồ nội thất mà mình yêu thích.
                                        </Typography> 
                                    </li> 
                                    <li>
                                        <Typography>
                                            Bên cạnh đó, giá thành sản phẩm cũng được niêm yếu rõ ràng. 
                                            Vì thế bạn có thể lựa chọn được những sản phẩm phù hợp với 
                                            khả năng tài chính của mình.
                                        </Typography> 
                                    </li> 
                                    <li>
                                        <Typography>
                                            Hình thức đặt mua hàng online trên website vô cùng đơn giản. 
                                            Chỉ cần 1 click chuột là bạn đã đặt được sản phẩm và lựa 
                                            chọn hình thức thanh toán mà mình muốn. Với phương thức mua 
                                            sắm online khách hàng có thể sở hữu sản phẩm của chúng tôi 
                                            khi ở bất cứ tỉnh thành nào.
                                        </Typography> 
                                    </li>  
                                    <li>
                                        <Typography>
                                            Một lợi thế lớn khi mua trực tuyến qua web của của chúng tôi. 
                                            Vì các cửa hàng trực tuyến không có ngày nghỉ, đóng cửa hay bất kỳ 
                                            vấn đề khác. Bạn còn có thể chủ động về thời điểm mua sắm. Bất cứ 
                                            khi nào, bất cứ nơi đâu, dù 1 giờ trưa hay 12 giờ khuya, bạn vẫn có 
                                            thể lướt web và đặt hàng, không phải phụ thuộc vào giờ mở cửa của các 
                                            trung tâm mua sắm.
                                        </Typography> 
                                    </li>                        
                                    <Typography variant='h6'>
                                        Tiết kiệm thời gian
                                    </Typography>  
                                    <li>
                                        <Typography>
                                            Với những ai bận rộn không có nhiều thời gian để mua sắm, thì đây được 
                                            coi là ưu điểm lớn nhất của dịch vụ của chúng tôi. Đơn giản, bạn có thể 
                                            ngồi nhà và chọn nội thất mình yêu thích bằng cách click chuột. 
                                            Bạn chỉ  mất từ 10 đến 25 phút để tìm được nội thất mình cần và sau đó 
                                            nhân viên cửa chúng tôi sẽ nhanh chóng giao hàng cho bạn tận nơi.
                                        </Typography>  
                                    </li>  
                                </ul>
                               
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <br></br>
                <What classes={classes} />
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))