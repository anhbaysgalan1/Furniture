import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import {
    Grid,
    Typography,
    IconButton,
    Icon,
    Tooltip,
    Card,
    Button,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import { withRouter } from 'react-router-dom'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'

const styles = theme => ({
    paper: {
        // padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    },
    card: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    },
    form: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
        // padding: '10px 10px 10px 10px'
    },
    imgZoom: {
        transition: "transform .5s, filter 3s ease-in-out",
        filter: "grayscale(100%)",
    },
    imgZoom: {
        "&:hover": {
            filter: "grayscale(0)",
            transform: "scale(1.1)",
            transitionDuration: "1s",
            transitionTimingFunction: "linear",
        }
    },
})

class Create extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            dataInput: {
                name: '',
                code: '',
                image1: '',
                image2: '',
                image2: '',
                image4: '',
                moneyOld: '',
                moneyNew: '',
                typeGoods: '',
                typeWoods: '',
                content: ''
            }
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.validate = {
            name: [
                Validation.required(I18n.t("Form.required")),
                Validation.maxLength(255, I18n.t("Form.maxLeng255"))
            ],
            permission: [
                Validation.required(I18n.t("Form.required"))
            ],
        }
    }

    onHandleChange(value, name) {
        let { dataInput } = this.state
        this.setState({
            dataInput: { ...this.state.dataInput, [name]: value }
        })
    }

    render() {
        const { classes, onSubmit } = this.props
        let { dataInput } = this.state
        let typeClient = [
            {
                title: "Khách lẻ",
                value: '0',
            },
            {
                title: "Khách buôn",
                value: '1',
            },
            {
                title: "Đối tác",
                value: '2',
            }
        ]
        return (
            <Form className={classes.form} onSubmit={onSubmit}>
                <Grid container spacing={32}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant='h5' color='primary'>
                                    Thêm khách hàng
                                </Typography>
                                <Grid container spacing={32}>
                                    <Grid item xs={3}>
                                        <AutoCompleteField
                                            key="1"
                                            fullWidth
                                            select
                                            label={I18n.t("Input.goods.Loại khách hàng")}
                                            onChange={(value) => this.onHandleChange(value, 'typeGoods')}
                                            name="type"
                                            validate={this.validate.area}
                                            isMulti={false}
                                            isClearable={false}
                                        >
                                            {
                                                typeClient.map(item => (
                                                    <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                                        {item.title}
                                                    </OptionAuto>
                                                ))
                                            }
                                        </AutoCompleteField>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Mã khách hàng")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            name="code"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Tên khách hàng")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Số điện thoại")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            name="phone"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Email")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            name="mail"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Địa chỉ")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            name="address"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                    <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Số lần mua hàng")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            name="number"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                    <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Tổng tiền")}
                                            onChange={(value) => this.onHandleChange(value, 'name')}
                                            name="money"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                    <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.Hàng đã mua")}
                                            onChange={(value) => this.onHandleChange(value, 'code')}
                                            value="GN1 (2019-11-11), GN2 (2019-01-12)"
                                            name="goods"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={32}>
                                    <Grid item xs={12}>
                                        <TextField
                                            multiline
                                            rows={4}
                                            rowsMax={8}
                                            variant="outlined"
                                            fullWidth
                                            label={I18n.t("Input.goods.content.Ghi chú khách hàng")}
                                            onChange={(value) => this.onHandleChange(value, 'content')}
                                            name="note"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => this.goto("/client")}>
                                    <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                                </Button>
                                <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Form>
        )
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))