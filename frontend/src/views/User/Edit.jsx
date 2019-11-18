import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
import DateTimeField from 'components/Forms/DateTimeField'
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
            open: false,
            password: "",
            passwordError: false,
            rePassword: "",
            rePasswordError: false,
        }
        this.validate = {
            username: [
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
        }
        this.handleRePassword = this.handleRePassword.bind(this)
        this.renderPassword = this.renderPassword.bind(this)
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
        let { classes, onSubmit, data } = this.props
        let username = _.get(data, "username", "")
        let name = _.get(data, "name", "")
        return (
           <Grid container spacing={32}>
               <Grid item xs={3}></Grid>
               <Grid item xs={9}>
               <PaperFade className={classes.paper}>
                <Form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={32}>
                        <Grid item lg={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.username")}
                                name="username"
                                value={username}
                                validate={this.validate.username}
                                onKeyDown={(e) => {
                                    if ([" ",].indexOf(e.key) >= 0) {
                                        e.preventDefault()
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.user.name")}
                                name="name"
                                value={name}
                                validate={this.validate.name}
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
               </Grid>
           </Grid>
        )
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))
