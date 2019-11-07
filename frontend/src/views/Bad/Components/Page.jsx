import React, { Component } from "react"
import ReactDOM from "react-dom"
import Pagination from "react-js-pagination"
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import FacebookIcon from '@material-ui/icons/Facebook'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    Grid,
    CardContent,
    CardActions,
    Typography,
    AppBar,
    Toolbar,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    title: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
     },
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 1,
        }
    }

    render() {
        return (
            <div>
                <Button color='primary' variant='outlined'> Trước </Button>
                <Button color='primary' variant='outlined'> 1 </Button>
                <Button color='primary' variant='outlined'> 2 </Button>
                <Button color='primary' variant='outlined'> 3 </Button>
                <Button color='primary' variant='outlined'> Sau </Button>
            </div>
        );
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))
// ReactDOM.render(<App />, document.getElementById("root"));