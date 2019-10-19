import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, DateTimeField, Validation, CheckboxField } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import { withRouter } from 'react-router-dom'
import PaperFade from "components/Main/PaperFade"
// import Edittor from './Components/Edittor'
import {
    Tab,
    Grid,
    Card,
    CardActions,
    CardContent,
    AppBar,
    Tabs,
    Typography,
    Button,
    Icon,
    IconButton,

} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({

})

class Create extends BaseView {
    constructor(props) {
        super(props)
    }
    render() {
        const { classes, onSubmit } = this.props
        // let img = _.get(data, 'img', '')
        // let title = _.get(data, 'title', '')
        // let content = _.get(data, 'content', '')
        // let salary = _.get(data, 'salary', '') // đãi ngộ
        // let request = _.get(data, 'request', '') // yêu cầu
        // let summary = _.get(data, 'summary', '') // khái quát công việc
        return (
            <Card>
                <CardContent>
                    <Grid container spacing={32}>
                        <Grid item lg={6}>
                            <TextField
                                fullWidth
                                label='Tiêu đề công việc'
                                name="title"
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                variant='outlined'
                                rowsMax={30}
                                label='Chế độ đãi ngộ'
                                name='salary'
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                variant='outlined'
                                rowsMax={30}
                                label={I18n.t("Common.Nội dung công việc")}
                                name='content'
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                variant='outlined'
                                rowsMax={30}
                                label='Yêu cầu tuyển dụng'
                                name='salary'
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                variant='outlined'
                                rowsMax={30}
                                label={I18n.t("Common.Ảnh")}
                                name='img'
                            />
                        </Grid>
                        <Grid item lg={12}>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

Create.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withStyles(styles)(withRouter(Create))