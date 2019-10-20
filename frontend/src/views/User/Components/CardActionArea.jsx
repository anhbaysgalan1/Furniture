import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import { IconButton, Icon, Tooltip, Button, Card, CardActions, CardContent, CardActionArea, CardMedia } from '@material-ui/core'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'

const styles = theme => ({
    card: {
        maxWidth: 300,
    },
})


class ButtonViews extends BaseView {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="180"
                        image="https://dongphucsaoviet.vn/hoanghung/0/images/ext(1).jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
                <br></br>
            </Card>
        
        )
    }
}


ButtonViews.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(ButtonViews))
