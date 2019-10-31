// import React from 'react'
// import PropTypes from 'prop-types'
// import withStyles from '@material-ui/core/styles/withStyles'
// import { Form, TextField, Validation } from 'components/Forms'
// import { BaseView } from 'views/BaseView'
// import { I18n } from 'react-redux-i18n'
// import { 
//     Grid,
//     Typography,
//     IconButton, 
//     Icon, 
//     Tooltip, 
//     Card,
//     Button,
//     CardActionArea,
//     CardMedia,
//     CardContent,
//     CardActions,

// } from '@material-ui/core'
// import PaperFade from "components/Main/PaperFade"
// import { withRouter } from 'react-router-dom'
// import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'

// const styles = theme => ({
//     paper: {
//         padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
//     },
//     imgZoom: {
//         transition: "transform .5s, filter 3s ease-in-out",
//         filter: "grayscale(100%)",
//      },
//      imgZoom: {
//         "&:hover": {
//            filter: "grayscale(0)",
//            transform: "scale(1.1)",
//            transitionDuration: "1s",
//            transitionTimingFunction: "linear",
//         }
//     },
// })

// class Create extends BaseView {
//     constructor(props) {
//         super(props)
//         this.state = {
//             data: {
//                 name: '',
//                 code: '',
//                 image1: '',
//                 image2: '',
//                 image2: '',
//                 image4: '',
//                 moneyOld: '',
//                 moneyNew: '',
//                 typeGoods: '',
//                 typeWoods: '',
//                 content: ''
//             }
//         }
//         this.onHandleChange = this.onHandleChange.bind(this)
//         this.validate = {
//             name: [
//                 Validation.required(I18n.t("Form.required")),
//                 Validation.maxLength(255, I18n.t("Form.maxLeng255"))
//             ],
//             permission: [
//                 Validation.required(I18n.t("Form.required"))
//             ],
//         }
//     }

//     onHandleChange(value, name){
//         let { data } = this.state
//         this.setState({ 
//             data: { ...this.state.data, [name]: value }
//         })
//     }

//     render() {
//         const { classes, onSubmit } = this.props
//         let { data } = this.state
//         let copyPermission = [
//             {
//                 name: "Giường gỗ tự nhiên",
//                 code: 'GG1',
//                 _id: 'hdjffngjgihghjh'
//             },
//             {
//                 name: "Giường gỗ công nghiệp",
//                 code: 'GG1',
//                 _id: 'hdjffngjgihghjh'
//             },
//             {
//                 name: "Giường gỗ cổ điển",
//                 code: 'GG1',
//                 _id: 'hdjffngjgihghjh'
//             },
//             {
//                 name: "Giường gỗ hiện đại",
//                 code: 'GG1',
//                 _id: 'hdjffngjgihghjh'
//             }
//         ]
//         return (
//             <PaperFade className={classes.paper}>
//                 <Form className={classes.form} onSubmit={onSubmit}>
//                         <CardContent>
//                             <Grid container spacing={32}>
//                                 <Grid item xs={3} lg={3}>
//                                     <Typography color='primary'>
//                                         Xem bài đăng
//                                     </Typography>
//                                     <CardActionArea className={classes.imgZoom}>
//                                         {
//                                             data.img && data.name && data.code
//                                             ?
//                                                 <CardMedia
//                                                     component="img"
//                                                     alt="Contemplative Reptile"
//                                                     height="200"
//                                                     width="250"
//                                                     image={data.img}
//                                                     title={`${data.name} - ${data.code}`}
//                                                 />
//                                             :   ''
//                                         }
//                                         {
//                                             data.moneyOld && data.moneyNew
//                                             ?
//                                                 <CardContent>
//                                                     <Typography style={{textAlign: 'center', color: 'red'}}>
//                                                         {data.moneyOld} - {data.moneyNew}
//                                                     </Typography>
//                                                 </CardContent>
//                                             :   ''
//                                         }
                                        
//                                     </CardActionArea>
//                                 </Grid>
//                                 <Grid item xs={9}>
//                                     <Grid container spacing={16}>
//                                         <Grid item xs={6}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.img.link1")}
//                                                 onChange={(value) => this.onHandleChange(value, 'img')}
//                                                 name="image1"
//                                             />
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.img.link1")}
//                                                 onChange={(value) => this.onHandleChange(value, 'img')}
//                                                 name="image2"
//                                             />
//                                         </Grid>
//                                         <Grid item xs={6}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.img.link1")}
//                                                 onChange={(value) => this.onHandleChange(value, 'img')}
//                                                 name="image3"
//                                             />
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.img.link1")}
//                                                 onChange={(value) => this.onHandleChange(value, 'img')}
//                                                 name="image4"
//                                             />
//                                         </Grid>
//                                     </Grid>
//                                     <Grid container spacing={16}>
//                                         <Grid item xs={3}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.bad.code")}
//                                                 onChange={(value) => this.onHandleChange(value, 'code')}
//                                                 name="code"
//                                             />
//                                         </Grid>
//                                         <Grid item xs={3}>
//                                             <AutoCompleteField
//                                                 key="1"
//                                                 fullWidth
//                                                 select
//                                                 label={I18n.t("Input.bad.typeGoods")}
//                                                 onChange={(value) => this.onHandleChange(value, 'typeGoods')}
//                                                 name="typeGoods"
//                                                 validate={this.validate.area}
//                                                 isMulti={false}
//                                                 isClearable={false}
//                                             >
//                                                 {
//                                                     copyPermission.map(item => (
//                                                         <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
//                                                             {item.name}
//                                                         </OptionAuto>
//                                                     ))
//                                                 }
//                                             </AutoCompleteField>
//                                         </Grid>
//                                         <Grid item xs={6}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.bad.name")}
//                                                 onChange={(value) => this.onHandleChange(value, 'name')}
//                                                 name="name"
//                                             />
//                                         </Grid>
//                                     </Grid>
//                                     <Grid container spacing={16}>
//                                         <Grid item xs={3}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.bad.moneyOld")}
//                                                 onChange={(value) => this.onHandleChange(value, 'moneyOld')}
//                                                 name="moneyOld"
//                                             />
//                                         </Grid>
//                                         <Grid item xs={3}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.bad.moneyNew")}
//                                                 onChange={(value) => this.onHandleChange(value, 'moneyNew')}
//                                                 name="moneyNew"
//                                             />
//                                         </Grid>
//                                         <Grid item xs={6}>
//                                             <TextField
//                                                 fullWidth
//                                                 label={I18n.t("Input.bad.typeWoods")}
//                                                 onChange={(value) => this.onHandleChange(value, 'typeWoods')}
//                                                 name="typeWoods"
//                                             />
//                                         </Grid>
//                                     </Grid>
                                
//                                     <Grid container spacing={16}>
//                                         <Grid item xs={12}>
//                                             <TextField
//                                                 multiline
//                                                 rows={4}
//                                                 rowsMax={8}
//                                                 variant="outlined"
//                                                 fullWidth
//                                                 label={I18n.t("Input.bad.content.Nội dung miêu tả")}
//                                                 onChange={(value) => this.onHandleChange(value, 'content')}
//                                                 name="content"
//                                             />
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                                 <br />
//                             </Grid>
//                         </CardContent>
//                         <CardActions>
//                             <Button variant="contained" color="primary" onClick={() => this.goto("/goods")}>
//                                 <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
//                             </Button>
//                             <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
//                         </CardActions>
//                 </Form>
//             </PaperFade>
//         )
//     }
// }

// Create.propTypes = {
//     classes: PropTypes.object.isRequired,
// }

// export default withStyles(styles)(withRouter(Create))