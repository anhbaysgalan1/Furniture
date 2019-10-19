import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, DateTimeField, Validation, CheckboxField } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import { withRouter } from 'react-router-dom'
import PaperFade from "components/Main/PaperFade"
import { Tab, AppBar, Tabs, Typography, Button } from '@material-ui/core'
import Build from './Components/Build'
import Car from './Components/Car'
import Electronic from './Components/Electronic'
import Technology from './Components/Technology'
import Food from './Components/Food'
import Machanical from './Components/Mechanical'
import Other from './Components/Other'
import InputCV from '../Public/InputCV'
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
            <AppBar position="static" color="default">
                <Tabs
                    textColor="inherit"
                    indicatorColor="secondary"
                    value={value}
                    variant='standard'
                    onChange={handleChange}
                >
                    <LinkTab label={I18n.t("Worker.Kỹ sư xây dựng")} href="/builds" />
                    <LinkTab label={I18n.t("Worker.Kỹ sư ô tô")} href="/cars" />
                    <LinkTab label={I18n.t("Worker.Kỹ sư Điện tử")} href="/electronic" />
                    <LinkTab label={I18n.t("Worker.Thực phẩm")} href="/food" />
                    <LinkTab label={I18n.t("Worker.Kỹ sư cơ khí")} href="/machenical" />
                    <LinkTab label={I18n.t("Worker.Kỹ sư Công nghệ")} href="/technology" />
                    <LinkTab label={I18n.t("Worker.Công việc Khác")} href="/other" />
                </Tabs>
            </AppBar>
            <div style={{ padding: '-5px' }}>
                {
                    value === 0 &&
                    <TabContainer >
                        <Build classes={classes} />
                    </TabContainer>
                }
                {
                    value === 1 &&
                    <TabContainer>
                        <Car classes={classes} />
                    </TabContainer>
                }
                {
                    value === 2 &&
                    <TabContainer>
                        <Electronic classes={classes} />
                    </TabContainer>
                }
                {
                    value === 3 &&
                    <TabContainer>
                        <Food classes={classes} />
                    </TabContainer>
                }
                {
                    value === 4 &&
                    <TabContainer>
                        <Machanical classes={classes} />
                    </TabContainer>
                }
                {
                    value === 5 &&
                    <TabContainer>
                        <Technology classes={classes} />
                    </TabContainer>
                }
                {
                    value === 6 &&
                    <TabContainer>
                        <Other classes={classes} />
                    </TabContainer>
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
                <NavTabs
                    classes={classes}
                    onSubmit={onSubmit}
                />
            </PaperFade>
        )
    }
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withStyles(styles)(withRouter(Create))