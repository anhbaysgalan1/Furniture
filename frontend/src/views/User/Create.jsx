import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import TextField1 from '@material-ui/core/TextField'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import { Icon, Card, CardActions, Grid, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

const styles = theme => ({
    paper: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    }
})

const required = function (value) {
    if (!value || value.length === 0) {
        return I18n.t("Form.required")
    }
}
class Create extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            requiredPass: false,
            errorPass: false,
            positionId: null,
            remainThisYear: 0,
            remainLastYear: 0,
            password: "",
            rePassword: "",
            phone: "",
            errorPhone: undefined,
            name: "",
            errorName: undefined,
            _username: '',
            _phone: ''
        }
        this.validate = {
            username: [
                Validation.required(I18n.t("Form.required")),
                Validation.maxLength(255, I18n.t("Form.maxLeng255"))
            ],
            code: [
                Validation.required(I18n.t("Form.required")),
                Validation.maxLength(255, I18n.t("Form.maxLeng255"))
            ],
            password: [
                Validation.required(I18n.t("Form.required")),
                Validation.maxLength(255, I18n.t("Form.maxLeng255"))
            ],
            name: [
                Validation.required(I18n.t("Form.required")),
                Validation.maxLength(255, I18n.t("Form.maxLeng255"))
            ],
            phone: [
                // Validation.required(I18n.t("Form.required")),
                Validation.maxLength(13, I18n.t("Form.lengPhone")),
                Validation.number(I18n.t("Form.number")),
            ],
            role: [
                Validation.required(I18n.t("Form.required")),
            ],
            recruiment: [
                Validation.required(I18n.t("Form.required")),
            ],
            positionCode: [
                Validation.required(I18n.t("Form.required")),
            ],
            positionId: [
                Validation.required(I18n.t("Form.required")),
            ],
            date: [
                Validation.required(I18n.t("Form.required")),
            ],
            remainYear: [
                Validation.max(20, I18n.t("Form.max20"))
            ]
        }
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = (data) => {
        if (data == data) {
            let value = _.get(data, 'value', '')
            this.setState({ positionId: value })
        }
    }

    handleChange = (data, name) => {
        if (name === "remainLastYear") {
            this.setState({ remainLastYear: data })
        }
        if (name === "remainThisYear") {
            this.setState({ remainThisYear: data })
        }
    }

    onChangePassword(value, name) {
        if (name === 'password') {
            this.setState({ password: value }) // errorPass: true
        }
        if (name === 'rePassword') {
            this.setState({ rePassword: value.target.value })
            if (value.target.value !== this.state.password) {
                this.setState({ errorPass: true })
            } else if (value.target.value === this.state.password) {
                this.setState({ errorPass: false })
            }
        }
    }

    phoneFormatter(number) {
        number = number.replace(/[^\d]/g, '')
        if (number.length == 4) {
            number = number.replace(/(\d{4})/, "$1")
        } else if (number.length == 5) {
            number = number.replace(/(\d{4})(\d{1})/, "$1-$2")
        } else if (number.length == 6) {
            number = number.replace(/(\d{4})(\d{2})/, "$1-$2")
        } else if (number.length == 7) {
            number = number.replace(/(\d{4})(\d{3})/, "$1-$2")
        } else if (number.length == 8) {
            number = number.replace(/(\d{4})(\d{3})(\d{1})/, "$1-$2-$3")
        } else if (number.length == 9) {
            number = number.replace(/(\d{4})(\d{3})(\d{2})/, "$1-$2-$3")
        } else if (number.length == 10) {
            number = number.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3")
        } else if (number.length == 11) {
            number = number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
        }
        return number
    }

    onChangePhone(value) {
        this.setState({ _phone: value })
    }

    onSubmit(value) {
        value['rePassword'] = this.state.rePassword
        this.props.onSubmit(value)
    }

    render() {
        const { classes, position, recruiment, role } = this.props
        const { positionId } = this.state
        let remainTotal = Number(this.state.remainThisYear) + Number(this.state.remainLastYear)
        return ( // xs sm md lg xl
            <Card className={classes.paper}>
                <Form className={classes.form} onSubmit={(value) => this.onSubmit(value)}>
                    <Grid container spacing={32}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.username")}
                                name="username"
                                validate={this.validate.username}
                                onKeyDown={(e) => {
                                    if ([" ",].indexOf(e.key) >= 0) {
                                        e.preventDefault()
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.code")}
                                name="code"
                                validate={this.validate.code}
                                onKeyDown={(e) => {
                                    if ([" ",].indexOf(e.key) >= 0) {
                                        e.preventDefault()
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.name")}
                                name="name"
                                value={this.state.name}
                                validate={this.validate.name}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.phone")}
                                name="phone"
                                onChange={(value) => this.onChangePhone(value)}
                                value={this.phoneFormatter(this.state._phone)}
                                onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab'].indexOf(e.key) < 0) {
                                        e.preventDefault()
                                    }
                                    if (e.target.value.length >= 13) {
                                        if (['Backspace', 'Tab'].indexOf(e.key) < 0) {
                                            e.preventDefault()
                                        }
                                    }
                                }}
                                validate={this.validate.phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AutoCompleteField
                                key="1"
                                fullWidth
                                select
                                label={I18n.t("Input.user.recruiment")}
                                name="recruimentId"
                                validate={this.validate.recruiment}
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    recruiment.map(item => (
                                        <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                            {item.name}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AutoCompleteField
                                key="0"
                                fullWidth
                                select
                                label={I18n.t("Input.user.role")}
                                name="roleId"
                                validate={this.validate.role}
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    role.map(item => (
                                        <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                            {item.name}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AutoCompleteField
                                key="2"
                                fullWidth
                                select
                                label={I18n.t("Input.position.code")}
                                name="positionCode"
                                validate={this.validate.positionCode}
                                onChange={(value) => this.onChange(value)}
                                defaultValue={positionId}
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    position.map(item => (
                                        <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                            {item.code}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AutoCompleteField
                                key="3"
                                fullWidth
                                select
                                label={I18n.t("Input.position.name")}
                                name="positionId"
                                validate={this.validate.positionId}
                                onChange={(value) => this.onChange(value)}
                                defaultValue={positionId}
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    position.map(item => (
                                        <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                            {item.name}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <DateTimeField
                                fullWidth
                                label={I18n.t("Input.user.joining_date")}
                                name="joiningDate"
                                clearable={false}
                                validate={this.validate.date}
                                showTime={false}
                                showDate={true}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <TextField
                                type="password"
                                fullWidth
                                label={I18n.t("Input.password")}
                                name="password"
                                value={this.state.password}
                                validate={this.validate.password}
                                onChange={(value) => this.onChangePassword(value, 'password')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField1
                                type="password"
                                fullWidth
                                label={I18n.t("Input.rePassword")}
                                name="rePassword"
                                style={{ marginTop: '15px' }}
                                error={this.state.errorPass ? true : false}
                                helperText={this.state.errorPass ? I18n.t("Message.passwordNotMatch") : ''}
                                value={this.state.rePassword}
                                onChange={(value) => this.onChangePassword(value, 'rePassword')}
                            />
                        </Grid>

                        <Grid item xs={12} md={3} lg={3} style={{ marginTop: "25px" }}>
                            <p>{I18n.t("Input.user.dayOff")}</p>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.remainLastYear")}
                                onChange={(data) => this.handleChange(data, 'remainLastYear')}
                                onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab'].indexOf(e.key) < 0) {
                                        e.preventDefault()
                                    }
                                }}
                                defaultValue={'0'}
                                validate={this.validate.remainYear}
                                name="remainLastYear"
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.remainThisYear")}
                                onChange={(data) => this.handleChange(data, 'remainThisYear')}
                                name="remainThisYear"
                                validate={this.validate.remainYear}
                                defaultValue={'0'}
                                onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab'].indexOf(e.key) < 0) {
                                        e.preventDefault()
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.remainTotal")}
                                name="remainTotal"
                                disabled={true}
                                defaultValue={remainTotal ? remainTotal : '0'}
                            />
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto(`/users`)}>
                            <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                    </CardActions>
                </Form>
            </Card>
        )
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))