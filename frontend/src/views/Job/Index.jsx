import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Phone from '@material-ui/icons/Phone'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import {
    Form,
    TextField,
    DateTimeField,
    Validation,
    CheckboxField
} from 'components/Forms'
import {
    Icon,
    Tooltip,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import Tabs from './Tabs'
import InputCV from '../Public/InputCV'
import Header from '../Public/Header/Header'
import moment from 'moment'
import _ from 'lodash'


const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    }
});

class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { classes } = this.props
        return (
            <div>
                <Card> 
                    <CardContent> 
                        <Header classes={classes} />
                    </CardContent>
                    <br></br>
                </Card>
                <Card showLoading={true}>
                    <Tabs />
                    <CardActions>
                        <Button color='primary' variant='contained'>
                            Thêm công việc
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))