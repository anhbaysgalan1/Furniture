import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Create from './Create'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    AppBar,
    Toolbar,

} from '@material-ui/core'
import Advertise from './Components/Advertise'
import moment from 'moment'
import Actions from './Components/Actions'
import AfterMigrate from './Components/AfterMigrate'
import NewHot from '../Public/NewHot'
import InputCV from '../Public/InputCV'
import Home from '../Public/Home'
import _ from 'lodash'

let news = [
    {
        img: 'https://shinhan.com.vn/public/themes/shinhan/img/life-privileges.jpg',
        title: 'Đồng hành cùng JS Global chắp cánh ước mơ xuất ngoại',
        date: new Date(),
        content: 'Cùng nhau sách vali lên và bay tới nơi có những cơ hội mới những sự lựa chọn đúng đắn sẽ giúp bạn thành công'
    },
    {
        img: 'https://shinhan.com.vn/public/themes/shinhan/img/day-to-day-banking.jpg',
        title: 'Cùng gặp gỡ khách hàng với những cơ hội hợp tác đột phá',
        date: new Date(),
        content: 'Đối tác tiềm năng sẽ cùng bạn chia sẻ cơ hội và cùng phát triển. Luân đồng hành bên bạn dù bạn ở đâu'
    },
    {
        img: 'https://img.lovepik.com/photo/50071/4773.jpg_wh860.jpg',
        title: '1 giám đốc có năng lực sẽ giúp cty bạn thành công hơn mong đợi',
        date: new Date(),
        content: 'Giám đốc mới cùng ngày đầu tiên làm việc tại công ty với những hi vọng sẽ có sự đổi mới và dẫn dắt đoàn tàu.'
    },
    {
        img: 'https://file.tinnhac.com/resize/600x-/2019/06/30/20190630131610-d3df.jpg',
        title: 'Kế toán mới của cty đẹp hoàn hảo',
        date: new Date(),
        content: 'Nhân sự mới nhận chức đánh dấu sự đổi mắt và 1 cơ hội mới hãy nắm bắt và cố gắng nhất định sẽ thành công'
    },
]
const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    }
})

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderNew(news = []) {
        let { classes } = this.props
        return (
            <Card>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar variant="dense" >
                            <Typography variant="h5" color='inherit' component='h5'>
                                Tin tức nổi bật
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    {
                        news.map((item, index) => {
                            return (
                                <span key={index}>
                                    <Grid container spacing={32}>
                                        <Grid item xs={4}>
                                            <Button>
                                                <img
                                                    src={item.img}
                                                    alt="JS Global"
                                                    height='150'
                                                    width='300'
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography component='h6' variant='h6'>
                                                {item.title}
                                            </Typography>
                                            <i>{item.content}</i><br></br>
                                            <i>{moment(item.date).format('DD/MM/YYYY')}</i>
                                        </Grid>
                                    </Grid>
                                </span>
                            )
                        })
                    }
                </CardContent>
            </Card>
        )
    }

    renderHomeJS(classes) {
        return (
            <span>
                <AppBar position="static">
                    <Toolbar variant="dense" >
                        <Typography variant="h5" color='inherit' component='h5'>
                            Tin tức Gia đình JS Global
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Actions />
            </span>
        )
    }

    renderOut(classes) {
        return (
            <span>
                <CardContent>
                    <AppBar position="static">
                        <Toolbar variant="dense" >
                            <Typography variant="h5" color='inherit' component='h5'>
                            Thành công sau khi xuất ngoại
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <img
                        src="https://techtalk.vn/wp-content/uploads/2016/05/techtalk-dichvu-laptrinh-696x464.jpg"
                        alt="JS Global"
                        height="100%" width="100%"
                    />
                    <Typography color='inherit' component='h5'>
                        Điều mình ấn tượng nhất sau khi trúng tuyển đó là công ty
                        đặc biệt quan tâm đến nhân viên. Tiếng Nhật của mình
                        tuy ở mức N3 nhưng giao tiếp còn chưa tốt lắm. Công ty đã đầu tư
                        chi phí cho mình học tiếng Nhật trong khoảng thời gian 2 tháng
                        trước khi mình sang Nhật và trợ cấp chi phí sinh hoạt trong
                        thời gian đó. Ngoài ra, công ty còn về thăm nhà,trò chuyện với
                        gia đình-bố mẹ mình để mọi người có thể yên tâm khi mình sang Nhật làm việc.
                        Hiện nay,mình đang sinh sống và làm việc tại Osaka,Nhật Bản và mình
                        đang làm việc cho công ty ở vị trí kỹ sư thiết kế cơ
                        khí,máy móc.
                    </Typography>
                </CardContent>
            </span>
        )
    }

    renderLastOut(classes) {
        return (
            <span>
                <NewHot classes={classes} />
                <br></br><br></br>
                <AppBar position="static">
                    <Toolbar variant="dense" >
                        <Typography variant="h5" color='inherit' component='h5'>
                            Ứng viên sau khi xuất ngoại
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AfterMigrate />
            </span>
        )
    }

    render() {
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_remittance.jpg')"
        return (
            <div>
                <Home classes={classes} img={img} />
                <Grid container spacing={32}>
                    <Grid item xs={8}>
                        {
                            this.renderNew(news)
                        }
                        <br></br><br></br>
                        {
                            this.renderHomeJS(classes)
                        }
                        <br></br><br></br>
                        {
                            this.renderOut(classes)
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            this.renderLastOut(classes)
                        }
                        <br></br><br></br>
                        <InputCV classes={classes} />
                        <br></br><br></br>
                        <Advertise />
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