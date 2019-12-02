import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import InfoIcon from '@material-ui/icons/Info'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../../BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
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
   Hidden,

} from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
   },
   gridList: {
      flexWrap: 'nowrap',
      // height: '500px',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
   },
   title: {
      color: theme.palette.primary.light,
   },
   titleBar: {
      background:
         'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
   },
})


class Actions extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
      }
   }

   render() {
      let { classes } = this.props
      let tileData = [
         {
            img: 'http://bizweb.dktcdn.net/100/060/966/products/giuong-ngu-go-cao-cap-tai-ha-noi-10.jpg?v=1462982150370',
            title: 'Giường gỗ tự nhiên',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2018/09/04/5b8e559546990_1536054677.jpg',
            title: 'Bàn phòng khách',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg',
            title: 'Thiết kế nội thất',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'http://bizweb.dktcdn.net/100/060/966/products/giuong-ngu-go-cao-cap-tai-ha-noi-10.jpg?v=1462982150370',
            title: 'Giường gỗ tự nhiên',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2018/09/04/5b8e559546990_1536054677.jpg',
            title: 'Bàn phòng khách',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg',
            title: 'Thiết kế nội thất',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'http://bizweb.dktcdn.net/100/060/966/products/giuong-ngu-go-cao-cap-tai-ha-noi-10.jpg?v=1462982150370',
            title: 'Giường gỗ tự nhiên',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2018/09/04/5b8e559546990_1536054677.jpg',
            title: 'Bàn phòng khách',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg',
            title: 'Thiết kế nội thất',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'http://bizweb.dktcdn.net/100/060/966/products/giuong-ngu-go-cao-cap-tai-ha-noi-10.jpg?v=1462982150370',
            title: 'Giường gỗ tự nhiên',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://cdn.muabannhanh.com/asset/frontend/img/gallery/2018/09/04/5b8e559546990_1536054677.jpg',
            title: 'Bàn phòng khách',
            author: 'Mạnh Nhẫn',
         },
         {
            img: 'https://www.noithathoanmy.com.vn/blog/wp-content/uploads/2018/11/noi-that-go-phong-khach-dep.jpg',
            title: 'Thiết kế nội thất',
            author: 'Mạnh Nhẫn',
         },

      ]
      return (
         <div className={classes.root}>
            <Hidden smUp>
               <GridList className={classes.gridList} cols={2}>
                  {
                     tileData.map((tile, index) => (
                        <GridListTile key={index}>
                           <img src={tile.img} alt={tile.title} />
                           <GridListTileBar
                              title={tile.title}
                              classes={{ root: classes.titleBar, title: classes.title }}
                              actionIcon={
                                 <IconButton aria-label={`star ${tile.title}`}>
                                    <StarBorderIcon className={classes.title} />
                                 </IconButton>
                              }
                           />
                        </GridListTile>
                     ))
                  }
               </GridList>
            </Hidden>
            <Hidden xsDown >
               <Hidden mdUp>
                  <GridList className={classes.gridList} cols={4}>
                     {tileData.map((tile, index) => (
                        <GridListTile key={index}>
                           <img src={tile.img} alt={tile.title} />
                           <GridListTileBar
                              title={tile.title}
                              classes={{
                                 root: classes.titleBar,
                                 title: classes.title,
                              }}
                              actionIcon={
                                 <IconButton aria-label={`star ${tile.title}`}>
                                    <StarBorderIcon className={classes.title} />
                                 </IconButton>
                              }
                           />
                        </GridListTile>
                     ))}
                  </GridList>
               </Hidden>
               <Hidden smDown>
                  <GridList className={classes.gridList} cols={8}>
                     {tileData.map((tile, index) => (
                        <GridListTile key={index}>
                           <img src={tile.img} alt={tile.title} />
                           <GridListTileBar
                              title={tile.title}
                              classes={{
                                 root: classes.titleBar,
                                 title: classes.title,
                              }}
                              actionIcon={
                                 <IconButton aria-label={`star ${tile.title}`}>
                                    <StarBorderIcon className={classes.title} />
                                 </IconButton>
                              }
                           />
                        </GridListTile>
                     ))}
                  </GridList>
               </Hidden>
            </Hidden>
         </div>
      )

   }
}

Actions.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Actions))
