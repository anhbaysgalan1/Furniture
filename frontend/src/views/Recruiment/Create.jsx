import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { IconButton, Icon, Tooltip} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { I18n } from 'react-redux-i18n'
import { Grid, Button, Card, CardActions } from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
const styles = theme => ({
    paper: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    }
})

class Create extends BaseView {
  constructor(props) {
    super(props)
    this.validate = {
        code: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(255, I18n.t("Form.maxLeng255"))
        ],
        name: [
            Validation.required(I18n.t("Form.required")),
            Validation.maxLength(255, I18n.t("Form.maxLeng255"))
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
                                onChange={() => {}}
                                fullWidth
                                label={I18n.t("Input.recruiment.code")}
                                name="code"
                                validate={this.validate.code}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                onChange={() => {}}
                                label={I18n.t("Input.recruiment.name")}
                                name="name"
                                validate={this.validate.name}
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
            </PaperFade>
        )
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))