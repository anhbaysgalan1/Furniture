import React from 'react'
import PropTypes, { element } from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import {
   Grid,
   Typography,
   IconButton,
   Icon,
   Tooltip,
   Card,
   Button,
   CardActionArea,
   CardMedia,
   CardContent,
   CardActions,

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import { withRouter } from 'react-router-dom'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
})

class Create extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
      }
   }
  
   renderPosts(classes) {
      let { data } = this.props
      let title = _.get(data, 'title', '')
      let image = _.get(data, 'image', '')
      let contentStart = _.get(data, 'contentStart', '')
      let contentEnd = _.get(data, 'contentEnd', '')
      let number = _.get(data, 'number', '')
      let summary = _.get(data, 'summary', '')
      let dataItem = _.get(data, 'data', []) || []
      return (
         <CardContent style={{ textAlign: 'justify' }} >
            <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
               {title}
            </Typography>
            <Typography>
               <Icon>calendar_today</Icon> {moment().format('DD/MM/YYYY')} | Lượt xem: {number}
            </Typography>
            <hr></hr>
            <Typography>
               {contentStart}
            </Typography>
            <center>
               { image == 'noImg' ? '' : <img src={image} height="100%" width="100%" alt='Nội thất Dodo' /> }
            </center>
            {
               dataItem.map((element, index) => {
                  let title = _.get(element, 'title', '')
                  let image = _.get(element, 'image', '')
                  let content = _.get(element, 'content', [])
                  return (
                     <span key={index} >
                        <Typography variant='h5'>
                           {title}
                        </Typography>
                        <center>
                           { image == 'noImg' ? "" :  <img src={image} height="100%" width="100%" alt='Nội thất Dodo' /> }
                        </center>
                        <ul>
                           {
                              content.map((_element, _index) => {
                                 let listConten = _.get(_element, 'listConten', '')
                                 return (
                                    <li key={_index}>
                                       <Typography>
                                          {listConten}
                                       </Typography>
                                    </li>
                                 )
                              })
                           }
                        </ul>
                     </span>
                  )
               })
            }
            <Typography>
               {contentEnd}
            </Typography>
         </CardContent>
      )
   }

   render() {
      const { classes } = this.props
      return (
         <div>
            {
               this.renderPosts(classes)
            }
         </div>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))