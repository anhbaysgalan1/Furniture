import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import RadioGroupField, { Radio } from 'components/Forms/RadioGroupField'
import FacebookIcon from '@material-ui/icons/Facebook'
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
   DialogTitle,
   Dialog,
   DialogContent,
   DialogContentText,
   DialogActions,
   Toolbar,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
   form: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
   },
})

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         reload: false,
         indexButton: 0,
      }
      this.setIndex = this.setIndex.bind(this)
   }

   setIndex(index) {
      this.setState({ indexButton: index })
      this.setState({ reload: !this.state.reload })
   }

   render() {
      // let { classes } = this.props
      let img = [
         {
            img: 'http://vilahome.com.vn/wp-content/uploads/2018/05/Mau-giuong-da-nang-thong-minh-hien-dai-1.jpg'
         },
         {
            img: 'http://sofabella.vn/wp-content/uploads/2015/03/GIUONG-NGu-B1240.jpg'
         },
         {
            img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg'
         }
      ]
      let { indexButton } = this.state
      return (
         <Card>
            <CardContent>
               <Typography variant="h6">
                  Giường gỗ GG22 - 2.000.000đ
               </Typography>
               <Grid container spacing={8}>
                  <Grid item xs={7}>
                     <center>
                        <img src={img[indexButton].img} height='450' width='550' />
                        <br></br>
                        {
                           img.map((item, index) => {
                              return (
                                 <Button
                                    key={index}
                                    style={{ backgroundColor: index == indexButton ? '#eeff41' : '', padding: '2px' }}
                                    onClick={() => this.setIndex(index)}
                                 >
                                    <img
                                       key={index}
                                       src={item.img}
                                       height='50'
                                       width='80'
                                    />
                                 </Button>
                              )
                           })
                        }
                        <Button color='primary'>
                           Mua hàng
                        </Button>
                     </center>
                  </Grid>
                  <Grid item xs={5}>
                     Thông tin giới thiệu hàng
               </Grid>
               </Grid>
            </CardContent>
         </Card>
      )
   }
}

App.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))