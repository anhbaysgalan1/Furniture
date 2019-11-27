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
import TableEat from './Components/TableEat'
import BadHot from './Components/BadHot'

import PhoneIcon from '@material-ui/icons/Phone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'

import moment from 'moment'
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
   let goodsTableEat = _.get(data, 'goodsTableEat', [])
   return (
      <div>
         <AppBar position="static" color="default">
            <Paper square component='div'>
               <Tabs
                  textColor="primary"
                  indicatorColor="primary"
                  value={value}
                  variant='fullWidth'
                  onChange={handleChange}
                  aria-label="icon tabs example"
               >
                  <Tab label={I18n.t("Worker.Tất cả")} />
                  <Tab label={I18n.t("Worker.Bàn ăn hiện đại")} />
                  <Tab label={I18n.t("Worker.Bàn ăn cổ điển")} />
                  <Tab label={I18n.t("Worker.Bàn ăn hiện đại 4 ghế")} />
                  <Tab label={I18n.t("Worker.Bàn ăn hiện đại 6 ghế")} />
                  <Tab label={I18n.t("Worker.Bàn ăn hiện đại 8 ghế")} />
                  <Tab label={I18n.t("Worker.Bàn ăn hiện đại tròn")} />
               </Tabs>
            </Paper>
         </AppBar>
         <div>
            {value === 0 && <TabContainer> <TableEat classes={classes} tabBad="all" onSubmit={onSubmit} goodsTableEat={goodsTableEat} /> </TabContainer>}
            {value === 1 && <TabContainer> <TableEat classes={classes} tabBad="modern" onSubmit={onSubmit} goodsTableEat={goodsTableEat} /> </TabContainer>}
            {value === 2 && <TabContainer> <TableEat classes={classes} tabBad="classic" onSubmit={onSubmit} goodsTableEat={goodsTableEat} /> </TabContainer>}
            {value === 3 && <TabContainer> <TableEat classes={classes} tabBad="fourChair" onSubmit={onSubmit} goodsTableEat={goodsTableEat} /> </TabContainer>}
            {value === 4 && <TabContainer> <TableEat classes={classes} tabBad="sixChairs" onSubmit={onSubmit} goodsTableEat={goodsTableEat} /> </TabContainer>}
            {value === 5 && <TabContainer> <TableEat classes={classes} tabBad="eightChairs" onSubmit={onSubmit} goodsTableEat={goodsTableEat} /> </TabContainer>}
            {value === 6 && <TabContainer> <TableEat classes={classes} tabBad="circle" onSubmit={onSubmit} goodsTableEat={goodsTableEat} /> </TabContainer>}
         </div>
      </div>
   )
}
class Create extends BaseView {
   constructor(props) {
      super(props)
   }
   render() {
      const { classes, onSubmit, goodsTableEat } = this.props
      return (
         <PaperFade >
            <Grid container spacing={32}>
               <Grid item lg={1}></Grid>
               <Grid item lg={10}>
                  <NavTabs
                     classes={classes}
                     onSubmit={onSubmit}
                     goodsTableEat={goodsTableEat}
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