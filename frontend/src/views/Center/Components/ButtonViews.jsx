import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import { IconButton, Icon, Tooltip, Button, Card, CardActions, CardContent } from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import bad from '../../../public/bad.jpg'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'

const styles = theme => ({
    button: {
        marginRight: '5px'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `3px 4px 5px 5px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
})


class ButtonViews  extends BaseView {
    constructor(props) {
        super(props)
    }
    
    render (){
        const images = [
            {
                url: 'http://thicongdogohanoi.com/wp-content/uploads/2016/03/nhu-y-tay-hop-6mon.jpg',
                title: 'Uy tín chất lượng',
                width: '30%',
            },
            {
                url: 'http://noithatgiadinhbinhduong.com/wp-content/uploads/2017/09/gi%C6%B0%E1%BB%9Dng-g%C3%B5-%C4%91%E1%BB%8F.jpg',
                title: 'Đẳng cấp hoàng gia',
                width: '30%',
            },
            {
                url: 'https://i2.wp.com/dogoquoccuong.com/wp-content/uploads/2014/08/DSC09545.jpg?fit=3008%2C2000&ssl=1',
                title: 'Chất lượng đạt chuẩn xuất khẩu',
                width: '40%',
            },
        ]
        const { classes } = this.props 
        return (
            <div className={classes.root}>
                {images.map(image => (
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: image.width,
                        }}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.title}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}
            </div>
        )
    }
}


ButtonViews.propTypes = {
    classes: PropTypes.object.isRequired,
}
                                    
export default withStyles(styles)(withRouter(ButtonViews))
