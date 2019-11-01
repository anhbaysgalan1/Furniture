import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import RadioGroupField, { Radio } from 'components/Forms/RadioGroupField'
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
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Toolbar,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    form: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataInput: {
                name: '',
                phone: '',
                address: '',
                count: '',
                pay: '',
                transportFee: '',
            }
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    onCancel(classes) {
        this.props.onCancel()
    }

    onHandleChange(value, name) {
        let { dataInput } = this.state
        this.setState({
            dataInput: { ...this.state.dataInput, [name]: value }
        })
    }

    renderDialog(classes, dataGoods, onSubmit){
        let img = [
            // {
            //     img: 'http://vilahome.com.vn/wp-content/uploads/2018/05/Mau-giuong-da-nang-thong-minh-hien-dai-1.jpg'
            // },
            // {
            //     img: 'http://sofabella.vn/wp-content/uploads/2015/03/GIUONG-NGu-B1240.jpg'
            // },
            // {
            //     img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg'
            // }
        ]
        let _id   = _.get(dataGoods, '_id', '5d06eb5af621c229e0cfcd97')
        let money = _.get(dataGoods, 'moneyNew', '1000')
        return (
            <Dialog
                fullWidth={true}
                onClose={this.onCancel}
                open={true}
                maxWidth='md'
                aria-labelledby="draggable-dialog-title"
            >
                <Form className={classes.form} onSubmit={onSubmit}>
                    <DialogContent>
                        <Typography variant="h6"> 
                            Giường gỗ GG22 - 2.000.000đ
                        </Typography>
                        <Grid container spacing={8}>
                            {/* <Grid item xs={5}>
                                <img src={img[0].img} height='250' width='350'/>
                                {
                                    img.map((item, index) => {
                                        return (
                                            <img 
                                                key={index} 
                                                src={item.img} 
                                                height='35' 
                                                width='50'
                                            />
                                        )
                                    })
                                }
                            </Grid> */}
                            <Grid item xs={7}>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    type="hidden"
                                    name="goodsId"
                                    value={_id}
                                />
                                <TextField
                                    type="hidden"
                                    name="money"
                                    value={money}
                                />
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Tên của bạn")}
                                    onChange={(value) => this.onHandleChange(value, 'code')}
                                    name="name"
                                />
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.SĐT")}
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="phone"
                                />
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Dia chi giao hang")}
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="address"
                                />
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Số lượng")}
                                    onChange={(value) => this.onHandleChange(value, 'code')}
                                    name="count"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Phí vận chuyển")}
                                    value="Miễn phí vận chuyển cho đơn hàng trên 5tr"
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="transportFee"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <RadioGroupField name="pay" label={I18n.t("Input.bad.hinh thuc thanh toan")} value="1" fullWidth>
                                    <Radio
                                        label="Thanh toán khi nhận hàng"
                                        value="1"
                                    />
                                    <Radio
                                        label="Chuyển khoản Tbbank (0178 53658 8698)"
                                        value="2"
                                    />
                                    <Radio
                                        label="Ví điện tử"
                                        value="3"
                                    />
                                </RadioGroupField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={() => this.onCancel()}>
                            Hủy bỏ
                        </Button>
                        <Button color='primary' type='submit' autoFocus>
                            Gửi
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        )
    }

    render() {
        let { classes, onSubmit, dataGoods } = this.props
        return (
            <div>
                {this.renderDialog(classes, dataGoods, onSubmit)}
            </div>
        );
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))
// ReactDOM.render(<App />, document.getElementById("root"));