import React from 'react'
import {Chip, Grid, InputAdornment, Button} from "@material-ui/core"
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'
import moment from 'moment'

const utilities = {
  filerOrderByDate(orders, date) {
    return orders.filter(item => moment(item.deliveryDate).isSame(moment(date), "day"))
  },

  formatStatus(status) {
    switch (status) {
       case '0':
          return <Button color="primary" >Mới</Button>
       case '1':
          return <Button color="primary" >Đang giao</Button>
       case '2':
          return <Button color="primary" >Hoàn thành</Button>
       case '3':
          return <Button color="primary" >Đổi hàng</Button>
       case '4':
          return <Button color="primary" >Thất bại</Button>
       default:
          return ''
    }
 }
}

export default utilities
