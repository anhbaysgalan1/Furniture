import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Divider, Drawer, Toolbar, Typography, Icon, Tooltip, Button,  Hidden } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Sidebar from '../components/Main/Sidebar'
import routes from 'config/routes.jsx'
import { Switch, Route, withRouter } from 'react-router-dom'
import Loading from 'containers/Loading/Loading'
import LoadingComponent from 'components/Progress/Loading'
import Notistack from 'components/Snackbars/Notistack'
import http from 'helpers/http'
import AccessDenied from 'components/Pages/AccessDenied'
import LogOut from './components/LogOut'
import ProfileMenu from './components/ProfileMenu'
import DrawerMobileMenu from './components/DrawerMobileMenu'
import Footer from '../public/Footer'
import HomeIcon from '@material-ui/icons/Home'
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'

const styles = theme => ({
   root: {
      display: 'flex',
   },
   grow: {
      flexGrow: 1,
   },
   toolbarMenu: {
      marginLeft: '100px',
      [theme.breakpoints.down('md')]: {
         marginLeft: '0px',
      },

   },
   drawer: {
      [theme.breakpoints.up('md')]: {
         width: theme.drawerWidth,
         flexShrink: 0,
      },
   },
   appBar: {
      // marginLeft: theme.drawerWidth,
      [theme.breakpoints.up('md')]: {
         // width: `calc(100% - ${theme.drawerWidth}px)`,
      },
   },
   menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   menuLogout: {
      marginLeft: -12,
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
   },
   content: {
      flexGrow: 1,
      padding: `0px 0px 0px 0px`,
      width: `calc(100% - ${theme.drawerWidth}px)`,
      [theme.breakpoints.up('md')]: {
         // padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px 0px`,
      },
   },
   Typography: {
      paddingRight: `${theme.spacing.unit * 3}px`,
      marginLeft: `${theme.spacing.unit * 2}px`
   },
   top_buttom_image: {
      position: 'fixed',
      bottom: '5px',
      right: "5px",
      clip: "inherit",
      top: "expression(document.documentElement.scrollTop + document.documentElement.clientHeight-this.clientHeight)",
      left: "expression(document.documentElement.scrollLeft + document.documentElement.clientWidth - offsetWidth)"
   }
})

class Main extends React.Component {
   constructor(props) {
      super(props)
      http.initOnce(props)
      this.state = {
         mobileOpen: false,
         open: false,
      }
   }

   onLogout = () => {
      localStorage.clear()
      this.props.history.push('/admin')
   }

   handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }))
   }

   renderRoutes(routes) {
      let result = []
      let index = 0
      for (let route of routes) {
         result.push(<Route
            key={index++}
            path={route.path}
            hidden={route.hidden}
            exact={route.exact || route.children ? true : false}
            name={route.name}
            component={() => this.renderComponent(route)}
         />)
      }
      return result
   }

   renderLoading() {
      return (
         <LoadingComponent show={true} />
      )
   }

   renderComponent(route) {
      const { classes, theme } = this.props
      const title = typeof route.title === "function" ? route.title() : ""
      const Component = route.component
      const user = JSON.parse(localStorage.getItem('user'))
      document.title = title
      return <div className={classes.root}>
         <AppBar  position="fixed" className={classes.appBar} color="primary" >
            <Hidden smUp>
               <Toolbar variant='dense'>
                  <DrawerMobileMenu route={route} />
                  <div id='top_buttom_image'>
                     <a href='javascript:top.window.scrollTo(0,0)' title='Lên đầu trang'>
                        <HomeIcon className={classes.top_buttom_image} style={{ fontSize: '40px' }} />
                     </a><br />
                  </div>
               </Toolbar>
            </Hidden>
            <Hidden xsDown>
               <Toolbar variant='dense' className={classes.toolbarMenu}>
                  <Sidebar route={route} />
                  {/* <DrawerMobileMenu route={route} />
                    <div id='top-buttom_image'>
                        <a href='javascript:top.window.scrollTo(0,0)' title='Lên đầu trang'>
                            <HomeIcon className={classes.top_buttom_image} style={{ fontSize: '40px' }} />
                        </a><br />
                    </div> */}
               </Toolbar>
            </Hidden>
         </AppBar>
         {/* <nav className={classes.drawer}>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{ paper: classes.drawerPaper, paperAnchorLeft: classes.paperAnchorLeft }}
                        variant="permanent" open
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <Sidebar route={route} />
                    </Drawer>
                </Hidden>
            </nav> */}
         <main className={classes.content}>
            <div className={classes.toolbar} style={{ marginTop: '-15px' }}>    </div>
            <Suspense fallback={this.renderLoading()}>
               <Component route={route} />
            </Suspense>
            <br></br>
            {/* <Footer/> */}
         </main>
      </div>
   }
   render() {
      return (
         <React.Fragment>
            <Switch>
               {this.renderRoutes(routes)}
            </Switch>
            <Loading />
            <Notistack />
         </React.Fragment>
      )
   }
}

Main.propTypes = {
   classes: PropTypes.object.isRequired,
   container: PropTypes.object,
   theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(withRouter(Main))