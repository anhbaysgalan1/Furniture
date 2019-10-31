import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import {
    Grid,
    Typography,
    IconButton,
    Icon,
    Tooltip,
    Card,
    Button,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import { withRouter } from 'react-router-dom'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'

const styles = theme => ({
    paper: {
        // padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    },
    card: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    },
    form: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
        // padding: '10px 10px 10px 10px'
    },
    imgZoom: {
        transition: "transform .5s, filter 3s ease-in-out",
        filter: "grayscale(100%)",
    },
    imgZoom: {
        "&:hover": {
            filter: "grayscale(0)",
            transform: "scale(1.1)",
            transitionDuration: "1s",
            transitionTimingFunction: "linear",
        }
    },
})

class Create extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            dataInput: {
                name: '',
                code: '',
                image1: '',
                image2: '',
                image2: '',
                image4: '',
                moneyOld: '',
                moneyNew: '',
                typeGoods: '',
                typeWoods: '',
                content: ''
            }
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.validate = {
            name: [
                Validation.required(I18n.t("Form.required")),
                Validation.maxLength(255, I18n.t("Form.maxLeng255"))
            ],
            permission: [
                Validation.required(I18n.t("Form.required"))
            ],
        }
    }

    onHandleChange(value, name) {
        let { dataInput } = this.state
        this.setState({
            dataInput: { ...this.state.dataInput, [name]: value }
        })
    }

    render() {
        const { classes, onSubmit, data } = this.props
        let { dataInput } = this.state
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
        let image1 = _.get(data, 'image1', '')
        let image2 = _.get(data, 'image2', '')
        let image3 = _.get(data, 'image3', '')
        let image4 = _.get(data, 'image4', '')
        let code   = _.get(data, 'code', '')
        let typeGoods = _.get(data, 'typeGoods', '')
        let name = _.get(data, 'name', '')
        let moneyOld = _.get(data, 'moneyOld', '')
        let moneyNew = _.get(data, 'moneyNew', '')
        let typeWoods = _.get(data, 'typeWoods', '')
        let content = _.get(data, 'content', '')
        return (
            // <PaperFade className={classes.paper}>
            <Form className={classes.form} onSubmit={onSubmit}>
                <Grid container spacing={32}>
                    <Grid item xs={3} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography color='primary'>
                                    Xem bài đăng
                                </Typography>
                                <CardActionArea className={classes.imgZoom}>
                                    {
                                        dataInput.img && dataInput.name && dataInput.code
                                        ?
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="200"
                                                width="250"
                                                image={dataInput.img}
                                                title={`${dataInput.name} - ${dataInput.code}`}
                                            />
                                        : ''
                                    }
                                    {
                                        dataInput.moneyOld && dataInput.moneyNew
                                        ?
                                            <CardContent>
                                                <Typography style={{ textAlign: 'center', color: 'red' }}>
                                                    {dataInput.moneyOld} - {dataInput.moneyNew}
                                                </Typography>
                                            </CardContent>
                                        : ''
                                    }

                                </CardActionArea>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={9} >
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant='h5' color='primary'>
                                    Them hang hoa
                                </Typography>
                                <Grid container spacing={32}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.image1")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            value={image1}
                                            name="image1"
                                        />
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.image2")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            value={image2}
                                            name="image2"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.image3")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            value={image3}
                                            name="image3"
                                        />
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.image4")}
                                            onChange={(value) => this.onHandleChange(value, 'img')}
                                            value={image4}
                                            name="image4"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={32}>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.code")}
                                            onChange={(value) => this.onHandleChange(value, 'code')}
                                            value={code}
                                            name="code"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AutoCompleteField
                                            key="1"
                                            fullWidth
                                            select
                                            label={I18n.t("Input.goods.typeGoods")}
                                            onChange={(value) => this.onHandleChange(value, 'typeGoods')}
                                            name="typeGoods"
                                            validate={this.validate.area}
                                            isMulti={false}
                                            value={typeGoods}
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
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.name")}
                                            onChange={(value) => this.onHandleChange(value, 'name')}
                                            name="name"
                                            value={name}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={32}>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.moneyOld")}
                                            onChange={(value) => this.onHandleChange(value, 'moneyOld')}
                                            value={moneyOld}
                                            name="moneyOld"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.moneyNew")}
                                            onChange={(value) => this.onHandleChange(value, 'moneyNew')}
                                            name="moneyNew"
                                            value={moneyNew}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label={I18n.t("Input.goods.typeWoods")}
                                            onChange={(value) => this.onHandleChange(value, 'typeWoods')}
                                            name="typeWoods"
                                            value={typeWoods}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={32}>
                                    <Grid item xs={12}>
                                        <TextField
                                            multiline
                                            rows={4}
                                            rowsMax={8}
                                            variant="outlined"
                                            fullWidth
                                            value={content}
                                            label={I18n.t("Input.goods.content.Nội dung miêu tả")}
                                            onChange={(value) => this.onHandleChange(value, 'content')}
                                            name="content"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => this.goto("/goods")}>
                                    <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                                </Button>
                                <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <br />
                </Grid>
            </Form>
            // </PaperFade>
        )
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))