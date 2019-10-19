import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import { Form, TextField, Validation, DateTimeField, MoneyField } from 'components/Forms'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import BorderIcon from '@material-ui/icons/BorderColor'
import Advertise from './Components/Advertise'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    Link,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Hidden,

} from '@material-ui/core'
import InputCV from '../Public/InputCV'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import moment from 'moment'
import _ from 'lodash'


const GridTable = React.lazy(() => import('components/Table/GridTable'))
const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    }
});

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            reload: false
        }
        this.onCancel = this.onCancel.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(){
        this.onHide()
    }

    onHide(){
        this.setState({open: false})
    }

    onCancel(){
        this.onHide()
    }

    renderCreateCVOnline() {
        let recruiment = [
            {
                value: '0',
                label: 'Nam'
            },
            {
                value: '1',
                label: 'Nữ'
            },
        ]
        let marriage = [
            {
                value: '0',
                label: 'Độc thân'
            },
            {
                value: '1',
                label: 'Có gia đình'
            },

        ]
        return (
            <Dialog
                fullWidth={true}
                onClose={this.onCancel}
                open={this.state.open}
                // open={true}
                maxWidth='md'
                style={{ height: '100%' }}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogContent>
                    <Grid container  spacing={32}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Họ Tên")}
                                name="address"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Ngày sinh")}
                                name="address"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <AutoCompleteField
                                key="1"
                                fullWidth
                                select
                                label={I18n.t("Input.user.Giới tính")}
                                name="recruimentId"
                                isMulti={false} 
                                isClearable={false}
                            >
                                {
                                    recruiment.map(item => (
                                        <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                            {item.label}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Địa chỉ")}
                                name="address"
                            />
                        </Grid>
                        <Grid item xs={3}>
                        <AutoCompleteField
                                key="1"
                                fullWidth
                                select
                                label={I18n.t("Input.Tình trạng hôn nhân")}
                                name="recruimentId"
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    marriage.map(item => (
                                        <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                            {item.label}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>
                        </Grid>
                       
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Điện thoại")}
                                name="address"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Vị trí ứng tuyển")}
                                name="address"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Email")}
                                name="address"
                            />
                        </Grid>
                        
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Trình độ học vấn")}
                                name="address"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Ngoại ngữ (Trình độ)")}
                                name="address"
                                multiline
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Quốc gia muốn lao động")}
                                name="address"                             
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Mức lương mong muốn (VNĐ)")}
                                name="address"                             
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Kinh nghiệm làm việc")}
                                name="address"
                                rows={3}
                                rowsMax={6}
                                variant='outlined'
                                multiline
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Kỹ năng")}
                                name="address"
                                variant='outlined'
                                rows={3}
                                rowsMax={6}
                                multiline
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.Mục tiêu làm việc")}
                                name="address"
                                rows={3}
                                rowsMax={6}
                                variant='outlined'
                                multiline
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' variant='text' onClick={() => this.onCancel()}>
                        Thoát
                    </Button>
                    <Button color='primary' variant='text' onClick={() => this.onSubmit()}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderFilter() {
        let recruiment = [
            {
                value: '1',
                label: 'XXXXX'
            },
        ]
        return (
            <Grid container spacing={32}>
                <Grid item xs={4}>
                    <AutoCompleteField
                        key="1"
                        fullWidth
                        select
                        label={I18n.t("Input.user.Quốc gia")}
                        name="recruimentId"
                        isMulti={false}
                        isClearable={false}
                    >
                        {
                            recruiment.map(item => (
                                <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                    {item.label}
                                </OptionAuto>
                            ))
                        }
                    </AutoCompleteField>
                </Grid>
                <Grid item xs={4}>
                    <AutoCompleteField
                        key="1"
                        fullWidth
                        select
                        label={I18n.t("Input.user.Ngành nghề")}
                        name="recruimentId"
                        isMulti={false}
                        isClearable={false}
                    >
                        {
                            recruiment.map(item => (
                                <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                    {item.label}
                                </OptionAuto>
                            ))
                        }
                    </AutoCompleteField>
                </Grid>
                <Grid item xs={2} style={{ marginTop: '30px' }} >
                    <Button color='primary' variant='contained'>
                        Tìm việc
                    </Button>
                </Grid>
                <Grid item xs={2} style={{ marginTop: '30px' }} >
                    <Button color='primary' variant='contained'>
                        Thêm
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderCreateCV(){
        this.setState({open: true})
        this.setState({reload: !this.state.reload})
    }

    render() {
        let arr = [
            {
                img: 'http://xklddieuduongnhatban.com/wp-content/uploads/2018/07/tuyen-ky-su-cong-nghe-thong-tin-sang-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'http://xklddieuduongnhatban.com/wp-content/uploads/2018/07/tuyen-ky-su-cong-nghe-thong-tin-sang-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'http://xklddieuduongnhatban.com/wp-content/uploads/2018/07/tuyen-ky-su-cong-nghe-thong-tin-sang-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'https://japan.net.vn/images/uploads/2018/04/19/ky-su-cong-nghe-thong-tin-di-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'https://japan.net.vn/images/uploads/2018/04/19/ky-su-cong-nghe-thong-tin-di-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'https://japan.net.vn/images/uploads/2018/04/19/ky-su-cong-nghe-thong-tin-di-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'https://japan.net.vn/images/uploads/2018/04/19/ky-su-cong-nghe-thong-tin-di-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'https://japan.net.vn/images/uploads/2018/04/19/ky-su-cong-nghe-thong-tin-di-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'https://japan.net.vn/images/uploads/2018/04/19/ky-su-cong-nghe-thong-tin-di-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
            {
                img: 'https://japan.net.vn/images/uploads/2018/04/19/ky-su-cong-nghe-thong-tin-di-nhat.jpg',
                title: 'Devalop C++, Java, javascript',
                content: 'Kỹ sư đi nhật CNTT',
                date: '2019-10-10',
                money: '2000$ - 3000$',
                address: 'Tokyo, Nhật bản',
            },
        ]
        let { classes } = this.props
        return (
            <div>
                {
                    this.renderCreateCVOnline()
                }
                <img
                    src="https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_deposite.jpg"
                    alt=""
                />
                <u>
                    <Typography variant='h4' color='primary' align='center'>
                        Danh sách việc làm
                    </Typography>
                </u>
                <br></br>
                <Grid container spacing={32}>
                    <Grid item xs={9}>
                        <Card>
                            <CardContent>
                                {
                                    this.renderFilter()
                                }
                                <Grid container spacing={32}>
                                    <Grid item xs={1}>

                                    </Grid>
                                    <Grid item xs={2}>
                                        Mức Lương
                                    </Grid>
                                    <Grid item xs={2}>
                                        Hạn ứng tuyển
                                    </Grid>
                                    <Grid item xs={2}>
                                        Địa điểm
                                    </Grid>
                                    <Grid item xs={3}>
                                        Ngành nghề
                                    </Grid>
                                    <Grid item xs={2}>

                                    </Grid>
                                </Grid>
                                {
                                    arr.map((item, index) => {
                                        return (
                                            <span key={index}>
                                                <Grid container spacing={32}>
                                                    <Grid item xs={1}>
                                                        <img
                                                            src={item.img}
                                                            height='60'
                                                            width='60'
                                                            alt='JSGlobal'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        {item.money}
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Icon>calendar_today</Icon>{item.date}
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Icon>place</Icon> {item.address}
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography variant='h6'>
                                                            {item.title}
                                                        </Typography>
                                                        <Typography>
                                                            {item.content}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Button variant='text' color='primary'>
                                                            Chi tiết
                                                        </Button>
                                                        <Button variant='text' color='primary'>
                                                            Sửa
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                                <hr></hr>
                                            </span>
                                        )
                                    })
                                }
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={3}>
                        <InputCV classes={classes} />
                        <br></br> <br></br>
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