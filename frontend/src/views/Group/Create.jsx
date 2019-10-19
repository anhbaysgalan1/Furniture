import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Form, TextField, Validation } from 'components/Forms'
import { BaseView } from 'views/BaseView';
import { I18n } from 'react-redux-i18n';
import { Grid, Button } from '@material-ui/core';
import PaperFade from "components/Main/PaperFade"
const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
  }
});

class Create extends BaseView {
  constructor(props) {
    super(props)
    this.validate = {
      code: [
        Validation.required(I18n.t("Form.required"))
      ],
    }
  }

  render() {
    const { classes, onSubmit } = this.props
    return (
      <PaperFade className={classes.paper}>
        <Form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={32}>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                label={I18n.t("Input.code")}
                name="code"
                validate={this.validate.code}
              />
            </Grid>
            <br />
            "Mở file views/Group/Create.jsx để chỉnh sửa view."
            <Grid item xs={12} lg={12}>
              <Button type="submit" variant="contained" color="primary">{I18n.t("Button.addUser")}</Button>
            </Grid>
          </Grid>
        </Form>
      </PaperFade>
    )
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Create);