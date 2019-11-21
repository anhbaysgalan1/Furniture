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
   CardActionArea,
   CardMedia,

} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

let typeGoods = [
   {
      name: "Giường ngủ",
      _id: '0'
   },
   {
      name: "Tủ Quần áo",
      _id: '1'
   },
   {
      name: "Bàn phòng khách",
      _id: '2'
   },
   {
      name: "Bàn trà",
      _id: '3'
   },
   {
      name: "Tủ giày",
      _id: '4'
   }
]
let typeItem = [
   {
      name: "Giường gỗ tự nhiên",
      value: '1'
   },
   {
      name: "Giường gỗ công nghiệp",
      value: '2'
   },
   {
      name: "Giường gỗ cổ điển",
      value: '3'
   },
   {
      name: "Giường gỗ hiện đại",
      value: '4'
   }
]
let typeWoods = [
   {
      name: 'Tự nhiên cao cấp',
      value: 'TN',
   },
   {
      name: 'Công nghiệp',
      value: 'CN',
   },
   {
      name: 'Sồi Nga',
      value: 'SN',
   },
   {
      name: 'Xoan đào',
      value: 'XS',
   }
]
let promotions = [
   {
      name: 'Không',
      value: '0'
   },
   {
      name: 'Có',
      value: '1'
   }
]

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
      let { classes, dataInput } = this.props
      let { indexButton } = this.state
      let code = _.get(dataInput, 'code', '')
      let name = _.get(dataInput, 'name', '')
      let moneyNew = _.get(dataInput, 'moneyNew', '')
      let moneyOld = _.get(dataInput, 'moneyOld', '')
      let image1 = _.get(dataInput, 'image1', '')
      let image2 = _.get(dataInput, 'image2', '')
      let image3 = _.get(dataInput, 'image3', '')
      let image4 = _.get(dataInput, 'image4', '')
      let images = [{ img: image1 }, { img: image2 }, { img: image3 }, { img: image4 }]
      return (
         <div>
            <Grid container spacing={8}>
               <Grid item xs={7}>
                  <center>
                     <img src={images[indexButton].img} height='450' width='550' />
                     <Typography variant='h4'>
                        {indexButton}
                     </Typography>
                     <br></br>
                     {
                        images.map((item, index) => {
                           return (
                              <Button
                                 key={index}
                                 style={{ backgroundColor: index == indexButton ? '#eeff41' : '', padding: '2px' }}
                                 onClick={() => this.setIndex(index)}
                              >
                                 <img key={index} src={item.img} height='50' width='80' />
                              </Button>
                           )
                        })
                     }
                  </center>
               </Grid>
               <Grid item xs={5}>
               <center>
                  {
                     image1 ? <img src={image1} alt="Nội thất Dodo" height='120' width='180' title={`${name} - ${code}`} /> : ''
                  }
                  {
                     name ? <Typography color='primary' variant='h6'> {name} </Typography> : ''
                  }
                  {
                     moneyNew ? <Typography style={{ color: 'red' }}> {moneyNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} </Typography> : ''
                  }
                  {
                     moneyOld ? <del> <Typography> {moneyOld.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} </Typography> </del> : ''
                  }
               </center>
                  Thông tin giới thiệu hàng
               </Grid>
            </Grid>
         </div>
      )
   }
}


App.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))