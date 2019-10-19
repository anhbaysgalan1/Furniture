import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n'
import PropTypes from 'prop-types';
import { Avatar, Button, Paper, Typography, Icon } from '@material-ui/core/';
import withStyles from '@material-ui/core/styles/withStyles';
import { Form, TextField, CheckboxField } from 'components/Forms/';
import { required } from 'components/Forms/Validation'

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    fixLoginBtn: {
        marginTop: theme.spacing.unit * 3,
    }
});

class Login extends Component {
    constructor(props) {
        super(props)
        this.validate = {
            username: [
                required(I18n.t("Form.required"))
            ],
            password: [
                required(I18n.t("Form.required"))
            ]
        }
    }

    render() {
        let { classes } = this.props
        return (
            < Paper className={classes.paper} >
                <Avatar className={classes.avatar}>
                    <Icon>lockOutlined</Icon>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {I18n.t("User.signin")}
                </Typography>
                <Form
                    className={classes.form}
                    onSubmit={(values) => { this.props.onSubmit(values) }}
                >
                    <TextField
                        fullWidth
                        label={I18n.t("User.username")}
                        name="username"
                        autoComplete="on"
                        validate={this.validate.username}
                    />
                    <TextField
                        fullWidth
                        //forwardRef={ref => this.refPassword = ref}
                        label={I18n.t("User.password")}
                        name="password"
                        type="password"
                        autoComplete="on"
                        error={this.props.error.password.value}
                        errorModified={this.props.error.password.modifiedAt}
                        validate={this.validate.password}
                    />
                    {/* <CheckboxField
            label={I18n.t("User.remember")}
            name="remember"
            checked={true}
          /> */}
                    <Button
                        className={classes.fixLoginBtn}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        {I18n.t("User.signin")}
                    </Button>
                </Form>

            </Paper >)
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);