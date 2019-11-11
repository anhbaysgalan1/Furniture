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
    Chip,
    Dialog,
    DialogActions,
    DialogContent,

} from '@material-ui/core'
import Header       from '../Public/Header/Header'
import What         from '../Public/What'
import Promotion    from '../Public/Promotion'
import moment       from 'moment'
import _ from 'lodash'

const GridTable = React.lazy(() => import('components/Table/GridTable'))

const styles = theme => ({
    gridTable: {
        height: "calc(100vh - 100px)"
    },
    button: {
        marginRight: '5px'
    },
    card: {
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 4}px`,
    },
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            dataRow: {},
            reload: false,
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
                    name: 'title',
                    title: I18n.t('Table.header.role.Tiêu đề'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'number',
                    title: I18n.t('Table.header.role.Lượt xem'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'summary',
                    title: I18n.t('Table.header.role.Tóm tắt nội dung'),
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
                { columnName: 'title', wordWrapEnabled: true },
                { columnName: 'number', wordWrapEnabled: true },
                { columnName: 'summary', wordWrapEnabled: true },
                { columnName: '_id', align: 'center' },
            ],
            //nếu tổng nhỏ hơn 990 thì tính theo %, ngược lại tính theo px
            columnWidths: [
                {
                    name: 'index',
                    width: 70
                },
                {
                    name: 'title',
                    width: 150
                },
                {
                    name: 'number',
                    width: 70
                },
                {
                    name: 'summary',
                    width: 300
                },
                {
                    name: '_id',
                    width: 70
                }
            ]
        }
        this.ConfirmDialog = null
        this.renderToolbarActions = this.renderToolbarActions.bind(this)
        this.renderSelectedActions = this.renderSelectedActions.bind(this)
        this.onShow = this.onShow.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    onShow(dataRow){
        this.setState({open: true, dataRow: dataRow})
    }

    onHide(){
        this.setState({open: false})
    }

    onCancel(){
        this.onHide()
    }

    onDelete(_id){
        this.ConfirmDialog.show([_id])
        this.onHide()
    }

    renderDetail(){
        let { dataRow } = this.state
        let { classes } = this.props
        let _id = this.getData(dataRow, "_id", '')
        return (
            <Card>
                <Dialog
                    // fullWidth={true}
                    onClose={this.onCancel}
                    open={this.state.open}
                    maxWidth='lg'
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                        <Typography variant="h6"> 
                            Xem chi tiết đơn hàng
                        </Typography>
                            {dataRow.code}
                        <Grid container spacing={32}>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>

                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/posts/${_id}`)}>
                            {I18n.t("Button.edit")}
                        </Button>
                        <Button className={classes.button} variant='contained' color="primary" onClick={() => this.onDelete(_id)}>
                            {I18n.t('Button.delete')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        )
    }

    customUserColumn(data) {
        data = this.getData(data, "value", [])
        return data.length
    }

    customActionColumn(data) {
        let _id = this.getData(data, "value", '')
        let dataRow = this.getData(data, "row", '')
        const { classes } = this.props;
        return (
            <div>
                <Button className={classes.button} variant='contained' color="primary" onClick={() => this.onShow(dataRow)}>
                    {I18n.t('Button.detail')}
                </Button>
                {/* <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/goods/${_id}`)}>
                    {I18n.t("Button.edit")}
                </Button>
                <Button className={classes.button} variant='contained' color="primary" onClick={() => this.ConfirmDialog.show([_id])}>
                    {I18n.t('Button.delete')}
                </Button> */}
            </div>
        )
    }

    renderToolbarActions() {
        return [
            <Tooltip title={I18n.t("toolTip.new")} key="create">
                <Button variant='contained' color='primary' onClick={() => this.goto("/posts/create")}>
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
            <Grid container spacing={32} className={classes.card} >
                <Grid item xs={12}>
                {
                    this.renderDetail()
                }
                </Grid>
                <Grid item xs={12}>
                    <PaperFade showLoading={true} className={classes.card} >
                        <GridTable
                            id="PostsIndex"
                            estimatedRowHeight={100}
                            className={classes.gridTable}
                            onFetchData={this.props.onFetchData}
                            onRefTable={this.props.onRefTable}
                            columns={this.table.columns}
                            rows={data.data}
                            totalCount={data.total}
                            pageSize={data.pageSize}
                            defaultSort={this.table.defaultSort}
                            showCheckboxColumn={false}
                            height="auto"
                            selectedActions={this.renderSelectedActions}
                            tableActions={this.renderToolbarActions}
                            tableColumnExtensions={this.table.tableColumnExtensions}
                            defaultColumnWidths={this.table.columnWidths}
                        />
                        {this.renderDialogConfirmDelete()}
                    </PaperFade>
                </Grid>
            </Grid>
            
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))