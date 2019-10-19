import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { I18n } from 'react-redux-i18n';

const styles = theme => ({
    root: {
        display: theme.spacing.unit * 4,
    },
    content: {
        paddingTop: '30vh',
        textAlign: 'center'
    }
});
class NotFound extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { classes } = this.props
        return (
            // <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={8}
                    // className = {fixGrid}
                >
                    <Grid
                        item
                        lg={6}
                        xs={12}
                    >
                        <div className={classes.content}>
                            <Typography variant="h4">
                                {I18n.t('NotFound.title')}
                                
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            // </div>
        )
    }

}
export default withStyles(styles, { withTheme: true })(NotFound);

