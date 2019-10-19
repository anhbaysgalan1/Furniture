import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import {
    Form,
    TextField,
    DateTimeField,
    Validation,
    CheckboxField
} from 'components/Forms'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    }
})

class Create extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <span>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={I18n.t("Common.Tiêu đề tin tức")}
                            name='title'
                        />
                        <TextField
                            fullWidth
                            label={I18n.t("Common.Tóm tắt nội dung tin tức")}
                            name='title'
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows='5'
                            variant='outlined'
                            rowsMax='20'
                            label={I18n.t("Common.Ảnh tin tức")}
                            name='title'
                        />   
                        <TextField
                            fullWidth
                            label={I18n.t("Common.Chú thích ảnh")}
                            name='title'
                        />  
                        <TextField
                            fullWidth
                            multiline
                            rows='5'
                            variant='outlined'
                            rowsMax='30'
                            label={I18n.t("Common.Nội dung tin tức")}
                            name='title'
                        />
                    </Grid>
                </Grid>
            </span>
        )
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))