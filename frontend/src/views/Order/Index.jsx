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
import FacebookIcon from '@material-ui/icons/Facebook';
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
    Chip,

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import What from '../Public/What'
import Promotion from '../Public/Promotion'
import moment from 'moment'
import _ from 'lodash'


const GridTable = React.lazy(() => import('components/Table/GridTable'))

const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    },
    button: {
        marginRight: '5px'
    }
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.table = {
            columns: [
                {
                    name: 'index',
                    title: I18n.t("Table.header.user.index"),
                    type: "text",
                    filterable: false,
                    sortable: false,
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'code',
                    title: I18n.t('Table.header.role.code'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'name',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'image1',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'image2',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'image3',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'image4',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'monerOld',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'moneyNew',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'typeGoods',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'typeWoods',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'content',
                    title: I18n.t('Table.header.role.name'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: '_id',
                    title: I18n.t('Table.header.action'),
                    sortable: false,
                    filterable: false,
                    formatterComponent: (data) => {
                        return this.customActionColumn(data)
                    },
                    style: {
                        textAlign: 'center',
                    }
                },
            ],
            defaultSort: [],
            tableColumnExtensions: [
                { columnName: 'code', wordWrapEnabled: true },
                { columnName: 'name', wordWrapEnabled: true },
                { columnName: 'image1', wordWrapEnabled: true },
                { columnName: 'image2', wordWrapEnabled: true },
                { columnName: 'image3', wordWrapEnabled: true },
                { columnName: 'image4', wordWrapEnabled: true },
                { columnName: 'monerOld', wordWrapEnabled: true },
                { columnName: 'monerOld', wordWrapEnabled: true },
                { columnName: 'typeWoods', wordWrapEnabled: true },
                { columnName: 'content', wordWrapEnabled: true },
                { columnName: '_id', align: 'center' },
                // {columnName: 'name', align: 'center'}
            ],
            //nếu tổng nhỏ hơn 990 thì tính theo %, ngược lại tính theo px
            columnWidths: [
                {
                    name: 'index',
                    width: 70
                },
                {
                    name: 'code',
                    width: 150
                },
                {
                    name: 'name',
                    width: 150
                },
                {
                    name: 'image1',
                    width: 70
                },
                {
                    name: 'image2',
                    width: 70
                },
                {
                    name: 'image3',
                    width: 70
                },
                {
                    name: 'image4',
                    width: 70
                },
                {
                    name: 'monerOld',
                    width: 70
                },
                {
                    name: 'moneyNew',
                    width: 70
                },
                {
                    name: 'typeGoods',
                    width: 70
                },
                {
                    name: 'typeWoods',
                    width: 70
                },
                {
                    name: 'content',
                    width: 70
                },
               
                {
                    name: '_id',
                    width: 140
                }
            ]
        }
        this.ConfirmDialog = null
        this.renderToolbarActions = this.renderToolbarActions.bind(this)
        this.renderSelectedActions = this.renderSelectedActions.bind(this)
    }

    customUserColumn(data) {
        data = this.getData(data, "value", [])
        return data.length
    }

    customActionColumn(data) {
        let _id = this.getData(data, "value", '')
        const { classes } = this.props;
        return (
            <div>
                <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/goods/${_id}`)}>
                    {I18n.t("Button.edit")}
                </Button>
                <Button className={classes.button} variant='contained' color="primary" key="delete" onClick={() => this.ConfirmDialog.show([_id])}>
                    {I18n.t('Button.delete')}
                </Button>
            </div>
        )
    }

    renderToolbarActions() {
        return [
            <Tooltip title={I18n.t("toolTip.new")} key="create">
                <Button variant='contained' color='primary' onClick={() => this.goto("/goods/create")}>
                    {I18n.t("Button.create")}
                </Button>
            </Tooltip>,
        ]
    }

    renderSelectedActions(selectedIds) {
        return [
            <Tooltip title={I18n.t("toolTip.delete")} key="create">
                <IconButton key="delete" onClick={() => this.ConfirmDialog.show(selectedIds)}>
                    <Icon>delete</Icon>
                </IconButton>
            </Tooltip>
        ]
    }

    renderDialogConfirmDelete() {
        return (
            <ConfirmDialog
                ref={(ref) => this.ConfirmDialog = ref}
                title={I18n.t('Message.deleteDialogTitle')}
                content={I18n.t('Message.deleteDialogContent')}
                onSubmit={this.props.onDeleteData}
            />
        )
    }


    render() {
        const { data, classes } = this.props
        return (
            <PaperFade showLoading={true}>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <GridTable
                            id="BadIndex"
                            estimatedRowHeight={100}
                            className={classes.gridTable}
                            onFetchData={this.props.onFetchData}
                            onRefTable={this.props.onRefTable}
                            columns={this.table.columns}
                            rows={data.data}
                            totalCount={data.total}
                            pageSize={data.pageSize}
                            defaultSort={this.table.defaultSort}
                            showCheckboxColumn={true}
                            height="auto"
                            selectedActions={this.renderSelectedActions}
                            tableActions={this.renderToolbarActions}
                            tableColumnExtensions={this.table.tableColumnExtensions}
                            defaultColumnWidths={this.table.columnWidths}
                        />
                    </Grid>
                </Grid>
                {this.renderDialogConfirmDelete()}
            </PaperFade>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))