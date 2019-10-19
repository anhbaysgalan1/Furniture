import React from 'react'
import { I18n } from 'react-redux-i18n'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import PaperFade from "components/Main/PaperFade"
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import {
    Button,
    Icon,
    AppBar,
    IconButton,
    Toolbar,
    Card,
    CardContent,
    Grid,
    CardActions,
    CardHeader,
    DialogContent,
    DialogTitle,
    DialogActions,
    Dialog,
    Typography,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

class DialogEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
        this.onCancel = this.onCancel.bind(this)
        this.show = this.show.bidn(this)
        this.hide = this.hide.bind(this)
    }

    show(){
        this.setState({open: true})
    }
    hide() {
        this.setState({ open: false })
    }

    onCancel() {
        const { onCancel } = this.props
        this.hide()
    }

    render() {
        let { classes } = this.props
        let { data } = this.state
        return (
            <Card>
                <Button variant="outlined" color="primary" onClick={() => this.onShow()}>
                    Open alert dialog
                </Button>
                <Dialog
                    fullWidth={true}
                    onClose={this.onCancel}
                    open={this.state.open}
                    maxWidth='sm'
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle>

                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="h6">
                            <p>Nội dung Dialog Content</p>
                        </Typography>
                    </DialogContent>
                </Dialog>
            </Card>
        )
    }
}

export default withStyles(styles)(DialogEvent) 