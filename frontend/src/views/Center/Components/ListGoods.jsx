import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import withStyles from '@material-ui/core/styles/withStyles'
import BaseView from 'views/BaseView'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
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
    CardActionArea,
    CardMedia,
    Avatar,
} from '@material-ui/core'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: 300,
    },
    title: {
        padding: '5px',
        backgroundColor: '#039be5',
        color: 'white',
    },
    imgZoom: {
        transition: "transform .5s, filter 3s ease-in-out",
        filter: "grayscale(100%)",
    },
    imgZoom: {
        "&:hover": {
            filter: "grayscale(0)",
            backgroundColor: 'red',
            transform: "scale(1.1)",
            transitionDuration: "1s",
            transitionTimingFunction: "linear",
        }
    }
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { classes } = this.props
        return (
           <div>
                <Typography variant='h6' className={classes.title}> 
                    Danh mục sản phẩm
                </Typography>
                <List component="nav"  className={classes.root}  aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText color='primary' primary="Giường ngủ" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemText primary="Bàn ăn" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Bàn trang điểm" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Bàn phòng khách" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Kệ tivi" />
                </ListItem>
            </List>
           </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))
