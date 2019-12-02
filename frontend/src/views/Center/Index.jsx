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
import ListGoods from './Components/ListGoods'
import List from './Components/List'
import Partner from '../Public/Partner'
import PostsList from '../Posts/List'
import Tabs from '../Tabs/Tabs'
import moment from 'moment'
import _ from 'lodash'

let titleBad = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Giường gỗ hiện đại",
      tabBad: '0'
   },
   {
      label: "Giường gỗ cổ điển",
      tabBad: '1'
   },
   {
      label: "Giường gỗ tự tiên",
      tabBad: '2'
   },
   {
      label: "Giường gỗ công nghiệp",
      tabBad: '3'
   },
]
let titleTableEat = [
    {
        label: "Tất cả",
        tabBad: 'all'
    },
    {
        label: "Bàn ăn hiện đại",
        tabBad: '0'
    },
    {
        label: "Bàn ăn cổ điển",
        tabBad: '1'
    },
    {
        label: "Bàn ăn hiện đại 4 ghế",
        tabBad: '2'
    },
    {
        label: "Bàn ăn hiện đại 6 ghế",
        tabBad: '3'
    },
    {
        label: "Bàn ăn hiện đại 8 ghế",
        tabBad: '4'
    },
    {
        label: "Bàn ăn hiện đại tròn",
        tabBad: '5'
    },
]
let titleWardrobe = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Tủ quần áo hiện đại",
      tabBad: '0'
   },
   {
      label: "Tủ quần áo gỗ tự nhiên",
      tabBad: '1'
   },
   {
      label: "Tủ quần áo gỗ công nghiệp",
      tabBad: '2'
   },
   {
      label: "Tủ quần áo nhựa cao cấp",
      tabBad: '3'
   },
]
let titleTableLivingRoom = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Bàn trà phòng khách hiện đại",
      tabBad: '0'
   },
   {
      label: "Bàn trà phòng khách cổ điển",
      tabBad: '1'
   },
]
let titleShoesCabinet = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Tủ quần áo hiện đại",
      tabBad: '0'
   },
   {
      label: "Tủ quần áo gỗ tự nhiên",
      tabBad: '1'
   },
   {
      label: "Tủ quần áo gỗ công nghiệp",
      tabBad: '2'
   },
   {
      label: "Tủ quần áo nhựa cao cấp",
      tabBad: '3'
   },
]
let titleTVCabinet = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Tủ kệ Tivi hiện đại",
      tabBad: '0'
   },
   {
      label: "Tủ kệ tivi cổ điển",
      tabBad: '1'
   },
   {
      label: "Tủ kệ tivi gỗ tự nhiên",
      tabBad: '2'
   },
   {
      label: "Tủ kệ tivi gỗ công nghiệp",
      tabBad: '3'
   },
]
let titleTableRestaurant = [
    {
        label: "Tất cả",
        tabBad: 'all'
    },
    {
        label: "Bàn ăn hiện đại",
        tabBad: '0'
    },
    {
        label: "Bàn ăn cổ điển",
        tabBad: '1'
    },
    {
        label: "Bàn ăn hiện đại 4 ghế",
        tabBad: '2'
    },
    {
        label: "Bàn ăn hiện đại 6 ghế",
        tabBad: '3'
    },
    {
        label: "Bàn ăn hiện đại 8 ghế",
        tabBad: '4'
    },
    {
        label: "Bàn ăn hiện đại tròn",
        tabBad: '5'
    },
]



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
               tableRestaurant.push(item)
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
      console.log("wardrobe0", wardrobe)
      let tableLivingRoom = this.typeGoods(goods).tableLivingRoom
      let shoesCabinet = this.typeGoods(goods).shoesCabinet
      let tvCabinet = this.typeGoods(goods).tvCabinet
      let tableRestaurant = this.typeGoods(goods).tableRestaurant
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
            <Promotion classes={classes} />
            <br></br> */}
            {/* <Grid container spacing={8}>
               <Grid item lg={1}>
                  <ListGoods classes={classes} />
               </Grid>
               <Grid item lg={10}>
                  <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleBad} goods={bads} />
                  <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTableEat} goods={tableEat} />
                  <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleWardrobe} goods={wardrobe} />
                  <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTableLivingRoom} goods={tableLivingRoom} />
                  <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleShoesCabinet} goods={shoesCabinet} />
                  <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTVCabinet} goods={tvCabinet} />
                  <Tabs classes={classes} onSubmit={onSubmit} titleTabs={titleTableRestaurant} goods={tableRestaurant} />
                  <br></br>
               </Grid>
               <Grid item lg={1}></Grid>
            </Grid> */}
            <List classes={classes} />
            {/* <PostsList posts={posts} classes={classes} />
            <Footer classes={classes} /> */}
         </div>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))