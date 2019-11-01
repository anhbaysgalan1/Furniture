import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import sidebar from '../../config/sidebar'
import routes from 'config/routes'
import permission from 'helpers/permission'
import Divider from '@material-ui/core/Divider';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Typography, Tabs } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    listItem: {
        margin: "10px 15px",
        borderRadius: "3px",
        width: "auto",
        transition: "all 300ms linear",
    },
    listItemTextPrimary: {
        fontSize: '14px',
        fontWeight: 300,
        color: '#000'
    },
    listItemTextRoot: {
        padding: "0px"
    },
    listItemActive: {
        '&:hover': {
            color: '#fff !important',
            background: theme.palette.primary.main,
        },
        color: '#fff !important',
        background: theme.palette.primary.main,
        boxShadow: "0 12px 20px -10px rgba(100, 181, 246, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(100, 181, 246, 0.2)"
    },
    listItemTextPrimaryActive: {
        fontWeight: 400,
        color: '#fff'
    },
    listItemIconActive: {
        color: '#fff'
    },
})

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: {
            }
        }
    }
    
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    }

    findRouteByName(routeName) {
        return routes.filter(route => route.name === routeName)[0]
    }

    renderSubMenu(menuList, key) {
        const { classes } = this.props;
        let result = []
        let index = 0;
        for (let menu of menuList) {
            result.push(this.renderMenuLink(menu, index++, classes.nested))
        }
        return (
            <Collapse in={this.state.expand[key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {result}
                </List>
            </Collapse>
        )
    }

    renderMenuLink(menu, key, classesDefault) {
        const { classes, route } = this.props
        let isActive = (route.sidebarName === menu.name)
        let menuRoute = this.findRouteByName(menu.route)
        if (!menuRoute && !menu.path) {
            throw Error(`Not found Route: menu.route in config/routes.jsx`)
        }
        menuRoute = menuRoute || {} //handle undefined
        let roleRequired = menuRoute.role
        if (!permission.hasPermission(roleRequired)) {
            return
        }
        const path = menuRoute.path || menu.path
        // return (
        //     <ListItem
        //         button
        //         component={NavLink}
        //         to={path}
        //         key={key}
        //         className={`${classesDefault} ${classes.listItem} ${isActive ? classes.listItemActive : ''}`}
        //     >
        //         <ListItemText
        //             primary={menu.title}
        //             classes={{
        //                 root: `${classes.listItemTextRoot}`,
        //                 primary: `${classes.listItemTextPrimary} ${isActive ? classes.listItemTextPrimaryActive : ''}`
        //             }}
        //         />
        //     </ListItem>
        // )
        return (
            <Button
                style={{ marginLeft: '10px', fontSize: '14px' }}
                size="small"
                key={key}
                to={path}
                component={NavLink}
                color='inherit'
            >
                {menu.title}
            </Button>
        )
    }

    renderMenuWithChildren(menu, key) {
        const { classes } = this.props
        const isShow = this.state.expand[key] == null ? false : this.state.expand[key]
        return (
            <div key={key} >
                <ListItem
                    button
                    onClick={() => { this.setState({ expand: { ...this.state.expand, [key]: !isShow } }) }}
                    className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        {menu.icon || <StarBorder />}
                    </ListItemIcon>
                    <ListItemText
                        primary={menu.title}
                        classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}
                    />
                    {isShow ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {this.renderSubMenu(menu.children, key)}
            </div>
        )
    }

    renderMenu(sidebar) {
        let result = []
        let index = 0
        for (let menu of sidebar) {
            if (menu.children && menu.children.length > 0) {
                result.push(this.renderMenuWithChildren(menu, index++))
            } else {
                result.push(this.renderMenuLink(menu, index++))
            }
        }
        return result
    }

    render() {
        return (
            <List>
                {this.renderMenu(sidebar)}
            </List>
        )
    }
}

export default withStyles(styles)(withRouter(Sidebar))