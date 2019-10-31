// import React from 'react'
// import PropTypes from 'prop-types'
// import withStyles from '@material-ui/core/styles/withStyles'
// import { Form, TextField, Validation } from 'components/Forms'
// import { BaseView } from 'views/BaseView'
// import { I18n } from 'react-redux-i18n'
// import { Grid, Button } from '@material-ui/core'
// import { Link } from 'react-router-dom'
// import PaperFade from "components/Main/PaperFade"
// import { IconButton, Icon, Tooltip, Card, CardActions, CardContent } from '@material-ui/core'
// import { withRouter } from 'react-router-dom'
// import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
// import _ from 'lodash'

// const styles = theme => ({
//     paper: {
//         padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
//     }
// })

// const required = function (value) {
//     if (!value || value.length === 0) {
//         return I18n.t("Form.required")
//     }
// }

// class Create extends BaseView {
//     constructor(props) {
//         super(props)
//         this.state = {
//             permissions: [] 
//         }
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

//     onChangeRole = (value = [], permission) => {
//         let checkAll =  false
//         let arrCopy = []
//         value.map(item => {
//             if(item.value == 'All'){
//                checkAll = true
//             }
//         })
//         if(checkAll){
//             permission.map(item => {
//                 arrCopy.push({ value: item._id, label: item.name })
//             })
//             this.setState({permissions: arrCopy})
//         } else {
//             this.setState({permissions: value})
//         }
//     }
    

//     render() {
//         const { classes, onSubmit, data = {} } = this.props
//         let permissionIds = _.get(data, "permissionIds", [])
//         let permission = this.props.permissions || []
//         let copyPermission = []
//         permission.map(item => {
//             copyPermission.push(item)
//         })
//         let All = {
//             _id: 'All',
//             name: I18n.t('Exception.all'),
//         }
//         copyPermission.unshift(All) 
//         return (
//             <PaperFade className={classes.paper}>
//                 <Form className={classes.form} onSubmit={onSubmit}>
//                     <Grid container spacing={32}>
//                         <Grid item xs={12} lg={12}>
//                             <TextField
//                                 fullWidth
//                                 label={I18n.t("Input.role.name")}
//                                 name="name"
//                                 validate={this.validate.name}
//                                 value={data.name}
//                             />
//                         </Grid>
//                         <Grid item xs={12} lg={12}>
//                             {
//                                 copyPermission.length
//                                 ?  <AutoCompleteField
//                                         key="1"
//                                         fullWidth
//                                         hideSelectedOptions={true}
//                                         select
//                                         label={I18n.t("Input.role.permission")}
//                                         name="permissionIds"
//                                         onChange={(value) => this.onChangeRole(value, permission)}
//                                         defaultValue={this.state.permissions.length ? this.state.permissions : permissionIds}
//                                         validate={this.validate.permission}
//                                         isMulti={true}
//                                     >
//                                         {
//                                             copyPermission.map(item => (
//                                                 <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
//                                                     {item.name}
//                                                 </OptionAuto>
//                                             ))
//                                         }
//                                     </AutoCompleteField> 
//                                 :  ''
//                             }
//                         </Grid>
//                         <br />
//                     </Grid>
//                     <CardActions>
//                         <Button variant="contained" color="primary" onClick={() => this.goto("/goods")}>
//                             <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
//                         </Button>
//                         <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
//                     </CardActions>
//                 </Form>
//             </PaperFade>
//         )
//     }
// }

// Create.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(withRouter(Create))