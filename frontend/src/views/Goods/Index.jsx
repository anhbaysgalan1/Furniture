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
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
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
   DialogContentText,

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import Previews from './Components/Previews'
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
   card: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
   },
})

class Index extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         open: false,
         filterOpen: false,
         dataRow: {},
         reload: false,
         dataInput: {
            typeGoods: '',
            typeItem: ''
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
               name: 'code',
               title: I18n.t('Table.header.role.Mã hàng'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'name',
               title: I18n.t('Table.header.role.Tên hàng'),
               style: {
                  textAlign: 'center',
               }
            },
            {
               name: 'typeItem',
               title: I18n.t('Table.header.role.Kiểu hàng'),
               style: {
                  textAlign: 'center',
               },
               formatterComponent: (data) => {
                  let typeItem = _.get(data, 'row.typeItem', '')
                  return typeItem
               },
            },
            {
               name: 'moneyOld',
               title: I18n.t('Table.header.role.Tiền cũ'),
               style: {
                  textAlign: 'center',
               },
               formatterComponent: (data) => {
                  let moneyOld = _.get(data, 'row.moneyOld', '')
                  return moneyOld.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
               },
            },
            {
               name: 'moneyNew',
               title: I18n.t('Table.header.role.Tiền mới'),
               style: {
                  textAlign: 'center',
               },
               formatterComponent: (data) => {
                  let moneyNew = _.get(data, 'row.moneyNew', '')
                  return moneyNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
               },
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
            { columnName: 'index', wordWrapEnabled: false },
            { columnName: 'code', wordWrapEnabled: true },
            { columnName: 'name', wordWrapEnabled: true },
            { columnName: 'moneyOld', wordWrapEnabled: true },
            { columnName: 'moneyNew', wordWrapEnabled: true },
            { columnName: 'typeItem', wordWrapEnabled: true },
            { columnName: '_id', align: 'center' },
         ],
         //nếu tổng nhỏ hơn 990 thì tính theo %, ngược lại tính theo px
         columnWidths: [
            {
               name: 'index',
               width: 70
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
               name: 'typeItem',
               width: 170
            },
            {
               name: 'moneyOld',
               width: 80
            },
            {
               name: 'moneyNew',
               width: 80
            },
            {
               name: '_id',
               width: 120
            }
         ]
      }
      this.ConfirmDialog = null
      this.renderToolbarActions = this.renderToolbarActions.bind(this)
      this.renderSelectedActions = this.renderSelectedActions.bind(this)
      this.onHandleChange = this.onHandleChange.bind(this)
      this.onShow = this.onShow.bind(this)
      this.onShowFilter = this.onShowFilter.bind(this)
      this.onHide = this.onHide.bind(this)
      this.onCancel = this.onCancel.bind(this)
   }

   onShow(dataRow) {
      this.setState({ open: true, dataRow: dataRow })
   }
   onShowFilter() {
      this.setState({ filterOpen: true })
   }
   onHide() {
      this.setState({ open: false, filterOpen: false })
   }
   onCancel() {
      this.onHide()
   }

   onHandleChange(value, name) {
      this.setState({
         dataInput: { ...this.state.dataInput, [name]: value }
      })
   }

   onDelete(_id) {
      this.ConfirmDialog.show([_id])
      this.onHide()
   }

   renderDetail() {
      let { dataRow } = this.state
      let { classes } = this.props
      let _id = this.getData(dataRow, "_id", '')
      return (
         <Card>
            <Dialog
               fullWidth={true}
               onClose={this.onCancel}
               open={this.state.open}
               maxWidth='lg'
               aria-labelledby="draggable-dialog-title"
            >
               <DialogContent>
                  <Previews
                     dataInput={dataRow}
                  />
               </DialogContent>
               <DialogActions>
                  <Button className={classes.button} color="primary" onClick={() => this.onCancel()}>
                     {I18n.t("Button.cancel")}
                  </Button>
                  <Button className={classes.button} color="primary" onClick={() => this.goto(`/goods/${_id}`)}>
                     {I18n.t("Button.edit")}
                  </Button>
                  <Button className={classes.button} disabled color="primary" onClick={() => this.onDelete(_id)}>
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
            <Button className={classes.button} variant='contained' color="primary" onClick={() => this.goto(`/goods/${_id}`)}>
               {I18n.t("Button.edit")}
            </Button>
            <Button className={classes.button} variant='contained' color="primary" onClick={() => this.ConfirmDialog.show([_id])}>
               {I18n.t('Button.delete')}
            </Button>
         </div>
      )
   }

   renderFilter(typeGoods) {
      let typeItems = []
      typeGoods.map((item, index) => {
         let typeGoodsInput = _.get(this.state, 'dataInput.typeGoods', '')
         if (item.value == typeGoodsInput) {
            typeItems = item.typeItems
         }
      })
      return (
         <Dialog
            fullWidth={true}
            onClose={this.onCancel}
            open={this.state.filterOpen}
            maxWidth='md'
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogContent>
               <Grid container spacing={32}>
                  <Grid item xs={6}>
                     <AutoCompleteField
                        key="1"
                        fullWidth
                        select
                        label={I18n.t("Input.goods.typeGoods.Loại hàng hóa")}
                        onChange={(data) => this.onHandleChange(data.value, 'typeGoods')}
                        name="typeGoods"
                        // defaultValue='0'
                        isMulti={false}
                        isClearable={false}
                     >
                        {
                           typeGoods.map(item => (
                              <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                 {item.name}
                              </OptionAuto>
                           ))
                        }
                     </AutoCompleteField>
                  </Grid>
                  <Grid item xs={6}>
                     <AutoCompleteField
                        key="2"
                        fullWidth
                        select
                        label={I18n.t("Input.goods.typeItem.Kiểu hàng")}
                        onChange={(data) => this.onHandleChange(data.value, 'typeItem')}
                        name="typeItem"
                        isDisabled={typeItems.length ? false : true}
                        isMulti={false}
                        isClearable={false}
                     >
                        {
                           typeItems.map(item => (
                              <OptionAuto key={item.value} value={item.value} showCheckbox={false}>
                                 {item.name}
                              </OptionAuto>
                           ))
                        }
                     </AutoCompleteField>
                  </Grid>
               </Grid>
               <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br />
            </DialogContent>
            <DialogActions>
               <Button color='primary' onClick={() => this.onCancel()} >
                  {I18n.t("Button.search")}
               </Button>
               <Button color='primary' onClick={() => this.onCancel()} >
                  {I18n.t("Button.exit")}
               </Button>
            </DialogActions>
         </Dialog>
      )
   }

   renderToolbarActions() {
      let { classes } = this.props
      return [
         <Button onClick={() => this.onShowFilter()} key="filter" className={classes.button} variant='contained' color='primary' >
            {I18n.t("Button.filter")}
         </Button>,
         <Button onClick={() => this.goto("/goods/create")} key="create" className={classes.button} variant='contained' color='primary' >
            {I18n.t("Button.create")}
         </Button>,
      ]
   }

   renderSelectedActions(selectedIds) {
      return [
         <Tooltip title={I18n.t("toolTip.delete")} key="delete">
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
      const { data, classes, typeGoods = [] } = this.props
      return (
         <div className={classes.card}>
            {
               this.renderDetail()
            }
            {
               this.renderFilter(typeGoods)
            }
            <PaperFade showLoading={true} className={classes.card} >
               <GridTable
                  id="GoodsIndex"
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
               {this.renderDialogConfirmDelete()}
            </PaperFade>
         </div>
      )
   }
}

Index.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))