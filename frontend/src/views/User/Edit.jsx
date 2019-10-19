import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import {
    Grid,
    Button,
    Dialog,
    Icon,
    CardActions,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import TextField1 from '@material-ui/core/TextField'
import { withRouter } from 'react-router-dom'
import _ from 'lodash';


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
            positionId: "",
            remainLastYear: 0,
            remainThisYear: 0,
            remainTotal: 0,
            open: false,
            password: "",
            passwordError: false,
            rePassword: "",
            rePasswordError: false,
            phone: "",
            errorPhone: undefined,

            _phone: '',
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
            area: [
                Validation.required(I18n.t("Form.required")),
            ],
            positionCode: [
                Validation.required(I18n.t("Form.required")),
            ],
            positionId: [
                Validation.required(I18n.t("Form.required")),
            ],
            remainLastYear: [
                Validation.max(20, I18n.t("Form.max20"))
            ],
            remainThisYear: [
                Validation.max(20, I18n.t("Form.max20"))
            ]
        }
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this)
        this.handleRePassword = this.handleRePassword.bind(this)
        this.renderPassword = this.renderPassword.bind(this)
    }

    onChangeInput() {
        let remainLastYear = document.getElementById("remainLastYear");
        let remainThisYear = document.getElementById("remainThisYear");
        let remainTotal = Number(remainLastYear.value) + Number(remainThisYear.value)
        document.getElementById("remainTotal").innerHTML = "Paragraph changed!";
        document.getElementById('remainTotal').value = remainTotal || 0;
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleOpen = () => {
        this.setState({
            open: true,
            password: "",
            passwordError: false,
            rePassword: "",
            rePasswordError: false,
        })
    }
    submitPassword = () => {
        if (!this.state.password) {
            this.setState({ passwordError: I18n.t("Form.required") })
            return false
        }
        if (!this.state.rePassword) {
            this.setState({ rePasswordError: I18n.t("Form.required") })
            return false
        }
        if (this.state.rePassword !== this.state.password) {
            this.setState({ rePasswordError: I18n.t("Message.passwordNotMatch") })
            return false
        }
        if (this.state.rePasswordError || this.state.passwordError) return false
        let values = {
            password: this.state.password
        }
        this.props.onChangePassword(values)
        this.setState({ open: false })
    }
    handlePassword = (event) => {
        let value = event.target.value
        value = value.replace(/\s/g, "");
        //throw error
        if (!value) {
            this.setState({ password: "", passwordError: I18n.t("Form.required") })
            return false
        }
        //bắt password kg lớn hơn 255
        let length_error = value.length > 255 ? I18n.t("Form.maxLeng255") : ""
        if (length_error) {
            this.setState({ password: value, passwordError: length_error })
            return false
        }

        if (this.state.rePassword === value) {
            if (this.state.rePasswordError === I18n.t("Message.passwordNotMatch")) {
                this.setState({ rePasswordError: "" })
            }
        }

        //assign data
        this.setState({ password: value, passwordError: false })
    }
    handleRePassword(event) {
        let value = event.target.value
        value = value.replace(/\s/g, "");
        //throw error
        if (!value) {
            this.setState({ rePassword: "", rePasswordError: I18n.t("Form.required") })
            return false
        }

        //bắt password kg lớn hơn 255
        let length_error = value.length > 255 ? I18n.t("Form.maxLeng255") : ""
        if (length_error) {
            this.setState({ rePassword: value, rePasswordError: length_error })
            return false
        }

        if (this.state.password !== value) {
            this.setState({ rePassword: value, rePasswordError: I18n.t("Message.passwordNotMatch") })
            return false
        }
        //assign data
        this.setState({ rePassword: value, rePasswordError: false })
    }
    onChange = (data) => {
        let value = _.get(data, 'value', '')
        this.setState({ positionId: value })
    }
    phoneFormatter(number) {
        number = number.toString()
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
        // console.log('value', value, '\n', value.length)
        this.setState({ _phone: value })
    }
    renderPassword() {
        return (
            <Dialog open={this.state.open} aria-labelledby="form-dialog-title" maxWidth='sm' fullWidth={true}>
                <DialogTitle id="form-dialog-title">{I18n.t("Input.changePassword.title")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* {I18n.t("Input.changePassword.notice")} */}
                    </DialogContentText>
                    <TextField1
                        autoFocus
                        margin="dense"
                        name="password"
                        helperText={this.state.passwordError}
                        error={this.state.passwordError ? true : false}
                        label={I18n.t("Input.password")}
                        type="password"
                        onChange={this.handlePassword}
                        value={this.state.password}
                        fullWidth
                        validate={this.validate.password}
                    />
                    <TextField1
                        margin="dense"
                        name="rePassword"
                        helperText={this.state.rePasswordError}
                        error={this.state.rePasswordError ? true : false}
                        label={I18n.t("Input.rePassword")}
                        type="password"
                        value={this.state.rePassword}
                        onChange={this.handleRePassword}
                        fullWidth
                        validate={this.validate.password}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.handleClose}>
                        {I18n.t("Button.cancel")}
                    </Button>
                    <Button color="primary" onClick={this.submitPassword}>
                        {I18n.t("Button.edit")}
                    </Button>
                </DialogActions>

            </Dialog>
        )
    }

    render() {
        let { classes, onSubmit, data = {} } = this.props
        let { role, position, area } = this.props || []
        let joiningDate = _.get(data, "joiningDate", "")
        let positionId = _.get(data, "positionId", '')
        let areaId = _.get(data, "areaId", '')
        let statusArea = false
        let statusRole = false
        let statusPosition = false
        area.map(item => {
            if (item._id == areaId) {
                statusArea = true
            }
        })
        let roleId = _.get(data, "roleId", '')
        role.map(item => {
            if (item._id == roleId) {
                statusRole = true
            }
        })
        position.map(item => {
            if (item._id == positionId) {
                statusPosition = true
            }
        })
        let phone = _.get(data, 'phone', '')
        let remainLastYear = _.get(data, 'remainLastYear', 0)
        let remainThisYear = _.get(data, 'remainThisYear', 0)
        let remainTotal = Number(remainLastYear) + Number(remainThisYear)
        return (
            <PaperFade className={classes.paper}>
                <Form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={32}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.username")}
                                name="username"
                                value={data.username}
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
                                value={data.code}
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
                                value={data.name}
                                validate={this.validate.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.phone")}
                                name="phone"
                                error={this.state.errorPhone}
                                onChange={(value) => this.onChangePhone(value)}
                                defaultValue={this.phoneFormatter(phone)}
                                value={this.phoneFormatter(this.state._phone)}
                                onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab'].indexOf(e.key) < 0) {
                                        e.preventDefault()
                                    }
                                    if ((['Backspace', 'Tab'].indexOf(e.key) < 0)) {
                                        if (e.target.value.length === 13) {
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
                                label={I18n.t("Input.user.area")}
                                name="areaId"
                                validate={this.validate.area}
                                defaultValue={statusArea ? areaId : ''}
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    area.map(option => (
                                        <OptionAuto key={option._id} value={option._id} showCheckbox={false}>
                                            {option.name ? option.name : null}
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
                                defaultValue={statusRole ? roleId : ''}
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    role.map(option => (
                                        <OptionAuto key={option._id} value={option._id} showCheckbox={false}>
                                            {option.name}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>

                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AutoCompleteField
                                key="1"
                                fullWidth
                                select
                                label={I18n.t("Input.position.code")}
                                name="positionCode"
                                validate={this.validate.positionCode}
                                onChange={(value) => { this.onChange(value) }}
                                value={this.state.positionId ? this.state.positionId : statusPosition ? positionId : ''}
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
                                key="1"
                                fullWidth
                                select
                                label={I18n.t("Input.position.name")}
                                name="positionId"
                                validate={this.validate.positionId}
                                onChange={(value) => { this.onChange(value) }}
                                defaultValue={this.state.positionId ? this.state.positionId : statusPosition ? positionId : ''}
                                isMulti={false}
                                isClearable={false}
                            >
                                {
                                    position.map(option => (
                                        <OptionAuto key={option._id} value={option._id} showCheckbox={false}>
                                            {option.name}
                                        </OptionAuto>
                                    ))
                                }
                            </AutoCompleteField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <DateTimeField
                                disabled
                                fullWidth
                                label={I18n.t("Input.user.joining_date")}
                                name="joiningDate"
                                clearable={true}
                                autoOk={true}
                                showTime={false}
                                showDate={true}
                                value={joiningDate}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} style={{ marginTop: "25px" }}>
                            <p>{I18n.t("Input.user.dayOff")}</p>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.remainLastYear")}
                                onChange={() => this.onChangeInput()}
                                id='remainLastYear'
                                value={remainLastYear ? remainLastYear : '0'}
                                name="remainLastYear"
                                onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab', 'Delete'].indexOf(e.key) < 0) {
                                        e.preventDefault()
                                    }
                                }}
                                validate={this.validate.remainLastYear}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <TextField
                                id='remainThisYear'
                                fullWidth
                                label={I18n.t("Input.user.remainThisYear")}
                                value={remainThisYear ? remainThisYear : '0'}
                                onChange={() => this.onChangeInput()}
                                onKeyDown={(e) => {
                                    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Backspace', 'Tab', 'Delete'].indexOf(e.key) < 0) {
                                        e.preventDefault()
                                    }
                                }}
                                validate={this.validate.remainThisYear}
                                name="remainThisYear"
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.remainTotal")}
                                name="remainTotal"
                                id="remainTotal"
                                disabled
                                value={this.state.remainTotal || remainTotal ? remainTotal : '0'}
                            />
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto(`/users`)}>
                            <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button onClick={this.handleOpen} variant="contained" color="primary">{I18n.t("Button.changePassword")}</Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                        {this.renderPassword()}
                    </CardActions>
                </Form>
            </PaperFade>
        )
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))
