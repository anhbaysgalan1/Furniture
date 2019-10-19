import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import Sidebar from '../../components/Main/Sidebar'
const styles = theme => ({
   
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: theme.drawerWidth,
    },
    paperAnchorLeft: {
        borderRight: "none",
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    }
})

class DrawerMobileMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false
        }
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }
    render() {
        let { route, classes, theme } = this.props
        return (
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                    <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden mdUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            onClick={this.handleDrawerToggle}
                            // onBlur={() => this.setState({ mobileOpen: false })}
                        >
                            <div className={classes.toolbar} />
                            <Divider />
                            <Sidebar route={route} />
                        </Drawer>
                    </Hidden>
                </nav>
                </IconButton>
        )
    }
}

DrawerMobileMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(DrawerMobileMenu);