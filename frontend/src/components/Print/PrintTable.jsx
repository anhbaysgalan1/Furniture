
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import './style.css'
class PrintTable extends React.Component {
  constructor(props) {
    super(props)
    this.styles = {}
    const { columns, columnWidths } = this.props
    this.getWidths(columns, columnWidths)

  }
  componentDidMount() {

  }

  getWidths(columns, columnWidths) {
    let totalWidth = 0
    columnWidths.map(columnWidth => {
      totalWidth += (columnWidth.width || 0)
    })
    this.styles = {}
    let wscols = []
    columns.map(column => {
      columnWidths.map(columnWidth => {
        if (column.name === columnWidth.name) {
          this.styles[column.name] = {
            width: columnWidth.width / totalWidth * 100 + "%",
            wordWrap: "break-word"
          }
        }
      })
    })
    return wscols
  }

  getValue(row, column) {
    const { name, excelArray, type } = column
    //nếu trường tổng thì in mặc định không format
    if(row.totalRow){
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
          value += ', '
        }
      })
    } else {
      value = String(_.get(row, name, ""))
      if (type === 'number' && !value) value = '0'
    }
    return value
  }

  render() {
    let { columns, data, ignore = [], headerText } = this.props
    return (
      <div>
        <p align = "center">{headerText}</p>
        <table className='printTable' >
          <thead style={{ minHeight: '100px !important' }}>
            <tr style={{ fontSize: "11px" }}>
              {columns.map(column => {
                if (ignore.includes(column.name)) return false
                return <th className='printTh' key={column.name} style={this.styles[column.name]}>{column.title}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) =>
              <tr style={{ fontSize: "13px" }} key={rowIndex}>
                {
                  columns.map((column, columnIndex) => {
                    if (ignore.includes(column.name)) return false
                    let data = this.getValue(row, column)
                    //lấy style của từng row nếu có
                    let rowStyle = row.style || {}
                    return (
                      <td key={columnIndex} className='printTh' style={{...column.printStyle, ...rowStyle}}>{data}</td>
                    )
                  })
                }
              </tr>

            )}

          </tbody>
        </table>
      </div>
    );
  }
}
PrintTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  columnWidths: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object)
};
export default PrintTable
