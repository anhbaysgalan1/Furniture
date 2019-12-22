import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import { withStyles } from '@material-ui/core/styles'
import { sidebar } from 'config/sidebar'
import routes from 'config/routes'
import permission from 'helpers/permission'
import Divider from '@material-ui/core/Divider'
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Typography, Tabs, Hidden } from '@material-ui/core'

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
   buttonSidebar: {
      marginLeft: '20px',
      fontSize: '16px',
      display: 'inline',
      textDecoration: "none",
      [theme.breakpoints.down('sm')]: {
         fontSize: '12px',
         display: 'inline',
         textDecoration: "none",
      },
      "&:hover": {
         filter: "grayscale(0)",
         color: '#76ff03',
         transitionTimingFunction: "linear",
      }
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

   findRouteByName(routeName) {
      return routes.filter(route => route.name === routeName)[0]
   }

   renderMenuLink(menu, key, classesDefault) {
      const { classes, route } = this.props
      let isActive = (route.sidebarName === menu.name)
      let menuRoute = this.findRouteByName(menu.route)
      if (!menuRoute && !menu.path) {
         throw Error(`Not found Route: menu.route in config/routes.jsx`)
      }
      menuRoute = menuRoute || {} //handle undefined
      const path = menuRoute.path || menu.path
      return (
         <span key={key} >
            <Hidden smUp>
               <ListItem
                  button
                  component={NavLink}
                  to={path}
                  key={key}
                  className={`${classesDefault} ${classes.listItem} ${isActive ? classes.listItemActive : ''}`}
               >
                  <ListItemText
                     primary={menu.title}
                     classes={{
                        root: `${classes.listItemTextRoot}`,
                        primary: `${classes.listItemTextPrimary} ${isActive ? classes.listItemTextPrimaryActive : ''}`
                     }}
                  />
               </ListItem>
            </Hidden>
            <Hidden xsDown>
               <Typography
                  key={key}
                  to={path}
                  className={classes.buttonSidebar}
                  component={NavLink}
                  color='inherit'
               >
                  {menu.title}
               </Typography>
            </Hidden>
         </span>
      )
   }

   // checkManage(){
   //    try {
   //       let token = localStorage.getItem('token')
   //       var base64Url = token.split('.')[1]
   //       var base64 = base64Url.replace('-', '+').replace('_', '/')
   //       let decodedToken = JSON.parse(window.atob(base64))
   //       var dateNow = new Date()
   //       if (decodedToken.exp && decodedToken.exp < dateNow.getTime())
   //         return true
   //    } catch (e) {
   //       // return false
   //    }
   //    return true
   // }

   renderMenu(sidebar) {
      let result = []
      let index = 0
      for (let item of sidebar) {
         result.push(this.renderMenuLink(item, index++))
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

export default withStyles(styles)(withRouter(sidebar))