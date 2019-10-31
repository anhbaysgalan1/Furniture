import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, DateTimeField, Validation, CheckboxField } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import { withRouter } from 'react-router-dom'
import PaperFade from "components/Main/PaperFade"
import { Tab, AppBar, Tabs, Typography, Button, Grid, Card, CardActions, CardContent } from '@material-ui/core'
import Bad from './Components/Bad'
import BadIndustry from './Components/BadIndustry'
import BadNature from './Components/BadNature'
import BadModern from './Components/BadModern'
import BadClassic from './Components/BadClassic'
import BadHot from './Components/BadHot'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({

})



function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    )
}

function LinkTab(props) {
    return (
        <Tab
            style={{ background: '#0099ff', color: 'white' }}
            fullWidth={true}
            component="a"
            onClick={event => { event.preventDefault() }}
            {...props}
        />
    )
}

function NavTabs(data) {
    const [value, setValue] = React.useState(0)
    function handleChange(event, newValue) {
        setValue(newValue)
    }
    let classes = _.get(data, 'classes', '')
    let onSubmit = _.get(data, 'onSubmit', '')
    return (
        <div>
            {/* position="sticky" khi két chuật lên trên cùng Tabs sẽ thay thế menu */}
            <AppBar position="sticky" color="default"> 
                <Tabs
                    textColor="inherit"
                    indicatorColor="secondary"
                    value={value}
                    variant='fullWidth'
                    onChange={handleChange}
                >
                    <LinkTab label={I18n.t("Worker.Tất cả")} href="/bad" />
                    <LinkTab label={I18n.t("Worker.Giường gỗ tự tiên")} href="/bad1" />
                    <LinkTab label={I18n.t("Worker.Giường gỗ công nghiệp")} href="/bad2" />
                    <LinkTab label={I18n.t("Worker.Giường gỗ hiện đại")} href="/bad2" />
                    <LinkTab label={I18n.t("Worker.Giường gỗ cổ điển")} href="/bad2" />

                </Tabs>
            </AppBar>
            <div>
                {
                    value === 0 && 
                    // <TabContainer> 
                    //     <Bad classes={classes} onSubmit={onSubmit}/> 
                    // </TabContainer>
                    <Typography component="div" >
                        <Bad classes={classes} onSubmit={onSubmit}/> 
                    </Typography>

                }
                {
                    value === 1 && <TabContainer> <BadNature classes={classes} onSubmit={onSubmit} /> </TabContainer>
                }
                {
                    value === 2 && <TabContainer> <BadIndustry classes={classes} onSubmit={onSubmit} /> </TabContainer>
                }
                {
                    value === 3 && <TabContainer> <BadModern classes={classes} onSubmit={onSubmit} /> </TabContainer>
                }
                {
                    value === 4 && <TabContainer> <BadClassic classes={classes} onSubmit={onSubmit} /> </TabContainer>
                }
            </div>
        </div>
    )
}
class Create extends BaseView {
    constructor(props) {
        super(props)
    }
    render() {
        const { classes, onSubmit } = this.props
        return (
            <PaperFade >
                <Grid container spacing={32}>
                    <Grid item lg={1}></Grid>
                    <Grid item lg={10}>
                        <NavTabs
                            classes={classes}
                            onSubmit={onSubmit}
                        />
                    </Grid>
                    <Grid item lg={1}></Grid>
                </Grid>
            </PaperFade>
        )
    }
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withStyles(styles)(withRouter(Create))