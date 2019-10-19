import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../../../views/BaseView'
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
    CardContent,
    CardActions,
    Typography,
    Grid
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'


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


    render() {
        let news = [
            {
                img: 'https://shinhan.com.vn/public/themes/shinhan/img/life-privileges.jpg',
                title: 'Đồng Hành Cùng Quỹ Vì Tầm Vóc Việt Đào Tạo Các Bạn Sinh Viên Dynagen',
                date: new Date(),
                content: 'Ngày 6/10 vừa qua, Ms. Trần Thị Khanh - CEO Công ty JS Global VN đã có buổi đào tạo các bạn trẻ sinh viên Dynagen của Quỹ Vì Tầm Vóc Việt'
            },
            {
                img: 'https://shinhan.com.vn/public/themes/shinhan/img/day-to-day-banking.jpg',
                title: 'Đồng Hành Cùng Quỹ Vì Tầm Vóc Việt Đào Tạo Các Bạn Sinh Viên Dynagen',
                date: new Date(),
                content: 'Ngày 6/10 vừa qua, Ms. Trần Thị Khanh - CEO Công ty JS Global VN đã có buổi đào tạo các bạn trẻ sinh viên Dynagen của Quỹ Vì Tầm Vóc Việt'
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
        return (
            <Grid container spacing={32}>
                <Grid item xs={12}>
                    {
                        news.map((item, index) => {
                            return (
                                <Grid container spacing={8} key={index}>
                                    <Grid item xs={5}>
                                        <Button>
                                            <img
                                                src={item.img}
                                                alt="JS Global"
                                                height='150'
                                                width='300'
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <h4>
                                            {item.title}
                                            <h5>
                                                {item.content}
                                                <br></br>
                                                <i>{moment(item.date).format('DD/MM/YYYY HH: mm')}</i>
                                            </h5>
                                        </h4>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))