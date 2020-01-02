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
  Card,
  Grid,
  CardContent,
  CardActions,
  Typography,
  AppBar,
  Toolbar
} from "@material-ui/core"
import Header from "../../Public/Header/Header"
import What from "../../Public/What"
import Home from "../../Public/Home"
import Promotion from "../../Public/Promotion"
import moment from "moment"
import _ from "lodash"

const styles = theme => ({});

class Index extends BaseView {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { classes } = this.props;
    let img =
      "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
    return (
      <div>
        <Header classes={classes} />
        <br></br>
        <Home classes={classes} img={img} />
        <br></br>
        <Grid container spacing={32}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Card>
              <CardContent style={{ textAlign: "justify" }}>
                <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                  Chọn kích thước bàn ăn theo phong thủy mang tài lộc vào nhà
                </Typography>
                <hr></hr>
                <ul>
                  <Typography style={{ fontStyle: "italic", textIndent: "30px" }}>
                    Bàn ghế ăn cho gia đình hiện nay được thiết kế với kiểu dáng
                    và kích thước đa dạng. Lựa chọn kích thước bàn ăn theo phong
                    thủy giúp mang tới nhiều điều thuận lợi dành cho gia chủ.
                    Hãy tham khảo ngay những thông tin dưới đây để có thể dễ
                    dàng chọn mẫu bàn ghế ăn phù hợp nhất cho ngôi nhà.
                  </Typography>
                  <Typography variant="h6">
                    Vì sao nên chọn kích thước bàn ăn theo phong thủy?
                  </Typography>
                  <img
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://thachthatdecor.com.vn/wp-content/uploads/2019/11/kich-thuoc-ban-an-theo-phong-thuy-1.jpg"
                    alt="Smiley face"
                    height="100%"
                    width="100%"
                  />
                  <ul>
                    <li>
                      Chọn kích thước bàn ăn theo phong thủy giúp mang vượng
                      khí vào ngôi nhà, giúp gia chủ xua đổi những vận xấu.
                    </li>
                    <li>
                      Giúp cho không khí trong gia đình luôn ổn định, tăng
                      cường sự mật thiết giữa những thành viên, đặc biệt là mối
                      quan hệ giữa mẹ chồng nàng dâu, quan hệ vợ chồng.
                    </li>
                    <li>
                      Giúp mang tới cảm giác thoải mái hơn cho tất cả thành
                      viên trong gia đình để mang tới bữa cơm thêm ngon miệng
                      hơn.
                    </li>
                  </ul>
                  <Typography>
                    Kích thước bàn ghế ăn tiêu chuẩn hiện nay
                  </Typography>
                  <Typography>
                    Một trong những cách chọn bàn ăn phù hợp là phải chọn được
                    mẫu bàn ghế ăn có kích thước phù hợp. Dưới đây là một số
                    tiêu chuẩn về kích thước cho bàn ghế ăn hiện nay. Bạn nên
                    tham khảo để có sự lựa chọn đúng đắn nhất.
                  </Typography>
                  <img
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_800/https://thachthatdecor.com.vn/wp-content/uploads/2019/11/kich-thuoc-ban-an-theo-phong-thuy-1-1.jpg"
                    alt="Nội thất Dodo"
                  />
                  <ul>
                    <li> 
                      Chiều cao chuẩn từ mặt đất lên mặt bàn là 750 mm
                    </li>
                    <li>
                      Kích thước từ mặt đất đến thanh đáy của bàn ăn tối thiểu
                      phải là 600 mm để không chạm vào đầu gối.
                    </li>
                    <li>
                      Bàn ăn phải có chiều rộng tối thiểu từ 680-750 mm để
                      tránh chạm tay khi ăn uống.
                    </li>
                    <li>
                      Chiều rộng ghế ngồi từ 450-500 mm, chiều sâu từ 420-450
                      mm, chiều cao từ mặt đất tới mặt ghế ngồi là 450 mm, chiều
                      cao lưng ghế tối thiểu là 900 mm.
                    </li>
                    <li>
                      Lưng ghế ngồi nên thiết kế có góc nghiêng từ 10-15 độ
                    </li>
                    <li>
                      Nếu ghế có tay vịn, chiều cao từ mặt ghế tới tay vịn là
                      180-240 mm.
                    </li>
                  </ul>
                  <b>
                    <Typography>Kích thước bàn ăn theo phong thủy</Typography>
                  </b>
                  <Typography>
                    Kích thước bàn ăn theo phong thủy là từ 700-800 mm, vì đây
                    là chiều cao hợp lý đối với vóc dáng của người Việt. Nó phù
                    hợp với mọi hoàn cảnh và có thể đáp ứng được nhu cầu sử dụng
                    của nhiều người. Bên cạnh đó bàn ăn có kích thước như vậy
                    cũng phù hợp bày trí trong nhiều căn phòng. Như vậy lựa chọn
                    theo kích thước bàn ăn chuẩn trên đây cũng đáp ứng được kích
                    thước bàn ăn theo phong thủy.
                  </Typography>
                  <img
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600/https://thachthatdecor.com.vn/wp-content/uploads/2019/11/kich-thuoc-ban-an-theo-phong-thuy-2.jpg"
                    alt="Nội thất Dodo"
                  />
                  <Typography>
                    Kích thước ghế ăn theo phong thủy cũng giống như thông tin
                    mà chúng tôi chia sẻ ở trên. Bởi kích thước bàn ghế ăn theo
                    phong thủy cũng dựa trên những tính toán khoa học sao cho
                    phù hợp với vóc dáng người Việt.
                  </Typography>
                  <Typography>
                    Bạn muốn được tư vấn chi tiết về cách lựa chọn kích thước
                    bàn ăn theo phong thủy và phù hợp với ngôi nhà của mình hãy
                    tới ngay siêu thị đồ gỗ nội thất Thạch Thất Decor để được
                    giải đáp. Chúng tôi có sẵn nhiều mẫu bàn ghế ăn tại showroom
                    cho khách hàng tham khảo.
                  </Typography>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <br></br> <br></br>
        <What classes={classes} />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Index));
