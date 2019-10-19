import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../../../views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'
import { Link } from 'react-router-dom'
import MailIcon from '@material-ui/icons/MailOutline'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import HomeIcon from '@material-ui/icons/Home'
import PhoneIcon from '@material-ui/icons/LocalPhone'
import Map from './Map'
import {
    Typography,
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
    CardMedia
} from '@material-ui/core'

let arrTeamImg = [
    {
        name: 'văn phòng công ty',
        content: 'Ngày vui cùng anh chị em và cùng sắp tớ cố gắng làm việc chăm chỉ hơn và có nhiều thành công hơn trong công việc',
        title: 'Văn phòng làm việc',
        img: 'http://giaoducnghe.edu.vn/wp-content/uploads/2018/05/nhan-vien-van-phong_giaoducnghe.jpg',
    },
    {
        name: 'Anh chị em cùng quyết tâm',
        title: 'Cùng nhau quyết tâm',
        content: 'Cùng nhau quyết tâm cùng nhau xây dựng 1 cty bền vững và phát triển. Chúng ta chung 1 nhà',
        img: 'https://dongphucsaoviet.vn/hoanghung/0/images/ext(1).jpg',
    },
    {
        name: 'Đi du lịch nhật bản',
        title: 'Đi vui vẻ nha mọi người',
        content: 'Cùng nhau đi du lịch Nhật bản ghé thăm sứ sở phù tang đẹp thơ mộng, quyến rũ. Đi là không muốn về',
        img: 'http://duhocbm.com/wp-content/uploads/2017/12/du-hoc-nhat-ban-nam-2018.jpg',
    },
    {
        name: 'thi anh em thích tự sướng',
        title: 'Ngày vui vùng anh em',
        content: 'Sau ngày dài làm việc chúng ta chỉ cần như vậy là đủ cùng nhau cố gắng nha gia đình JS Global',
        img: 'http://thanglongosc.edu.vn/wp-content/uploads/2018/11/cao-dang-o-nhat-ban-may-nam.jpg',
    },
    {
        name: 'Du lịch thiên nhien',
        title: 'Khi anh em đi du lịch',
        content: 'Cuộc đờ là những chuyến đi đi càng xa để chở về',
        img: 'https://www.vntrip.vn/cam-nang/wp-content/uploads/2017/09/viewimage.jpg',
    },
    {
        name: 'Tập thể dục buổi sáng nào',
        title: 'Gia đình JS Global',
        content: 'Cùng nhau vận động để bắt đầu 1 ngày mới đầy niềm vui và thú vị nào anh em',
        img: 'http://hicon.vn/cms2/wp-content/uploads/2018/11/1_suc20khoe.jpg',
    },
]

const styles = theme => ({
    button: {
        marginRight: '5px'
    },
})

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <header>
                    <div id="intro-section" className="view">
                        <video 
                            className="video-intro" 
                            poster="https://mdbootstrap.com/img/Photos/Others/background.jpg" 
                            playsInline 
                            autoPlay 
                            muted 
                            loop
                        >
                            <source src="https://mdbootstrap.com/img/video/animation.mp4" type="video/mp4"/>
                        </video>
                    </div>
                </header>
                {/* <main>
                    <section id="articles" className="text-center py-5">
                        <div className="container">
                            <h2 className="h1-responsive font-weight-bold mb-5">Articles</h2>
                            <div className="row">
                                <div className="col-lg-4 col-md-12 mb-4">
                                    <div className="card card-cascade narrower">
                                        <div className="view view-cascade">
                                            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg" alt="Card image cap"/>
                                            <a>
                                                <div className="mask img-gradient"></div>
                                            </a>
                                        </div>
                                        <div className="card-body card-body-cascade">
                                            <h5 className="pink-text pb-2 pt-1"><i className="fa fa-cutlery"></i> Culinary</h5>
                                            <h4 className="font-weight-bold card-title">Cheat day inspirations</h4>
                                            <p className="card-text">Ut enim ad minima veniam, quis nostrum exercitationem ullam
                                                corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.</p>
                                            <a className="btn btn-unique">Button</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main> */}
            </div>

        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))