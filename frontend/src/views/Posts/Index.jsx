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
import PaniTion from './PaniTion'
import What from '../Public/What'
import Home from '../Public/Home'
import Promotion from '../Public/Promotion'
import Partner from '../Public/Partner'
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
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOqzMdcBstpcI5Icl5qgI6zd6yXRiIpt5zJ_JbVqqvW8ShPnpKw&s',
        title: ' GIƯỜNG NGỦ THÔNG MINH SỰ CHỌN LỰA TUYỆT VỜI',
        summary: "Giường ngủ thông minh được nhiều Vì vậy việc minh cho không gian phòng ngủ sẽ giúp bạn tiếp kiệm được diện tích và chi phí, bài viết dưới đây của Nội Thất Đồ Gỗ Việt sẽ giúp bạn tổng hợp thông tin về giường thông minh, để bạn có nhiều thông tin hơn về mẫu sản phẩm này."
    },

]

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
                                return (
                                    <Grid item xs={6} key={index} >
                                        <div style={{ padding: '5px' }}>
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
                        <PaniTion classes={classes} />
                        {
                            // this.renderRelateTo(classes)
                        }
                        <br></br>
                        <Partner classes={classes} />
                        {
                            // this.renderNewsHot(classes)
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