import React from 'react'
import PropTypes, { element } from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import FacebookIcon from '@material-ui/icons/Facebook'
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

let arrImg = [
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s",
        title: 'Mẫu bàn ăn đẹp',
        summary: 'Bàn ăn hiện đại thời trang giá rẻ bất ngờ',
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s",
        title: 'Mẫu bàn ăn đẹp',
        summary: 'Bàn ăn hiện đại thời trang giá rẻ bất ngờ',
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s",
        title: 'Mẫu bàn ăn đẹp',
        summary: 'Bàn ăn hiện đại thời trang giá rẻ bất ngờ',
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s",
        title: 'Mẫu bàn ăn đẹp',
        summary: 'Bàn ăn hiện đại thời trang giá rẻ bất ngờ',
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s",
        title: 'Mẫu bàn ăn đẹp',
        summary: 'Bàn ăn hiện đại thời trang giá rẻ bất ngờ',
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s",
        title: 'Mẫu bàn ăn đẹp',
        summary: 'Bàn ăn hiện đại thời trang giá rẻ bất ngờ',
    }
]
let arrImgNew = [
    {
        img: 'https://noithatdogoviet.com/upload/sanpham/thumbs/%C2%A0giuong-ngu-thong-minh-su-chon-lua-tuyet-voi-cho-khong-gian-nho.jpg',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://noithatdogoviet.com/upload/sanpham/5-cau-hoi-thuong-gap-ve-ban-ghe-go.jpg',
        title: '5 CÂU HỎI THƯỜNG GẶP VỀ BÀN GHẾ GỖ',
        summary: "Bàn ghế gỗ phòng khách luôn là một trong những lựa chọn hàng đầu trong không gian nội thất được mọi người bỏ nhiều công sức để tìm hiểu và lựa chọn?"
    },
    {
        img: 'https://noithatdogoviet.com/upload/sanpham/thumbs/xu-huong-thiet-ke-noi-that-2020.jpg',
        title: 'XU HƯỚNG THIẾT KẾ NỘI THẤT 2020',
        summary: "Thị hiếu và nhu cầu của người tiêu dùng về thiết kế nội thất ngày càng khó tính. Họ muốn đi theo thu huống mới nhất hiện nay nhưng vẫn phải có nét riêng của họ. Đến với bài viết này, mời các bạn cùng với Amazing House tìm hiểu xu hướng thiết kế nội thất 2020 là gì? ..."
    },
    {
        img: 'https://noithatdogoviet.com/upload/sanpham/thumbs/06-bo-ban-an-lam-tu-go-soi-dep-cho-phong-an-gia-dinh.jpg',
        title: '06 BỘ BÀN ĂN LÀM TỪ GỖ SỒI ĐẸP CHO PHÒNG ĂN GIA ĐÌNH',
        summary: "Chất liệu gỗ sồi từ lâu đã được sử dụng rất rộng rãi trong những đồ nội thất gia đình tại Việt Nam. Đặc biệt là các bộ bàn ăn đẹp cho phòng bếp luôn được khách hàng quan tâm lựa chọn bởi màu sắc đẹp, độ bền tốt, giá thành hợp lý hợp với thị hiếu của người tiêu dùng..."
    },


]
//  GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI CHO KHÔNG GIAN NHỎ

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderRelateTo(classes) {
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={1}> </Grid>
                    <Grid item xs={10}>
                        <Card>
                            <CardContent style={{ textAlign: 'justify' }} >
                                <Typography variant='h5' style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                                    TIN LIÊN QUAN
                                </Typography>
                                <Grid container spacing={8}>
                                    {
                                        arrImg.map((element, index) => {
                                            return (
                                                <Grid item xs={4} key={index} >
                                                    <div>
                                                        <img
                                                            src={element.img}
                                                            height='200'
                                                            width='100%'
                                                        />
                                                        <Typography variant='h6'>
                                                            {element.title}
                                                        </Typography>
                                                        <Typography>
                                                            {element.summary}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1}> </Grid>
                </Grid>
            </div>
        )
    }

    renderNewsHot(classes) {
        
        return (
            <Card>
                <CardContent style={{ textAlign: 'justify' }} >
                    <Typography variant='h5' style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                        TIN NỔI BẬT
                    </Typography>
                    <Grid container spacing={8}>
                        {
                            arrImgNew.map((element, index) => {
                                let link = '/giuong-ngu-thong-minh'
                                switch(index){
                                    case 1:
                                        link = '/5-cau-hoi-thuong-gap'
                                        break
                                    case 2: 
                                        link = '/xu-huong-noi-that-2020'
                                        break
                                    case 3: 
                                        link = '/ban-an-hot'
                                        break
                                }
                                return (
                                    <Grid item xs={6} key={index} >
                                        <div style={{ padding: '5px' }} onClick={() => this.goto(link)} >
                                            <Grid container spacing={0}>
                                                <Grid item xs={3}>
                                                    <img
                                                        style={{ padding: '5px' }}
                                                        src={element.img}
                                                        height='110'
                                                        width='100%'
                                                    />
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <b>
                                                        <Typography>
                                                            {element.title}
                                                        </Typography>
                                                    </b>
                                                    <Typography>
                                                        {element.summary}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <hr></hr>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    render() {
        let { classes } = this.props
        let dateNew = moment(moment().clone().add(-13, 'd')).format('DD/MM/YYYY 08: 45')
        return (
            <div>
                <Grid container spacing={32} >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        {
                            this.renderNewsHot(classes)
                        }
                        <br></br>
                        {
                            this.renderRelateTo(classes)
                        }
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <br></br>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))