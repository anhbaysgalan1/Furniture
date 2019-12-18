import React from 'react'
import PropTypes from 'prop-types'
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
import Home from './Components/Home'
import Circle from './Components/Circle'
import ButtonViews from './Components/ButtonViews'
import What from '../Public/What'
import NewHot from './Components/NewHot'
import Footer from './Components/Footer'
import Promotion from '../Public/Promotion'
import List from './Components/List'
import Partner from '../Public/Partner'
import PostsList from '../Posts/List'
import { 
   titleBad, 
   titleTableEat, 
   titleWardrobe,
   titleTableLivingRoom,
   titleShoesCabinet,
   titleTVCabinet,
   titleTableRestaurant,
} from '../../config/constant'
import Tabs from '../Tabs/Tabs'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
   // paddingIndex: {
   //     [theme.breakpoints.down('sm')]: {
   //         padding: '8px',
   //     },
   // }
})

class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
      }
   }

   typeGoods(goods = []){
      let bads = [] // giương
      let tableEat = [] // bàn ăn
      let wardrobe = [] // Tu quan ao wardrobe
      let tableLivingRoom = [] // bàn phong khách
      let shoesCabinet = [] // Tu giay
      let tvCabinet = [] // kệ tivi
      let tableRestaurant = [] // bàn nhà hàng

      goods.map((item, index) => {
         let typeGoods = _.get(item, 'typeGoods', '')
         switch(typeGoods){
            case '0':
               bads.push(item)
               break
            case '1':
               tableEat.push(item)
               tableRestaurant.push(item)
               break
            case '2':
               wardrobe.push(item)
               break
            case '3':
               tableLivingRoom.push(item)
               break
            case '4':
               shoesCabinet.push(item)
               break
            case '5':
               tvCabinet.push(item)
               break
            case '6':
               // tableRestaurant.push(item)
               break
         }
      })

      return {
         bads: bads, // giương
         tableEat: tableEat,  // bàn ăn
         wardrobe: wardrobe,  // Tu quan ao wardrobe
         tableLivingRoom: tableLivingRoom,  // bàn phong khách
         shoesCabinet: shoesCabinet,  // Tu giay
         tvCabinet: tvCabinet, // kệ tivi
         tableRestaurant: tableRestaurant, // bàn nhà hàng
      }
   }

   render() {
      let { classes, posts, goods = [], onSubmit } = this.props
      let bads = this.typeGoods(goods).bads
      let tableEat = this.typeGoods(goods).tableEat
      let wardrobe = this.typeGoods(goods).wardrobe
     
      let tableLivingRoom = this.typeGoods(goods).tableLivingRoom
      let shoesCabinet = this.typeGoods(goods).shoesCabinet
      let tvCabinet = this.typeGoods(goods).tvCabinet
      let tableRestaurant = this.typeGoods(goods).tableRestaurant
      console.log("tableRestaurant >>>> ", tableRestaurant)
      return (
         <div>
            {/* <Header classes={classes} />
            <Home classes={classes} />
            <ButtonViews classes={classes} />
            <br></br>
            <What classes={classes} />
            <Circle classes={classes} />
            <br></br>
            <Partner classes={classes} />
            <NewHot classes={classes} />
            <br></br>
            <Promotion classes={classes} /> */}
            <br></br>
            <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleBad} goods={bads} />
            {/* <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTableEat} goods={tableEat} />
            <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleWardrobe} goods={wardrobe} />
            <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTableLivingRoom} goods={tableLivingRoom} />
            <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleShoesCabinet} goods={shoesCabinet} />
            <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTVCabinet} goods={tvCabinet} />
            <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTableRestaurant} goods={tableRestaurant} /> */}
            <br></br>
            <List classes={classes} />
            <PostsList posts={posts} classes={classes} />
            <Footer classes={classes} />
         </div>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))