import React from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { withRouter } from "react-router-dom"
import BaseView from "views/BaseView"
import PaperFade from "components/Main/PaperFade"
import { I18n } from "react-redux-i18n"
import ConfirmDialog from "components/Dialogs/ConfirmDialog"
import withWidth, { isWidthUp } from "@material-ui/core/withWidth"
import { Form, TextField, DateTimeField, Validation } from "components/Forms"
import {
  IconButton,
  Icon,
  Tooltip,
  Button,
  Chip,
  Card,
  Grid,
  CardContent,
  CardActions,
  Typography,
  AppBar,
  Toolbar,
  CardActionArea,
  CardMedia,
  Avatar,
  Dialog,
  DialogContent
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Skeleton from "@material-ui/lab/Skeleton"
import moment from "moment"
import _ from "lodash"

const styles = theme => ({
  title: {
    padding: "5px",
    backgroundColor: "#039be5",
    color: "white",
    textAlign: "center"
  }
})

class Index extends BaseView {
  constructor(props) {
    super(props)
    this.state = {
      reload: false
    }
  }

  renderInfo(classes) {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
                CÔNG TY CỔ PHẦN ĐỒ GỖ NỘI THẤT DODO
            </Typography>
            <ul>
                <li>
                    <Typography>Địa chỉ: 108 Trần Phú, Hà Đông, Hà Nội</Typography>
                </li>
                <li>
                    <Typography>Phone: 0377 535 717</Typography>
                </li>
                <li>
                    <Typography>Email: noithat.dodo@gmail.com</Typography>
                </li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <i>
            <Typography color='primary' style={{ textIndent: '30px' }} >
                Nội Thất Dodo hoạt động với
                tiêu chí mang đến lợi ích tối đa cho khách hàng, lấy chữ tín làm
                tiền để phát triển. Sự hài lòng của khách hàng chính là lý do để
                chúng tôi tiếp tục hoàn thiện mình.
            </Typography>
            </i>
          </Grid>
        </Grid>
        <br></br>
        <Typography variant="h6" style={{ color: "#2196f3" }}>
          Đồ gỗ & thiết kế nội thất – kiến trúc chuyên nghiệp
        </Typography>
        <Typography style={{ textIndent: '30px' }} >
          Chúng tôi cam kết 100% các dự án thiết kế & thi công nội thất,
          thiết kế kiến trúc đều đảm bảo đúng quy trình, đúng chất liệu,
          đúng tiến độ thi công như trong hợp đồng đã đề ra.
        </Typography>
        <Typography style={{ textIndent: '30px' }} >
          Nếu quý khách có nhu cầu liên hệ tư vấn thiết kế nội thất thiết
          kế kiến trúc, hay tìm mua các sản phẩm nội thất, xin vui lòng liên
          hệ với chúng tôi qua Hotline <b style={{ color: "#2196f3" }}>☎ 0377 535 717</b> hoặc điền vào mẫu liên
          hệ.
        </Typography>
      </div>
    )
  }

  contactPhone(classes) {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Typography variant="h6" color='primary' >Nhân viên tư vấn</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <i>Liên hệ số điệm thoại chúng tôi sẽ hỗ trợ quý khách 24/7</i>
            </Typography>
            <br /> <br />
            <Button color="primary" variant="contained">
              ☎ 0377 535 717
            </Button>
            <br /> <br />
            <Button color="primary" variant="contained">
              ☎ 0987 564 856
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  contactOnline(classes) {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Typography variant="h6" color='primary'>Phản Hồi Trực Tuyến</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <i>
                Quý khách vui lòng nhấp chuột vào đường dẫn bên dưới để gửi ý
                kiến phản hồi
              </i>
            </Typography>
            <br />
            <br />
            <Typography style={{ display: "block" }} >
              Facebook
            </Typography>
            <Button color="primary" variant="contained">
              Nội thất Dodo
            </Button>
            <br />
            <br />
            <Typography style={{ display: "block" }} >
              Mail
            </Typography>
            <Button color="primary" variant="contained">
              <i className="fa fa-mail"></i> Mail
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderContent(classes) {
    let { onSubmit } = this.props 
    let token = localStorage.getItem('token')
    return (
      <Form onSubmit={onSubmit}>
        <Card>
          <Typography variant="h6" className={classes.title}>
            Điền thông tin chúng tôi sẽ hỗ trợ bạn
          </Typography>
          <CardContent>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên"
                  name="name"
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="SĐT"
                  name="phone"
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="mail"
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  rowsMax={6}
                  margin="dense"
                  label="Nội dung cần hỗ trợ, tư vấn"
                  name="content"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div style={{ textAlign: 'center' }} >
              <Button  type="submit" variant="contained" color="primary">
                Gửi thông tin
              </Button>
              {
                token 
                ? <Button style={{ marginLeft: '5px' }} type="submit" variant="contained" color="primary" onClick={() => this.goto('/contact/list')} >
                    List Contact
                  </Button>
                : ''
              }
            </div>
          </CardContent>
        </Card>
      </Form>
    )
  }


  render() {
    let { classes, onSubmit} = this.props
    return (
      <span>
        <Grid container spacing={32}>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            {this.renderInfo(classes)}
            <br />
            {this.contactPhone(classes)}
            <br />
            {this.contactOnline(classes)}
          </Grid>
          <Grid item xs={3}>
            {this.renderContent(classes)}
          </Grid>
        </Grid>
      </span>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(withRouter(Index))
