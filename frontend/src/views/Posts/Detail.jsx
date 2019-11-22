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
import Header from '../Public/Header/Header'
import What from '../Public/What'
import Home from '../Public/Home'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'
import moment from 'moment'

const styles = theme => ({
   card: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   }
})

class Create extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
         arrItem: [
            {
               content: [{ item: '1' }],
            },
         ],
      }
   }

   componentWillReceiveProps(nextProps) {
      let dataItem = _.get(nextProps, 'data.data', [])
      this.setState({ arrItem: dataItem })
      this.setState({ reload: !this.state.reload })
   }

   renderPosts(classes) {
      let { data } = this.props
      let { arrItem } = this.state
      let title = _.get(data, 'title', '')
      let image = _.get(data, 'image', '')
      let contentStart = _.get(data, 'contentStart', '')
      let contentEnd = _.get(data, 'contentEnd', '')
      let number = _.get(data, 'number', '')
      let summary = _.get(data, 'summary', '')
      let dataItem = _.get(data, 'data', []) || []
      return (
         <CardContent style={{ textAlign: 'justify' }} className={classes.card}>
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
               { image == '' ? '' : <img src={image} height="70%" width='70%' alt='Nội thất Dodo' />}
            </center>
            {
               dataItem.map((element, index) => {
                  let title = _.get(element, 'title', '')
                  let image = _.get(element, 'image', '')
                  let content = _.get(element, 'content', [])
                  return (
                     <span>
                        <Typography variant='h5'>
                           {title}
                        </Typography>
                        <center>
                           { image == '' ? "" :  <img src={image} height="70%" width='70%' alt='Nội thất Dodo' /> }
                        </center>
                        <ul>
                           {
                              content.map((_element, _index) => {
                                 let listConten = _.get(_element, 'listConten', '')
                                 return (
                                    <li>
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
      let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
      return (
         <div>
            <Header classes={classes} />
            <br></br>
            <Home classes={classes} img={img} />
            <br></br>
            <Grid container spacing={32}>
               <Grid item xs={1}></Grid>
               <Grid item xs={10}>
                  {
                     this.renderPosts(classes)
                  }
               </Grid>
               <Grid item xs={1}></Grid>
            </Grid>
         </div>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))