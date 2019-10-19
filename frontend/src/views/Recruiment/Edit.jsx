import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
import { I18n } from 'react-redux-i18n'
import { withRouter } from 'react-router-dom'
import { BaseView } from 'views/BaseView'
import { Grid, Button, Card, CardActions, Icon } from '@material-ui/core'

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
                Validation.required(I18n.t("Form.required")),
            ],
            name: [
                Validation.required(I18n.t("Form.required")),
            ],
        }
    }

    render() {
        const { classes, onSubmit, data } = this.props
        return (
            <Card className={classes.paper}>
                <Form className={classes.form} onSubmit={ onSubmit }>
                    <Grid container spacing={32}>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.recruiment.code")}
                                name="code"
                                validate={this.validate.code}
                                value={data.code}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                label={I18n.t("Input.recruiment.name")}
                                name="name"
                                validate={this.validate.name}
                                value={data.name}
                            />
                        </Grid>
                        <br />
                    </Grid>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto("/recruiments")}>
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
};

export default withStyles(styles)(withRouter(Create))