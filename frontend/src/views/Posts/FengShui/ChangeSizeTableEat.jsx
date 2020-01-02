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
import Header from '../../Public/Header/Header'
import What from '../../Public/What'
import Home from '../../Public/Home'
import Promotion from '../../Public/Promotion'
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
                            <CardContent style={{textAlign: 'justify'}}>
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
                                    Chọn kích thước bàn ăn theo phong thủy mang tài lộc vào nhà
                                </Typography>
                                <hr></hr>
                                <ul> 
                                    <Typography style={{ fontStyle: 'italic', textIndent: '30px' }} >
                                        Bàn ghế ăn cho gia đình hiện nay được thiết kế với kiểu dáng và kích thước đa dạng. 
                                        Lựa chọn kích thước bàn ăn theo phong thủy giúp mang tới nhiều điều thuận lợi 
                                        dành cho gia chủ. Hãy tham khảo ngay những thông tin dưới đây để có thể dễ dàng 
                                        chọn mẫu bàn ghế ăn phù hợp nhất cho ngôi nhà.
                                    </Typography>
                                    <Typography variant='h6'>
                                        Vì sao nên chọn kích thước bàn ăn theo phong thủy?
                                    </Typography>
                                    <li>
                                        <Typography>
                                            Ngoài việc lựa chọn kích thước bàn ghế phòng ăn phù hợp với diện tích của ngôi nhà, 
                                            phù hợp với nhu cầu sử dụng của gia đình thì bạn nên lựa chọn phù hợp với 
                                            phong thủy. Bởi những lý do sau đây:
                                        </Typography>
                                    </li>
                                        <Typography variant='h6'>
                                            Lựa chọn hướng tối để đặt bàn ăn
                                        </Typography>
                                    <li>
                                        <Typography>
                                            Bàn ghế ăn gia đình không được đặt ở vị trí hung. Có nghĩa là phải lựa chọn phương hướng hợp với ngũ hành của ngôi nhà. Để lựa chọn được phương hướng tốt đặt bàn ăn cần dựa vào quẻ mệnh và quẻ trạch.
                                        </Typography>
                                    </li>
                                    <ul>
                                    <Typography>
                                        Quẻ mệnh có Đông tứ mệnh và Tây tứ mệnh.
                                        <li>
                                            Nếu gia chủ thuộc mạng Thổ, Kim thì thuộc Tây tứ mệnh.
                                        </li>
                                        <li>
                                            Nếu gia chủ thuộc mệnh Thủy, Hỏa, Mộc thì thuộc Đông tứ mệnh.
                                        </li>
                                        <li>
                                            Quẻ trạch được phân theo hướng vị Đông tứ trạch và Tây tứ trạch.
                                        </li>
                                        <li>
                                            Nhà ở hướng Tây, Tây Bắc, Tây Nam, Đông Nam thì thuộc Tây tứ trạch.
                                        </li>
                                        <li>
                                            Nhà ở hướng Nam, Đông Nam, Đông hoặc Bắc thù thuộc Đông tứ trạch.
                                        </li>
                                    </Typography>
                                    </ul>
                                    <Typography>
                                        Gia chủ mệnh Đông tứ mệnh thì nên kê bàn ghế ăn ở Đông tứ trách. Còn người Tây tứ mệnh thì nên kê bàn ghế ở hướng thuộc Tây tứ trạch. Lựa chọn vị trí đặt bàn ăn theo phong thủy như vậy sẽ là tốt nhất.
                                    </Typography>
                                    <Typography variant='h6' >
                                        Không đặt bàn ăn đối diện với bàn thờ
                                    </Typography>
                                    <li>
                                        <Typography >
                                            Với những gia đình có thờ tượng Phật hoặc tượng Quan Âm thì không nên đặt bàn ăn đối diện với bàn thờ. Bởi bữa ăn mặn của gia đình đẽ mộ phạm tới thần thánh vì họ là người tu hành, ăn chay. Nên cố gắng giữ khoảng cách với bàn thờ nhằm đảm bảo sự tôn nghiêm, tĩnh lặng cho nơi thờ cúng. Đồng thời tạo cảm giác thoải mái tự do cho người ăn.
                                        </Typography>
                                    </li>
                                    <Typography variant='h6' >
                                        Không đặt bàn ăn thẳng với cửa lớn
                                    </Typography>
                                    <li>
                                        <Typography >
                                            Theo quan niệm phong thủy: hỉ hồi toàn, kỵ trực xung” tác là thích vòng quanh, kỵ thẳng. Nếu bàn ăn phạm phải nguyên tắc phong thủy này sẽ khiến cho khí tốt trong nhà dễ dàng thoát ra ngoài.
                                        </Typography>
                                    </li>
                                <li>
                                    <Typography>
                                            Nếu bàn ăn đặt thẳng với cửa lớn, người ngoài có thể nhìn thấy thành viên trong gia đình đang dùng bữa sẽ rất mất mỹ quan. Nên lựa chọn vị trí khác để đặt bàn ăn hoặc sử dụng bình phong để ngăn lại.
                                        </Typography>
                                </li>
                                    <Typography variant='h6' >
                                        Bàn ăn không đặt đối diện với nhà vệ sinh
                                    </Typography>
                                    <li>
                                    <Typography>
                                            Nhà vệ sinh là nơi sinh ra các khí độc, vì vậy nếu kê bàn ghế ăn đối diện với nhà vệ sinh sẽ mang tới tinh thần không tốt khi ăn. Điều này gây ảnh hưởng không nhỏ tới sức khỏe của mọi người. Nếu bạn không thể rời đi thì có thể đặt giữa bàn 1 chậu nước nhỏ hoặc chậy trúc khai vận để hóa giải.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Trên đây là một số thông tin hữu ích dành cho bạn trong quá trình lựa chọn vị trí đặt bàn ăn theo phong thủy. Hãy tới ngay Nội thất Hoàng Gia Dodo để lựa chọn những mẫu bàn ghế ăn đẹp, giá thành hợp lý. Đồng thời được các nhân viên tư vấn về vị trí đặt bàn ăn phù hợp trong gia đình.
                                        </Typography>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <br></br> <br></br>
                <What classes={classes} />
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))