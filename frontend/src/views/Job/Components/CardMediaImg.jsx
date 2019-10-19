import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import DetailJob from './DetailJob'
import {
    IconButton,
    Icon,
    Tooltip,
    Grid,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    CardActions,
    CardContent,
    CardActionArea,
    CardMedia,
    AppBar,
    Toolbar,

} from '@material-ui/core'
import BaseView from 'views/BaseView'

import { I18n } from 'react-redux-i18n'
import _ from 'lodash'

const styles = theme => ({
    height: {
        maxWidth: 250,
    },
    Dialog: {

    }
})

let arrData = [
    {
        _id: '0',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '1',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: ' Tuyển  kĩ sư Xây dựng đi Hàn Quốc',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '3',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Lao đ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '4',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '5',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '6',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '7',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '9',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '10',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '11',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '12',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    },
    {
        _id: '8',
        img: 'http://nhatvietjsc.vn/wp-content/uploads/2018/07/don-hang-xay-dung-tong-hop-tai-Nhat-Ban.jpg',
        title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
        content: 'Công việc thử nghiệm, đánh giá linh kiện xe ô tô, đánh giá sản phẩm',
        salary: ' Lương cơ bản: 185.000 yên~ 220.000 yên',
        request: 'Tốt nghiệp đại học chuyên nghành cơ khí, Tiếng Nhật N4 trở lên. Có tiếng Anh là một lợi thế.',
        summary: 'Tuyển kỹ sư cơ khí làm việc tại tokyo yêu cầu tốt nghiệp ĐH bằng cơ khí lương khởi điểm trên 40tr, phỏng vấn trong tháng 10',
    }
]

let arrHotJob = [
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
    {
        img: 'http://vieclamhanquoc.vn/images/2016/02/22/tu-vung-tieng-nhat-co-khi-1.jpg',
        describe: 'Kỹ sư công nghệ thông tin lập trình Web tại Tokyo, Japan',
    },
]

class ButtonViews extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            index: null,
            open: false,
            reload: false
        }
        this.onCancel = this.onCancel.bind(this)
    }

    onCancel() {
        this.setState({
            open: false,
            index: null
        })
    }

    setIndex(index) {
        this.setState({
            open: true,
            index: index
        })
    }

    renderDetail(classes, index, arrData = []) {
        let data = arrData[index]
        let img = _.get(data, 'img', '')
        let title = _.get(data, 'title', '')
        let content = _.get(data, 'content', '')
        let salary = _.get(data, 'salary', '') // đãi ngộ
        let request = _.get(data, 'request', '') // yêu cầu
        let summary = _.get(data, 'summary', '') // khái quát công việc
        return (
            <Card className={classes.Dialog}>
                <Dialog
                    fullWidth={true}
                    onClose={this.onCancel}
                    open={this.state.open}
                    maxWidth='lg'
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle>
                        <Typography variant="h6">
                            {title}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={32}>
                            <Grid item lg={6}>
                                {summary}
                                <img
                                    height="500" width="500"
                                    className="d-block w-100"
                                    src={img}
                                    alt={title}
                                />
                                <br></br>
                            </Grid>
                            <Grid item lg={6}>
                                <Typography variant="h4" color='primary'>
                                    Chế độ đãi ngộ
                                </Typography>
                                <Typography variant="h6" >
                                    {salary}
                                </Typography>

                                <Typography variant="h4" color='primary'>
                                    Nội dung công việc
                                </Typography>
                                <Typography variant="h6" >
                                    {content}
                                </Typography>

                                <Typography variant="h4" color='primary'>
                                    Yêu cầu tuyển dụng
                                </Typography>
                                <Typography variant="h6" >
                                    {request}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' onClick={() => this.onCancel()}>
                            Thoát
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        )
    }

    renderListJob(classes, arrData = []) {
        return (
            <Grid container spacing={8}>
                {
                    arrData.map((item, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <CardActionArea className={classes.height}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="120"
                                        width='80'
                                        image={item.img}
                                        title="title"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h6">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.summary}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    renderHotJob(classes, arrHotJob) {
        return (
            <Card> 
                <CardContent>
                    <AppBar position="static">
                        <Toolbar variant="dense" >
                            <Typography variant="h5" color='inherit' component='h5'>
                                Ngành được chọn nhiều nhất
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {
                        arrHotJob.map((item, index) => (
                            <Grid container spacing={8} key={index}>
                                <Grid item xs={3}>
                                    <img
                                        src={item.img}
                                        alt="JS Global"
                                        height='50'
                                        width='80'
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    {item.describe}
                                </Grid>
                            </Grid>
                        ))
                    }
                </CardContent>
            </Card>
        )
    }

    renderContact (classes) {
        return (
            <Card>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar variant="dense" >
                            <Typography variant="h5" color='inherit' component='h5'>
                                Liên hệ tư vấn
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Typography>
                        Mr Nhẫn <br></br>
                        0987 563 356
                        <hr></hr>
                        Mr Hải Anh <br></br>
                        0987 113 113
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const { classes } = this.props
        const opts = {
            height: '300',
            width: '500',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        return (
            <div>
                {
                    this.renderDetail(classes, this.state.index, arrData)
                }
                <Grid container spacing={8}>
                    <Grid item xs={8}>
                        {
                            this.renderListJob(classes, arrData)
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            this.renderHotJob(classes, arrHotJob)
                        }
                        <br></br>
                        {
                            this.renderContact(classes)
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <iframe
                            id="player"
                            type="text/html"
                            width="640"
                            height="390"
                            src="http://www.youtube.com/embed/M7lc1UVf-VE?enabljsapi=1&origin=http://example.com"
                            frameborder="0"
                        >
                        </iframe>
                    </Grid>
                </Grid>
            </div>
        )
        return
    }
}


ButtonViews.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(ButtonViews))
