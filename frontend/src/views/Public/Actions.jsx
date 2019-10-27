import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../BaseView'
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
    Typography
} from '@material-ui/core'
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
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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
                img: 'https://image.thanhnien.vn/660/uploaded/triquang/2017_06_06/cafe1_wjrl.jpg',
                title: 'Cùng tâm sự bên ly cafe sau ngày dài',
                author: 'Hải Anh',
            },
            {
                img: 'https://www.vegiare.com/media/editor/5-ly-do-nen-di-du-lich-nhan-dip-dau-nam-moi.jpg',
                title: 'Cùng nhau đi và trải nghiệm',
                author: 'Hải Anh',
            },
            {
                img: 'https://www.flynow.vn/blog/wp-content/uploads/2017/03/dia-diem-du-lich-cung-ban-than-mytour-12.jpg',
                title: 'Cùng hóng gió bên bờ biển xanh ngát',
                author: 'Hải Anh',
            },
            {
                img: 'https://baodanang.vn/dataimages/201904/original/images1508464_hanami1_660x440.jpg',
                title: 'Lế hội hoa anh đào Japan',
                author: 'Hải Anh',
            },
            {
                img: 'http://a9.vietbao.vn/images/vn899/120/2019/02/20190212-4-quan-ca-phe-board-game-cho-nhung-buoi-tu-tap-cung-ban-be-2.jpg',
                title: 'Cùng bạn bè tụ họp là vui nhất',
                author: 'Hải Anh',
            },
            {
                img: 'https://chungxe.vn/blog/wp-content/uploads/2019/10/Du-l%E1%BB%8Bch-%C4%90%C3%A0-N%E1%BA%B5ng-Th%C3%A1ng-8-68.png',
                title: 'Cuộ đời là những chuyến đi',
                author: 'Hải Anh',
            },
            {
                img: 'https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/5042004610974287437719203074938074149421056-n-1547997037544.jpg',
                title: 'Mộc Châu mùa hoa Mận',
                author: 'Hải Anh',
            },
            {
                img: 'https://statics.vntrip.vn/data-v2/data-guide/img_content/1463729618_ruong-bac-thang-2.jpg',
                title: 'Nơi bình yên và lặng thầm',
                author: 'Hải Anh',
            },
            {
                img: 'https://mb.dkn.tv/wp-content/uploads/2016/09/1470373257_1.jpg',
                title: 'Tự tin và luôn nở nụ cười',
                author: 'Hải Anh',
            }
        ]
        return (
            <div className={classes.root}>
                <GridList cellHeight={200} className={classes.gridList} cols={1} spacing={8} >
                    {
                        tileData.map(tile => {
                            return (
                                <GridListTile key={tile.img}>
                                    <img src={tile.img} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={<span>Đăng bởi: {tile.author}</span>}
                                        actionIcon={
                                            <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                                <Icon>favorite_border</Icon>
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            )
                        })
                    }
                </GridList>
            </div>
        )

    }
}

Actions.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Actions))
