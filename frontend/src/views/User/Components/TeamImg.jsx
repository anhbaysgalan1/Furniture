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
    {
        name: 'Tập thể dục buổi sáng nào',
        title: 'Bạn nhân viên mới nhận chức ... ',
        content: 'Cùng nhau vận động và phát triển',
        img: 'https://ejc.com.vn/wp-content/uploads/2018/12/tuyen-dung-nhan-vien.jpg',
    },
    {
        name: 'Tập thể dục buổi sáng nào',
        title: 'Gia đình JS Global',
        content: 'Cùng nhau vận động để bắt đầu 1 ngày mới đầy niềm vui và thú vị nào anh em',
        img: 'https://cungunglaodongbinhphuoc.com.vn/wp-content/uploads/2018/08/tuyen-nhan-vien-van-phong.jpg',
    }
]

const styles = theme => ({
    button: {
        marginRight: '5px'
    },
    iconFooter: {
        marginTop: '20px'
    },
    Dialog: {
        height: '100%'
    },
    imgHover: {
        hover:{
            opacity: 0.2,
        }
    }
})

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            index: null,
            reload: false,
        }
        this.onCancel = this.onCancel.bind(this)
        this.setIndexImg = this.setIndexImg.bind(this)
    }

    onCancel() {
        this.setState({
            open: false,
            index: null
        })
    }

    setIndexImg(index) {
        this.setState({ index: index, open: true })
        this.setState({ reload: !this.state.reload })
    }

    renderDetail(classes, arrTeamImg = []) {
        let data = arrTeamImg[this.state.index]
        let img = _.get(data, 'img', '')
        let title = _.get(data, 'title', '')
        let name = _.get(data, 'name', '')
        let content = _.get(data, 'content', '')
        return (
            <Card className={classes.Dialog}>
                <Dialog
                    fullWidth={true}
                    onClose={this.onCancel}
                    open={this.state.open}
                    maxWidth='lg'
                    style={{ height: '100%' }}
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
                                <img
                                    height="100%" width="500"
                                    className="d-block w-100"
                                    src={img}
                                    alt={title}
                                />
                                <br></br>
                                <i>{name}</i>
                            </Grid>
                            <Grid item lg={6}>
                                {content}
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

    render() {
        const { classes } = this.props
        return (
            <center>
                {
                    this.renderDetail(classes, arrTeamImg)
                }
                <Grid container spacing={4}>
                    {
                        arrTeamImg.map((item, index) => {
                            return (
                                <Grid item xs={3} key={index}>
                                        <img
                                            onClick={() => this.setIndexImg(index)}
                                            height="300" width="100%"
                                            src={item.img}
                                            alt="Japan"
                                        />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </center>

        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))