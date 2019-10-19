import React from 'react';
import Button from '@material-ui/core/Button'
import { I18n } from 'react-redux-i18n'
import LogOutDialog from './LogOutDialog'
export default class ProfileMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    onShow = () => {
        this.setState({ open: true })
    }
    onHide = () => {
        this.setState({ open: false })
    }
    render() {
        return (
            <div>
                <Button variant="contained"  color="primary" type="button" onClick={this.onShow}>
                    {I18n.t("Button.logout")}
                </Button>
                <LogOutDialog onLogout = {this.props.onLogout} onHide = {this.onHide} open = {this.state.open}/>
            </div>
        )
    }

}