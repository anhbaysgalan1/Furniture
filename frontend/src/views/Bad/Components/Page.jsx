import React, { Component } from "react"
import ReactDOM from "react-dom"
import Pagination from "react-js-pagination"
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
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    
})

// const arrImg = [
//     {
//         img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'https://noithatami.com/wp-content/uploads/2018/10/giuong-ngu-co-ngan-keo.jpg',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'https://noithatami.com/wp-content/uploads/2018/10/giuong-ngu-co-ngan-keo.jpg',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'https://noithatami.com/wp-content/uploads/2018/10/giuong-ngu-co-ngan-keo.jpg',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'https://thumuabanghe.vn/wp-content/uploads/2017/11/giuong-go-1m6-gia-re.png',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'https://thumuabanghe.vn/wp-content/uploads/2017/11/giuong-go-1m6-gia-re.png',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'https://thumuabanghe.vn/wp-content/uploads/2017/11/giuong-go-1m6-gia-re.png',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     },
//     {
//         img: 'https://thumuabanghe.vn/wp-content/uploads/2017/11/giuong-go-1m6-gia-re.png',
//         title: 'Giường gỗ tự nhiên',
//         code: 'GG1',
//         moneyOld: '2000000',
//         moneyNew: '1500000',
//     }
// ]

// let imgChar = [
//     {
//        code: 'GG1',
//        imgGG1: ["http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg", "http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg"]
//     },
//     {
//        code: 'GG2',
//        imgGG2: ["http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg", "http://noithatphovip.com/file/giuong-ngu-go-soi-mau-canh-quat-vat-thuong-1568f.jpg"]
//     },
// ]


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 1,
        }
    }

    render() {
        return (
            <div>
                <Button color='primary' variant='outlined'> Trước </Button>
                <Button color='primary' variant='outlined'> 1 </Button>
                <Button color='primary' variant='outlined'> 2 </Button>
                <Button color='primary' variant='outlined'> 3 </Button>
                <Button color='primary' variant='outlined'> Sau </Button>
            </div>
        );
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))
// ReactDOM.render(<App />, document.getElementById("root"));