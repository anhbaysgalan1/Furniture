import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form, TextField, Validation } from "components/Forms";
import TextField1 from "@material-ui/core/TextField";
import AutoCompleteField, {
  Option as OptionAuto
} from "components/Forms/AutoCompleteField";
import { BaseView } from "views/BaseView";
import { I18n } from "react-redux-i18n";
import { Icon, Card, CardActions, Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import _ from "lodash";

const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`
  }
});

const required = function(value) {
  if (!value || value.length === 0) {
    return I18n.t("Form.required");
  }
};
class Create extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      requiredPass: false,
      errorPass: false,
      remainThisYear: 0,
      remainLastYear: 0,
      password: "",
      rePassword: "",
      checkRepass: false,
      name: "",
      errorName: undefined,
      _username: ""
    };
    this.validate = {
      username: [
        Validation.required(I18n.t("Form.required")),
        Validation.maxLength(10, I18n.t("Form.maxLeng10"))
      ],
      password: [
        Validation.required(I18n.t("Form.required")),
        Validation.maxLength(10, I18n.t("Form.maxLeng10"))
      ],
      name: [
        Validation.required(I18n.t("Form.required")),
        Validation.maxLength(30, I18n.t("Form.maxLeng30"))
      ]
    };
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = data => {
    if (data == data) {
      let value = _.get(data, "value", "");
    }
  };

  handleChange = (data, name) => {
    if (name === "remainLastYear") {
      this.setState({ remainLastYear: data });
    }
    if (name === "remainThisYear") {
      this.setState({ remainThisYear: data });
    }
  };

  onChangePassword(value, name) {
    if (name === "password") {
      this.setState({ password: value });
    }
    if (name === "rePassword") {
      this.setState({ rePassword: value.target.value });
      if (value.target.value !== this.state.password) {
        this.setState({ errorPass: true }); // không khớp Mk
      } else if (value.target.value === this.state.password) {
        this.setState({ errorPass: false }); // khớp MK
      }
      if (value.target.value == "" || !value.target.value) {
        this.setState({ checkRepass: true });
      } else {
        this.setState({ checkRepass: false });
      }
    }
  }

  onSubmit(value) {
    value["rePassword"] = this.state.rePassword;
    if (!this.state.errorPass && this.state.rePassword) {
      this.props.onSubmit(value);
    }
  }

  checkOnClickSubmit = () => {
    if (!this.state.rePassword) {
      this.setState({ checkRepass: true });
    } else {
      this.setState({ checkRepass: false });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      // xs sm md lg xl
      <Grid container spacing={16}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Card className={classes.paper}>
            <Form onSubmit={value => this.onSubmit(value)}>
              <Grid container spacing={16}>
                <Grid item lg={6}>
                  <TextField
                    fullWidth
                    label={I18n.t("Input.user.username")}
                    name="username"
                    validate={this.validate.username}
                    defaultValue=""
                    onKeyDown={e => {
                      if ([" "].indexOf(e.key) >= 0) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    fullWidth
                    label={I18n.t("Input.user.name")}
                    name="name"
                    value={this.state.name}
                    validate={this.validate.name}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    type="password"
                    fullWidth
                    label={I18n.t("Input.password")}
                    name="password"
                    value={this.state.password}
                    validate={this.validate.password}
                    onChange={value => this.onChangePassword(value, "password")}
                  />
                </Grid>
                <Grid item lg={6}>
                  {!this.state.errorPass ? (
                    <TextField1
                      type="password"
                      fullWidth
                      label={I18n.t("Input.rePassword")}
                      name="rePassword"
                      style={{ marginTop: "15px" }}
                      error={this.state.checkRepass}
                      helperText={
                        this.state.checkRepass ? I18n.t("Form.required") : ""
                      }
                      value={this.state.rePassword}
                      onChange={value =>
                        this.onChangePassword(value, "rePassword")
                      }
                    />
                  ) : (
                    <TextField1
                      type="password"
                      fullWidth
                      label={I18n.t("Input.rePassword")}
                      name="rePassword"
                      style={{ marginTop: "15px" }}
                      error={this.state.errorPass ? true : false}
                      helperText={
                        this.state.errorPass
                          ? I18n.t("Message.passwordNotMatch")
                          : ""
                      }
                      value={this.state.rePassword}
                      onChange={value =>
                        this.onChangePassword(value, "rePassword")
                      }
                    />
                  )}
                </Grid>
              </Grid>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => this.goto(`/users`)}>
                  <Icon>keyboard_arrow_left</Icon> {I18n.t("Button.back")}
                </Button>
                <Button type="submit" variant="contained" onClick={() => this.checkOnClickSubmit()} color="primary" >
                  {I18n.t("Button.submit")}
                </Button>
              </CardActions>
            </Form>
          </Card>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Create));
