import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from '@material-ui/core/Fab'
import LogOutDialog from './LogOutDialog'
import { Icon, Tooltip } from '@material-ui/core'
import { I18n } from 'react-redux-i18n'

export default class ProfileMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            dialogOpen: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleClose() {
        this.setState({
            anchorEl: null
        })
    }

    onShow = () => {
        this.setState({ 
            anchorEl: null,
            dialogOpen: true 
        })
    }

    onHide = () => {
        this.setState({ dialogOpen: false })
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user')) || {}
        return (
            <div>
                <Fab onClick={this.handleClick} aria-controls="simple-menu" color="secondary" size="small" aria-label="Edit">
                    <Icon>account_box</Icon>
                </Fab>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>{user.name}</MenuItem>
                    <MenuItem onClick={this.onShow}>{I18n.t("Button.logout")}</MenuItem>
                </Menu>
                <LogOutDialog onLogout = {this.props.onLogout} onHide = {this.onHide} open = {this.state.dialogOpen}/>
            </div>
        )
    }

}