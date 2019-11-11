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
import _ from 'lodash'

const styles = theme => ({
   paper: {
      // padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   },
   card: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   },
   form: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
      // padding: '10px 10px 10px 10px'
   },
   imgZoom: {
      transition: "transform .5s, filter 3s ease-in-out",
      filter: "grayscale(100%)",
   },
   imgZoom: {
      "&:hover": {
         filter: "grayscale(0)",
         transform: "scale(1.1)",
         transitionDuration: "1s",
         transitionTimingFunction: "linear",
      }
   },
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

  
   renderPosts(classes) {
      return (
         <div>
             <p>Presiews</p>
         </div>
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