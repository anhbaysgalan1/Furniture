import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, DateTimeField, Validation, CheckboxField } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import { withRouter } from 'react-router-dom'
import PaperFade from "components/Main/PaperFade"
import {
   Tab,
   AppBar,
   Paper,
   Icon,
   IconButton,
   Tabs,
   Typography,
   Button,
   Grid,
   Toolbar,
   Card,
   CardActions,
   CardContent
} from '@material-ui/core'
import TabGoods from './Components/Tab'
import _ from 'lodash'

const styles = theme => ({

})

function TabContainer(props) {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
         {props.children}
      </Typography>
   )
}

function LinkTab(props) {
   return (
      <Tab
         style={{ background: '#0099ff', color: 'white' }}
         fullWidth={true}
         component="a"
         onClick={event => { event.preventDefault() }}
         {...props}
      />
   )
}

function NavTabs(data) {
   const [value, setValue] = React.useState(0)
   function handleChange(event, newValue) {
      setValue(newValue)
   }
   let classes = _.get(data, 'classes', '')
   let onSubmit = _.get(data, 'onSubmit', '')
   let goods = _.get(data, 'goods', [])
   let titleTabs = _.get(data, 'titleTabs', []) || []
   return (
      <div>
         <AppBar position="static" color="default">
            <Paper square component='div'>
               <Tabs 
                  textColor="primary" 
                  indicatorColor="primary" 
                  value={value} variant='fullWidth'
                  onChange={handleChange} 
                  aria-label="icon tabs example"
               >
                  { titleTabs.map((item, index) => <Tab key={index} label={item.label} /> ) }
               </Tabs>
            </Paper>
         </AppBar>
         <div>
            {
               titleTabs.map((item, index) => 
                  value == index && <TabContainer key={index} > 
                     <TabGoods classes={classes} tabBad={item.tabBad} onSubmit={onSubmit} goods={goods} /> 
                  </TabContainer>
               )
            }
         </div>
      </div>
   )
}

class Create extends BaseView {
   constructor(props) {
      super(props)
   }
   render() {
      const { classes, onSubmit, goods, titleTabs = [] } = this.props
      return (
         <PaperFade >
            <Grid container spacing={32}>
               <Grid item lg={1}></Grid>
               <Grid item lg={10}>
                  <NavTabs
                     classes={classes}
                     onSubmit={onSubmit}
                     goods={goods}
                     titleTabs={titleTabs}
                  />
               </Grid>
               <Grid item lg={1}></Grid>
            </Grid>
         </PaperFade>
      )
   }
}

TabContainer.propTypes = {
   children: PropTypes.node.isRequired,
}

export default withStyles(styles)(withRouter(Create))