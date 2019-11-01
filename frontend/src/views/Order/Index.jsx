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
import RadioGroupField, { Radio } from 'components/Forms/RadioGroupField'
import FacebookIcon from '@material-ui/icons/Facebook'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
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
    DialogActions,
    DialogContent,
    Dialog,

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
    },
    form: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    },
    card: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,  
    }
})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            dataRow: {},
            reload: false,
            dataInput: {
                name: '',
                phone: '',
                address: '',
                count: '',
                pay: '',
                transportFee: '',
            }
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
                    name: 'goodsId',
                    title: I18n.t('Table.header.role.name.Mã sản phẩm'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'name',
                    title: I18n.t('Table.header.role.name.Tên khách hàng'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'phone',
                    title: I18n.t('Table.header.role.name.Phone'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'address',
                    title: I18n.t('Table.header.role.name.Phone'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'money',
                    title: I18n.t('Table.header.role.name.Số tiền hàng'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'count',
                    title: I18n.t('Table.header.role.name.Số Lượng'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'pay',
                    title: I18n.t('Table.header.role.name.Hình thức thanh toán'),
                    style: {
                        textAlign: 'center',
                    }
                },
                {
                    name: 'transportFee',
                    title: I18n.t('Table.header.role.name.Phí giao hàng'),
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
                { columnName: 'goodsId', wordWrapEnabled: true },
                { columnName: 'name', wordWrapEnabled: true },
                { columnName: 'phone', wordWrapEnabled: true },
                { columnName: 'address', wordWrapEnabled: true },
                { columnName: 'money', wordWrapEnabled: true },
                { columnName: 'count', wordWrapEnabled: true },
                { columnName: 'pay', wordWrapEnabled: true },
                { columnName: 'transportFee', wordWrapEnabled: true },
                { columnName: '_id', align: 'center' },
            ],
            //nếu tổng nhỏ hơn 990 thì tính theo %, ngược lại tính theo px
            columnWidths: [
                {
                    name: 'index',
                    width: 70
                },
                {
                    name: 'goodsId',
                    width: 150
                },
                {
                    name: 'name',
                    width: 70
                },
                {
                    name: 'phone',
                    width: 70
                },
                {
                    name: 'address',
                    width: 150
                },
                {
                    name: 'money',
                    width: 70
                },
                {
                    name: 'count',
                    width: 70
                },
                {
                    name: 'pay',
                    width: 100
                },
                {
                    name: 'transportFee',
                    width: 100
                },
                {
                    name: '_id',
                    width: 100
                }
            ]
        }
        this.ConfirmDialog = null
        this.renderToolbarActions = this.renderToolbarActions.bind(this)
        this.renderSelectedActions = this.renderSelectedActions.bind(this)
        this.onShow = this.onShow.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this)
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
            // <Tooltip title={I18n.t("toolTip.new")} key="create">
            //     <Button variant='contained' color='primary' onClick={() => this.goto("/order/create")}>
            //         {I18n.t("Button.create")}
            //     </Button>
            // </Tooltip>,
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

    onHandleChange(value, name) {
        let { dataInput } = this.state
        this.setState({
            dataInput: { ...this.state.dataInput, [name]: value }
        })
    }


    onShow(dataRow) {
        this.setState({ open: true, dataRow: dataRow })
    }

    onHide() {
        this.setState({ open: false })
    }

    onCancel() {
        this.onHide()
    }

    renderDetail(classes, onSubmit) {
        let { dataRow } = this.state
        let _id = this.getData(dataRow, "_id", '')
        let name = _.get(dataRow, 'name', '1000')
        let phone = _.get(dataRow, 'phone', '')
        let address = _.get(dataRow, 'address', '')
        let count = _.get(dataRow, 'count', '')
        let transportFee = _.get(dataRow, 'transportFee', '')
        let pay = _.get(dataRow, 'pay', '')

        let money = _.get(dataRow, 'money', '1000')
        let goodsId = _.get(dataRow, 'goodsId', '_id')
        return (
            <Card>
                <Dialog
                    // fullWidth={true}
                    onClose={this.onCancel}
                    open={this.state.open}
                    maxWidth='lg'
                    aria-labelledby="draggable-dialog-title"
                >
                    <Form className={classes.form} onSubmit={onSubmit}>
                        <DialogContent>
                            <Typography variant="h6"> 
                                Giường gỗ GG22 - 2.000.000đ
                            </Typography>
                            <Grid container spacing={8}>
                                {/* <Grid item xs={5}>
                                    <img src={img[0].img} height='250' width='350'/>
                                    {
                                        img.map((item, index) => {
                                            return (
                                                <img 
                                                    key={index} 
                                                    src={item.img} 
                                                    height='35' 
                                                    width='50'
                                                />
                                            )
                                        })
                                    }
                                </Grid> */}
                                <Grid item xs={7}>
                                </Grid>
                            </Grid>
                            <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                                <Grid item xs={6}>
                                    <TextField
                                        type="hidden"
                                        name="goodsId"
                                        value={goodsId}
                                    />
                                    <TextField
                                        type="hidden"
                                        name="_id"
                                        value={_id}
                                    />
                                    <TextField
                                        type="hidden"
                                        name="money"
                                        value={money}
                                    />
                                    <TextField
                                        fullWidth
                                        label={I18n.t("Input.bad.Tên của bạn")}
                                        onChange={(value) => this.onHandleChange(value, 'code')}
                                        name="name"
                                        value={name}
                                    />
                                    <TextField
                                        fullWidth
                                        label={I18n.t("Input.bad.SĐT")}
                                        onChange={(value) => this.onHandleChange(value, 'name')}
                                        name="phone"
                                        value={phone}
                                    />
                                    <TextField
                                        fullWidth
                                        label={I18n.t("Input.bad.Dia chi giao hang")}
                                        onChange={(value) => this.onHandleChange(value, 'name')}
                                        name="address"
                                        value={address}
                                    />
                                    <TextField
                                        fullWidth
                                        label={I18n.t("Input.bad.Số lượng")}
                                        onChange={(value) => this.onHandleChange(value, 'code')}
                                        name="count"
                                        value={count}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label={I18n.t("Input.bad.Phí vận chuyển")}
                                        value="Miễn phí vận chuyển cho đơn hàng trên 5tr"
                                        onChange={(value) => this.onHandleChange(value, 'name')}
                                        name="transportFee"
                                        value={transportFee}
                                        // InputProps={{
                                        //     readOnly: true,
                                        // }}
                                    />
                                    <RadioGroupField name="pay" label={I18n.t("Input.bad.hinh thuc thanh toan")} value={pay} fullWidth>
                                        <Radio
                                            label="Thanh toán khi nhận hàng"
                                            value="1"
                                        />
                                        <Radio
                                            label="Chuyển khoản Tbbank (0178 53658 8698)"
                                            value="2"
                                        />
                                        <Radio
                                            label="Ví điện tử"
                                            value="3"
                                        />
                                    </RadioGroupField>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                className={classes.button} 
                                variant='contained' 
                                color="primary" 
                                onClick={() => this.onCancel()} 
                            >
                                {I18n.t("Button.Thoát")}
                            </Button>
                            <Button 
                                className={classes.button} 
                                variant='contained' 
                                color="primary" 
                                type="submit"
                                onClick={() => this.onCancel()} 
                                autoFocus
                            >
                                {I18n.t("Button.submit")}
                            </Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </Card>
        )
    }


    render() {
        const { data, classes, onSubmit } = this.props
        let copyPermission = [
            {
                name: "Giường gỗ tự nhiên",
                code: 'GG1',
                _id: 'hdjffngjgihghjh'
            },
            {
                name: "Giường gỗ công nghiệp",
                code: 'GG1',
                _id: 'hdjffngjgihghjh'
            },
            {
                name: "Giường gỗ cổ điển",
                code: 'GG1',
                _id: 'hdjffngjgihghjh'
            },
            {
                name: "Giường gỗ hiện đại",
                code: 'GG1',
                _id: 'hdjffngjgihghjh'
            }
        ]
        return (
            <Grid container spacing={32}  className={classes.card} >
                <Grid item xs={12}>
                {
                    this.renderDetail(classes, onSubmit)
                }
                </Grid>
                <Grid item xs={12}>
                    <PaperFade showLoading={true} className={classes.card} >
                        <Grid container spacing={32}>
                            <Grid item xs={4}>
                                <AutoCompleteField
                                    key="1"
                                    fullWidth
                                    select
                                    label={I18n.t("Input.bad.Chọn loại hàng")}
                                    // onChange={(value) => this.onHandleChange(value, 'typeBad')}
                                    name="typeBad"
                                    isMulti={false}
                                    isClearable={false}
                                >
                                    {
                                        copyPermission.map(item => (
                                            <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                                {item.name}
                                            </OptionAuto>
                                        ))
                                    }
                                </AutoCompleteField>
                            </Grid>
                            <Grid item xs={8}></Grid>
                        </Grid>
                        <GridTable
                            id="OrderIndex"
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