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
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core'
import Header from '../Public/Header/Header'
import What from '../Public/What'
import Promotion from '../Public/Promotion'
import moment from 'moment'
import _ from 'lodash'
const GridTable = React.lazy(() => import('components/Table/GridTable'))

let typeClient = [
    {
        title: "Khách lẻ",
        value: '0',
    },
    {
        title: "Khách buôn",
        value: '1',
    },
    {
        title: "Đối tác",
        value: '2',
    }
]
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
                    name: 'type',
                    title: I18n.t('Table.header.role.Loại khách'),
                    sortable: false,
                    filterable: false,
                    formatterComponent: (data) => {
                        return this.typeClient(data)
                    },
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'code',
                    title: I18n.t('Table.header.role.Mã khách'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'name',
                    title: I18n.t('Table.header.role.Tên khách'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'phone',
                    title: I18n.t('Table.header.role.SĐT'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'mail',
                    title: I18n.t('Table.header.role.Email'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'address',
                    title: I18n.t('Table.header.role.Địa chỉ'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'number',
                    title: I18n.t('Table.header.role.Số lần mua'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'money',
                    title: I18n.t('Table.header.role.Số tiền mua'),
                    style: {
                        textAlign: 'center',
                    },
                    formatterComponent: (data) => {
                        let money = _.get(data, 'row.money', '')
                        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    },
                    
                },
                {
                    name: 'goods',
                    title: I18n.t('Table.header.role.Số hàng mua'),
                    style: {
                        textAlign: 'center',
                    },
                    formatterComponent: (data) => {
                        let goods = _.get(data, 'row.goods', '')
                        console.log("goods", goods)
                        return ''
                        // return this.customActionColumn(data)
                    },
                },
                {
                    name: 'note',
                    title: I18n.t('Table.header.role.Ghi chú'),
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
                { columnName: 'type', wordWrapEnabled: true },
                { columnName: 'code', wordWrapEnabled: true },
                { columnName: 'name', wordWrapEnabled: true },
                { columnName: 'phone', wordWrapEnabled: true },
                { columnName: 'mail', wordWrapEnabled: true },
                { columnName: 'address', wordWrapEnabled: true },
                { columnName: 'number', wordWrapEnabled: true },
                { columnName: 'money', wordWrapEnabled: true },
                { columnName: 'goods', wordWrapEnabled: true },
                { columnName: 'note', wordWrapEnabled: true },
                { columnName: '_id', align: 'center' },
            ],
            //nếu tổng nhỏ hơn 990 thì tính theo %, ngược lại tính theo px
            columnWidths: [
                {
                    name: 'index',
                    width: 70
                },
                {
                    name: 'type',
                    width: 120
                },
                {
                    name: 'code',
                    width: 70
                },
                {
                    name: 'name',
                    width: 200
                },
                {
                    name: 'phone',
                    width: 100
                },
                {
                    name: 'mail',
                    width: 120
                },
                {
                    name: 'address',
                    width: 150
                },
                {
                    name: 'number',
                    width: 80
                },
                {
                    name: 'money',
                    width: 80
                },
                {
                    name: 'goods',
                    width: 150
                },
                {
                    name: 'note',
                    width: 80
                },
                {
                    name: '_id',
                    width: 150
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
        this.setState({ open: true, dataRow: dataRow })
    }

    onHide(){
        this.setState({ open: false })
    }

    onCancel(){
        this.onHide()
    }

    onDelete(_id){
        this.ConfirmDialog.show([_id])
        this.onHide()
    }

    typeClient(data){
        let type = _.get(data, 'row.type', '')
        switch(type){
            case '0':
                return <Button color='primary'>Khách lẻ</Button>
            case '1':
                return <Button color='primary'>Khách buôn</Button>
            case '2':
                return <Button color='primary'>Đối tác</Button>
            default:
                return ''
        }
    }

    renderDetail(){
        let { dataRow } = this.state
        let { classes } = this.props
        let _id = this.getData(dataRow, "_id", '')
        let type = _.get(dataRow, 'type', '')
        let code = _.get(dataRow, 'code', '')
        let name = _.get(dataRow, 'name', '')
        let phone = _.get(dataRow, 'phone', '')
        let mail = _.get(dataRow, 'mail', '')
        let address = _.get(dataRow, 'address', '')
        let money = _.get(dataRow, 'money', '')
        let number = _.get(dataRow, 'number', '')
        let goods = _.get(dataRow, 'goods', '')
        let note = _.get(dataRow, 'note', '')
        
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
                        <Table>
                            <TableBody>
                                <TableRow >
                                    <TableCell> Mã khách hàng</TableCell>
                                    <TableCell> {code} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> Tên khách hàng</TableCell>
                                    <TableCell> {name} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> SĐT</TableCell>
                                    <TableCell> {phone} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> Email</TableCell>
                                    <TableCell> {mail} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> Địa chỉ</TableCell>
                                    <TableCell> {address} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> Tổng tiền</TableCell>
                                    <TableCell> {money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> Số lần mua hàng</TableCell>
                                    <TableCell> {number} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> Hàng đã mua</TableCell>
                                    <TableCell> {goods} </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell> Ghi chú</TableCell>
                                    <TableCell> {note} </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.button} color="primary" onClick={() => this.goto(`/client/${_id}`)}>
                            {I18n.t("Button.edit")}
                        </Button>
                        <Button className={classes.button} color="primary" onClick={() => this.onDelete(_id)}>
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
                <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/client/${_id}`)}>
                    {I18n.t("Button.edit")}
                </Button>
                {/* <Button className={classes.button} variant='contained' color="primary" onClick={() => this.ConfirmDialog.show([_id])}>
                    {I18n.t('Button.delete')}
                </Button> */}
            </div>
        )
    }

    renderToolbarActions() {
        return [
            <Tooltip title={I18n.t("toolTip.new")} key="create">
                <Button variant='contained' color='primary' onClick={() => this.goto("/client/create")}>
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
                            id="ClientIndex"
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