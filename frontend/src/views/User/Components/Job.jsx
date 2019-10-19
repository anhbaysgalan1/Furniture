import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../../../views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'
import { Link } from 'react-router-dom'
import MailIcon from '@material-ui/icons/MailOutline'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import HomeIcon from '@material-ui/icons/Home'
import PhoneIcon from '@material-ui/icons/LocalPhone'
import Map from './Map'
import {
    IconButton,
    Icon,
    Grid,
    Tooltip,
    Button,
    Card,
    Typography,
    CardActions,
    CardContent
} from '@material-ui/core'


const styles = theme => ({
    button: {
        marginRight: '5px'
    },
    iconFooter: {
        marginTop: '20px'
    }
})

class Index extends BaseView {
    constructor(props) {
        super(props)
    }
    render() {
        const { classes } = this.props
        let working = [
            {
                name: 'Kỹ sư xây dựng',
                img: 'https://tbsvn.com.vn/wp-content/uploads/2018/04/xkldxaydungnhat.jpg',
            },
            {
                name: 'Kỹ sư ô tô',
                img: 'https://congngheoto.org/wp-content/uploads/2018/10/tuyen-dung-ky-su-cong-nghe-o-to-3.jpg',
            },
            {
                name: 'Kỹ sư điện tử',
                img: 'http://aum.edu.vn/sites/default/files/aum/quangcao/nganh_co_dien_tu.jpg',
            },
            {
                name: 'Kỹ sư cơ khí',
                img: 'http://triducmdc.com.vn/wp-content/uploads/2017/10/thi-tuyen-don-hang-xkld-nhat-ban-gia-cong-co-khi-21.jpg',
            },
            {
                name: 'Kỹ sư CNTT',
                img: 'http://genknews.genkcdn.vn/k:2016/2014-2f04-2f30-2fae-2fcomputerpro-a015f-1474005175452/top15ngonngulaptrinhphobiennhatthegioibandabiethetchua.jpg',
            },
            {
                name: 'Thực phẩm',
                img: 'https://avt.edu.vn/wp-content/uploads/2018/12/du-hoc-nhat-ban-nganh-cong-nghe-thuc-pham.jpg',
            },
            {
                name: 'Tu nghiệp sinh',
                img: 'https://avt.edu.vn/wp-content/uploads/2018/12/du-hoc-nhat-ban-nganh-cong-nghe-thuc-pham.jpg',
            },
            {
                name: 'Thực tập sinh',
                img: 'https://avt.edu.vn/wp-content/uploads/2018/12/du-hoc-nhat-ban-nganh-cong-nghe-thuc-pham.jpg',
            },
        ]
        
        return (
            <Grid container spacing={32}>
                {
                    working.map((item, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <center>
                                    <Button>
                                        <img
                                            style={{
                                                // margin: '50px',
                                                // fontSize: '20px',
                                                width: '200px',
                                                height: '200px',
                                                border: 'solid 5px red',
                                                background: '#039be5',
                                                borderRadius: '50%',
                                            }}
                                            // height="200" width="220"
                                            className="d-block w-100"
                                            src={item.img}
                                            alt="Japan"
                                        />
                                    </Button>
                                    <Typography align='center' variant='h6' component='h6' color='primary' >
                                        {item.name}
                                    </Typography>
                                </center>
                            </Grid>
                        )
                    })
                }
            </Grid>

        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Index))