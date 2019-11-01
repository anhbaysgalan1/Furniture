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

} from '@material-ui/core'
import Header from '../Public/Header/Header'
import What from '../Public/What'
import Home from '../Public/Home'
import Promotion from '../Public/Promotion'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({

})


class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { classes } = this.props
        let img = "url('https://shinhan.com.vn/public/themes/shinhan/img/banner_corporate_social_responsibility.jpg')"
        return (
            <div>
                <Header classes={classes} />
                <br></br>
                <Home classes={classes} img={img} />
                <br></br>
                <Grid container spacing={32}>
                    <Grid item xs={2}> </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>
                                    Đồ gỗ nội thất – tiêu chuẩn xuất khẩu
                                </Typography>
                                <hr></hr>
                                <ul>
                                    <Typography variant='h6'>
                                        Chất Lượng Gỗ:
                                    </Typography>
                                    <li>
                                        <Typography>
                                            Sản phẩm được tuyển chọn và chọn lọc kỹ lưỡng ( lọc
                                            sạch giác và gỗ gỗ không đạt chất lượng).
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Ngay từ khâu nguyên liệu đầu vào vẫn được chú trọng và
                                            kiểm định nghiêm ngoặt để đảm bảo được chất lượng sản
                                            phẩm bền vững theo thời gian.
                                        </Typography>
                                    </li>
                                    <Typography variant='h6'>
                                        Chất Lượng Gia Công:
                                    </Typography>
                                    <li>
                                        <Typography>
                                            Để sản phẩm đồ gỗ Việt Nam có thể xâm nhập vào các thị trường
                                            quốc tế khó tính như Hoa Kỳ, châu Âu, Nhật Bản… việc tuân thủ
                                            những quy định khắt khe về chất lượng sản phẩm là yêu cầu bắt
                                            buộc với các doanh nghiệp.
                                        </Typography>
                                    </li>
                                    <Typography variant='h6'>
                                        Hàng được tẩm sấy kỹ càng đạt độ ẩm từ 8% – 12%
                                    </Typography>
                                    <Typography style={{ fontStyle: 'italic' }} >
                                        Tại sao lại cần phải sấy gỗ?
                                    </Typography>
                                    <li> 
                                        <Typography>
                                            Kích thước ổn định: Sấy sẽ làm cho các tấm gỗ có
                                            kích thước ổn định hơn. Nếu gỗ không được sấy khô
                                            đúng cách, đúng tiêu chuẩn thì sẽ không duy trì được
                                            kích thước của nó. Như thế sẽ ảnh hưởng đến quá trình
                                            thi gia công.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Hạn chế mối mọt ăn hại: Gỗ sấy sẽ không bị mối mọt
                                            ăn hại một cách dễ dàng. Dễ bảo quản, quá trình hoàn
                                            thiệt và đóng các sản phẩm đồ gỗ dễ dàng hơn.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Giảm trong lượng: Khi gỗ đã được sấy khô, trọng lượng
                                            của nó cũng giảm đáng kể. Giúp quá trình vận chuyển sẽ trở
                                            nên dễ dàng hơn. Chi phí vận chuyển thấp hơn.
                                        </Typography>
                                    </li>
                                    <li>
                                        <i>
                                            <Typography>
                                                Ngoài ra khi gỗ được xử lý tẩm sấy xong sẽ cải
                                                thiện được nhiều mặt về tính chất. Gỗ sẽ hạn chế
                                                được cong vênh, mối mọt ăn hại. Gỗ sẽ tốt hơn,
                                                chất lượng hơn, chất lượng sản phẩm đồ gỗ cũng tốt hơn,
                                                tuổi thọ được kéo dài và hiệu quả sử dụng được cải thiện đáng kể.
                                            </Typography>
                                        </i>
                                    </li>

                                </ul>
                                <ul>
                                    <Typography variant='h6'>
                                        Các khớp nối và mộng đinh chốt, mộng âm đảm bảo bền vững theo thời gian.
                                    </Typography>
                                    <Typography style={{fontStyle: 'italic'}}>
                                        Mộng đinh chốt hay mộng đinh âm là gì?
                                    </Typography>
                                    <li>
                                        <Typography>
                                            Nó là những thứ nằm bên trong sản phẩm và thông thường
                                            chúng ta không nhìn thấy được, nó dùng để làm cho mối nối
                                            giữa các chi tiết với nhau được chắc chắn, bền lâu và các chi tiết
                                            không bị rời ra theo thời gian khi sử dụng sản phẩm.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Vì 1 sản phẩm không có mộng sẽ có tuổi thọ cực kì thấp, các chi
                                            tiết sẽ bị rụng rời va bung ra trong quá trình sử dụng hoặc chỉ
                                            cần tác động nhẹ thì nó sẽ bung ra và hư hỏng (thông thường hàng
                                            chợ hoặc những địa chỉ kém chất lượng sẽ bỏ qua khâu này để nhanh,
                                            hạn chế công thợ và giá thành rất rẻ).
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Ngoài ra, sản phẩm được gia công cẩn thận, sử dụng mộng đinh chốt
                                            mộng âm thì còn có kỹ thuật lắp ráp rất hoàn hảo. Thợ chạm trổ tỉ
                                            mỉ, kỹ lưỡng và sắc nét làm cho sản phẩm đẹp và có hồn,cái này cần
                                            phải đòi hỏi người thợ phải có kinh nghiệm xử lí gỗ rất lâu năm.
                                            Đến khâu hoàn thiện cũng phải cần nhân lực tỉ mỉ, cẩn thận từng
                                            chút một, từ trong ra ngoài, ngay cả sản phẩm nhỏ nhất hay những
                                            khe kẽ ngóc ngách rất khó thi công.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Vì vậy Nội Thất Dodo là công ty có thương hiệu lớn với bề dày
                                            và uy tín lâu năm trong ngành, chất lượng, tay nghề cao luôn luôn
                                            đảm bảo đầy đủ về mặt kỹ thuật gia công và chất lượng sản phẩm và
                                            gây tiếng vang lớn trên thị trường đồ gỗ.
                                        </Typography>
                                    </li>
                                    <Typography variant='h6'>
                                        Quá trình hoàn thiện sản phẩm cũng như sơn PU.
                                    </Typography>
                                    <li>
                                        <Typography>
                                            Vai trò của sơn gỗ đối với các đồ nội thất và đồ gỗ hiện nay
                                            đóng vai trò rất quan trọng. Nếu các đồ nội thất không có sự
                                            đa dạng về màu sắc thì sự lựa chọn của khách hàng sẽ bị giảm
                                            đi nhiều. Mỗi khách hàng sẽ có nhu cầu về màu sắc sản phẩm
                                            khác nhau. Do vậy, sự có mặt trên thị trường của sơn PU gỗ
                                            là sự trợ giúp đắc lực không thể bỏ qua cho những người thợ
                                            cũng như người sản xuất. Những sản phẩm nội thất gỗ ngày nay
                                            đã khoác lên mình rộng rãi màu sắc khác nhau, vô cùng sinh
                                            động. Người sử dụng cũng dễ dàng tự do lựa tìm cho mình các
                                            món đồ nội thất có màu sắc ưng ý với màu sơn căn phòng, ngôi
                                            nhà mình.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            Ngoài tác dung giúp các sản phẩm gỗ có vẻ đẹp bên ngoài sinh
                                            động hơn thì sơn gỗ cũng góp phần giữ độ bền cho sản phẩm,
                                            tránh độ cong vênh của sản phẩm. Vốn dĩ các sản phẩm gỗ thường
                                            hay bị cong vênh khi thời tiết bên ngoài thay đổi nhưng nhờ
                                            lớp sơn gỗ phủ lên trên sản phẩm gỗ không những che bớt những
                                            “khuyết điểm” của bề mặt gỗ sau khi gia công, chế tác. Nó giúp
                                            bề mặt sản phẩm sơn đều, bóng hơn với thời gian tiêu dùng dài,
                                            mặt sơn không bị rạn nứt.Tại Nội Thất Dodo thì chúng tôi sử
                                            dụng tất cả 5 nước với 3 nước lót, 1 phun PU màu và 1 nước bóng.
                                            Với tỉ lệ pha trộn từ bóng mờ 50, 70 và 100. Được đội ngũ kĩ thuật
                                            chuyên sâu nghiên cứu thời gian lâu và cho ra đời với những thành
                                            quả tuyệt vời và đọc nhất trên thị trường hiện nay!
                                        </Typography>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}> </Grid>
                </Grid>
                <br></br> 
                <What classes={classes} />
            </div>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))