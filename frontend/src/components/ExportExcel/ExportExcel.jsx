
import React, { Component } from "react"
import XLSX from 'xlsx'
import _ from 'lodash'
import { IconButton, Icon, Tooltip } from '@material-ui/core/'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { I18n } from 'react-redux-i18n'

export default class ExportExcel extends Component {
    constructor(props) {
        super(props)
        this.export = this.export.bind(this)
        this.state = {
            anchorEl: null
        }
    }
    //lấy độ rộng
    getWidths(columns, columnWidths) {
        let wscols = []
        columns.map(column => {
            columnWidths.map(columnWidth => {
                if (column.name === columnWidth.name) {
                    wscols.push({ wpx: columnWidth.width || 100 })
                }
            })
        })
        return wscols
    }
    getValue(row, column) {
        const { name, excelArray, type } = column
        //nếu trường tổng thì in mặc định không format
        if (row.totalRow) {
            return String(_.get(row, name, ""))
        }
        let value = ""
        if (excelArray) {
            let { field, childField } = excelArray
            let array = _.get(row, field, [])
            let length = array.length
            array.map((element, index) => {
                value += element[childField]
                if (index !== length - 1) {
                    //xuống dòng
                    value += '\r\n'
                }
            })
        } else {
            value = _.get(row, name, "") || ""
            if (type === 'number' && !value) value = '0'
        }
        return value
    }
    export(type) {
        let { data = [], columns = [], columnWidths = [], ignoreExcelColumns = [], unwind = false } = JSON.parse(JSON.stringify(this.props))
        let {name = "sheet"} = this.props
        if (!columns.length) {
            return false
        }
        if (typeof name === 'function') {
            name = this.props.name()
        }
        // lấy những cột muốn xuất file  
        columns = columns.filter((column, index) => {
            return !ignoreExcelColumns.includes(column.name)
        })

        let merge = []
        // //unwind nếu là mảng để in ra gộp ô
        // let format_rows = []
        ////code merge cell
        // if (unwind) {
        //     const { field } = unwind
        //     for (let index in data) {
        //         let row = data[index]
        //         //lấy phần tử muốn unwind
        //         let unwindField = row[field]
        //         //xóa trường đó đi để format lại
        //         delete row[field]
        //         let unwindRows = []
        //         if (Array.isArray(unwindField)) {
        //             unwindRows = unwindField.map(item => {
        //                 row[field] = item
        //                 return JSON.parse(JSON.stringify(row))
        //             })
        //         }
        //         format_rows = format_rows.concat(unwindRows)
        //     }
        //     let mergeObj = {}
        //     //tạo các hàng muốn gộp
        //     format_rows.map((row, index) => {
        //         let groupBy = row[unwind.groupBy]
        //         if (mergeObj[groupBy]) {
        //             mergeObj[groupBy].push(index)
        //         } else {
        //             mergeObj[groupBy] = []
        //             mergeObj[groupBy].push(index)
        //         }
        //     })
        //     Object.keys(mergeObj).map(key => {
        //         if (mergeObj[key].length > 1) {
        //             const length = mergeObj[key].length
        //             let start = mergeObj[key][0] //phần tử đầu
        //             let end = mergeObj[key][length - 1] //phần tử cuối
        //             columns.map((column, index) => {
        //                 if (!unwind.nonMergeField.includes(column.name)) {
        //                     merge.push({
        //                         s: { r: start + 1, c: index }, e: { r: end + 1, c: index }
        //                     })
        //                 }
        //             })
        //         }
        //     })
        // } else {
        //     format_rows = data
        // }

        // data = format_rows
        //tạo header
        let header = columns.map((data, index) => {
            return data.title
        })

        //tạo data
        let rows = data.map(item => {
            let row = []
            row = columns.map(column => {
                return this.getValue(item, column)
            })
            return row
        })


        //lấy độ rộng
        let wscols = this.getWidths(columns, columnWidths)

        rows.unshift(header)
        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws['!cols'] = wscols;
        ws['!merges'] = merge;
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, name + "." + type, { type: "array", bookType: type })
    }
    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }
    exportCSV = () => {
        this.export('csv')
        this.handleClose();
    }
    exportXlsx = () => {
        this.export('xlsx')
        this.handleClose();
    }
    render() {
        return (
            <Tooltip title={I18n.t('toolTip.excel')} key="export">
                <div style={{ display: "inline" }}>
                    <IconButton
                        // onClick={this.handleClick}
                        onClick={this.exportCSV}
                    >
                        <Icon>cloud_download</Icon>

                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.exportCSV}>CSV</MenuItem>
                        <MenuItem onClick={this.exportXlsx}>Excel</MenuItem>
                    </Menu>
                </div>


            </Tooltip>
        )
    }
}