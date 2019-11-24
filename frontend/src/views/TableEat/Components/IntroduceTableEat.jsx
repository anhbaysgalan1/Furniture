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
    CardActionArea,
    CardMedia,
    Avatar,
    Dialog,
    DialogContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import bad from '../../../public/bad.jpg'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    card: {
        maxWidth: 300,
    },
    title: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
    },
    // imgZoom: {
    //     transition: "transform .5s, filter 3s ease-in-out",
    //     filter: "grayscale(100%)",
    // },
    // imgZoom: {
    //     "&:hover": {
    //         filter: "grayscale(0)",
    //         transform: "scale(1.1)",
    //         transitionDuration: "1s",
    //         transitionTimingFunction: "linear",
    //     }
    // },
})

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            reload: false
        }
    }


    render() {
        let { classes } = this.props
        return (
            <div style={{ backgroundColor: 'white' }}>
                <CardContent>
                    <Grid container spacing={16} >
                        <Grid item xs={7}>
                            <ul>
                                <li>
                                    <Typography>
                                        Giường ngủ gỗ tự nhiên:
                                    </Typography>
                                    <Typography>
                                        Thương hiệu  Đồ gỗ nội thất Hoàng gia Dodo làm 100%
                                        từ các loại gỗ tự nhiên cao cấp. Với vân gỗ đẹp, màu sắc tự nhiên,
                                        hương thơm nhẹ nhàng đặc trưng của từng loại gỗ được giữ nguyên một
                                        cách tốt nhất. Là lựa chọn hàng đầu hiện nay được khách hàng tin tưởng
                                        và lựa chọn trong không gian phòng ngủ gia đình.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        Phong cách thiết kế:
                                    </Typography>
                                    <Typography>
                                        Đặc trưng với những họa tiết được đục, chạm, khắc kỳ công và khéo léo,
                                        các hình ảnh, chi tiết trên sản phẩm được trau chuốt một cách tỉ mỉ để
                                        nâng tầm đẳng cấp và phong cách riêng.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        Kiểu dáng:
                                    </Typography>
                                    <ul>
                                        <li>
                                            <Typography>
                                                Kiểu Trung Hoa cổ điển đặc trưng với phong cách hoàng tộc, vuông vắn,
                                                chạm long phụng  xa hoa, kiểu cách.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography>
                                                Kiểu châu Âu: chạm khắc tinh xảo, tinh tế trên những đường nét,
                                                những đường cong, tròn, sang trọng, ấn tượng.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography>
                                                Kiểu thuyền buồm :độc đáo với những đường nét uốn lượn trên sản phẩm,
                                                hoa văn bắt mắt, đuôi cong đầu đối xứng.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography>
                                                Kiểu chân cao: sang trọng, rộng rãi, chân cao, vai rộng, thoáng đãng, gọn gàng.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography>
                                                Kiểu chân bệt: chân thấp, vuông vắn, hoa văn hình khối, đơn giản, tiện lợi.
                                            </Typography>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Typography>
                                        Màu sắc sản phẩm:
                                    </Typography>
                                    <Typography>
                                        Đặc trưng của các loại gỗ tự nhiên như màu vàng xoan đào,
                                        màu đỏ vàng gỗ gõ đỏ, gỗ hương đỏ, vàng pơ mơ, nâu socola cẩm lai,…
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        Kích thước của giường ngủ gỗ tự nhiên:
                                    </Typography>
                                    <Typography>
                                        Kích thước cơ bản từ 120 x 200cm, 140x200cm, 160x200cm cho đến
                                        180 x 200, 200x 200cm phù hợp với hầu hết diện tích không gian
                                        phòng ngủ hiện nay của khách hàng. Ngoài ra nếu bạn muốn đặt
                                        thêm các kích thước khác theo yêu cầu của mình hãy liên hệ qua
                                        Hotline 0377 535 717 để được tư vấn và báo giá tốt nhất.
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item xs={5}>
                            <img
                                style={{ marginTop: '-15px' }}
                                height='500'
                                width='650'
                                // src='http://noithatgiadinhbinhduong.com/wp-content/uploads/2017/09/gi%C6%B0%E1%BB%9Dng-g%C3%B5-%C4%91%E1%BB%8F.jpg'
                                src={bad}
                                alt='Dodo'
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))