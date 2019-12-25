import React from 'react'
import PropTypes, { element } from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
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
import Header from '../Public/Header/Header'
import What from '../Public/What'
import Home from '../Public/Home'
import Promotion from '../Public/Promotion'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({

})

class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
      }
   }

   renderRelateTo(classes) {
      let { posts = [] } = this.props
      posts = posts.reverse()
      return (
         <div>
            <Grid container spacing={8}>
               <Grid item xs={1}> </Grid>
               <Grid item xs={10}>
                  <Card>
                     <CardContent style={{ textAlign: 'justify' }} >
                        <Typography variant='h5' style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                           TIN TỨC
                        </Typography>
                        <Grid container spacing={16}>
                           {
                              posts.map((element, index) => {
                                 let image = _.get(element, 'image', '')
                                 let title = _.get(element, 'title', '')
                                 let summary = _.get(element, 'summary', '')
                                 let _id = _.get(element, '_id', '')
                                 return (
                                    <Grid item xs={4} key={index} >
                                       <div>
                                          <img
                                             src={image}
                                             height='200'
                                             width='100%'
                                          />
                                          <b>
                                             <Typography> {title} </Typography>
                                          </b>
                                          <i>
                                             <Typography> {summary} </Typography>
                                          </i>
                                       </div>
                                    </Grid>
                                 )
                              })
                           }
                        </Grid>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={1}> </Grid>
            </Grid>
         </div>
      )
   }

   renderNewsHot(classes) {
      let { posts = [] } = this.props
      return (
         <Card>
            <CardContent style={{ textAlign: 'justify' }} >
               <Typography variant='h5' style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                  TIN NỔI BẬT
               </Typography>
               <Grid container spacing={8}>
                  {
                     posts.map((element, index) => {
                        let image = _.get(element, 'image', '')
                        let summary = _.get(element, 'summary', '')
                        let title = _.get(element, 'title', '')
                        let _id = _.get(element, '_id', '')
                        return (
                           <Grid item xs={6} key={index} >
                              <div style={{ padding: '5px' }} onClick={() => this.goto(`/posts/${_id}/detail`)} >
                                 <Grid container spacing={0}>
                                    <Grid item xs={3}>
                                       <img
                                          style={{ padding: '5px' }}
                                          src={image}
                                          height='110'
                                          width='100%'
                                       />
                                    </Grid>
                                    <Grid item xs={9}>
                                       <b>
                                          <Typography> {title} </Typography>
                                       </b>
                                       <Typography> {summary} </Typography>
                                    </Grid>
                                 </Grid>
                                 <hr></hr>
                              </div>
                           </Grid>
                        )
                     })
                  }
               </Grid>

            </CardContent>
         </Card>
      )
   }

   render() {
      let { classes } = this.props
      return (
         <div>
            <Grid container spacing={32} >
               <Grid item xs={1}></Grid>
               <Grid item xs={10}>
                  {
                     this.renderNewsHot(classes)
                  }
                  <br></br>
                  {
                     this.renderRelateTo(classes)
                  }
               </Grid>
               <Grid item xs={1}></Grid>
            </Grid>
            <br></br>
         </div>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))