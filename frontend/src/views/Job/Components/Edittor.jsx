// import React, { Component } from "react"
// import {EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw} from "draft-js"
// import {
//     Button,
//     Card, 
//     CardContent,
//     CardActions,
//     // Icon,
// } from '@material-ui/core'
// import PropTypes from 'prop-types'
// import BaseView from '../../../views/BaseView'
// import withStyles from '@material-ui/core/styles/withStyles'
// import { withRouter } from 'react-router-dom'
// import {Editor} from "react-draft-wysiwyg"
// import draftToHtml from "draftjs-to-html"
// import htmlToDraft from "html-to-draftjs"
// import { Redirect, Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// // import * as Icons from 'images/icons'

// import _ from 'lodash'

// const styles = theme => ({
// })

// class ControlledEditor extends BaseView {
//     constructor(props) {
//         super(props)
//         this.loading = false;
//         this.state = {
//             editorState: !this.props.value ? EditorState.createEmpty() : this.convertHTMLToDarft(this.props.value)
//         }

//         // const html = this.props.value
//         // const contentBlock = htmlToDraft(html);
//         // if (contentBlock) {
//         //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//         //     const editorState = EditorState.createWithContent(contentState);
//         //     this.state = { 
//         //         editorState
//         //     }
//         // }
//     }

//     componentDidUpdate(prevProps) {
//         let {value} = this.props
//         if (value && !this.loading) {
//             let contentBlock = htmlToDraft(value) 
//             let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
//             let editorState = EditorState.createWithContent(contentState) 
//             if(editorState) {
//                 this.setState({ editorState })
//             }
//             this.loading = true
//         }
//     }

//     onEditorStateChange(editorState){
//         let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//         if(typeof this.props.onChange == "function"){
//             this.props.onChange(html);
//         }
//         this.setState({editorState: editorState});
//     }

//     render() {
//         let {editorState} = this.state
//         let inputForm = _.get(this.props, "inputForm", "")
//         let dataInput = {}
//         let valuesEditForm = _.get(inputForm, "recruitmentEditForm.values", "")
//         let valuesCreateForm = _.get(inputForm, "recruitemntCreateForm.values", "")
//         if (valuesEditForm){
//             dataInput = valuesEditForm
//         }
//         if (valuesCreateForm){
//             dataInput = valuesCreateForm
//         }
//         return (
//             <Card>
//                 <CardContent>
//                     <Editor
//                         editorState         = {editorState}
//                         // toolbarOnFocus
//                         onEditorStateChange = {this.onEditorStateChange.bind(this)}
//                         wrapperClassName    = "wrapper-class"
//                         editorClassName     = "editor-class"
//                         wrapperStyle        = {{  
//                             backgroundColor : "#DDF1F3",
//                             border          : "solid",
//                             borderColor     : "#7CEFE4",
//                             width           : "100%",
//                         }}
//                         editorStyle     = {{
//                             marginLeft  : "20px",
//                             marginTop   : "20px",
//                             marginRight : "20px",
//                             height      : "400px",
//                         }}
//                         // toolbarClassName = "toolbar-class"
//                     />
//                 </CardContent>   
//                 <CardActions >
//                     {/* <Previews dataInput={dataInput}/> */}
//                 </CardActions>  
//                 {/* <textarea style={{width: '100%', height: "300px"}}
//                     value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//                 />            */}
//              </Card>
//          )
//     }
// }



// ControlledEditor.propTypes = {
//     classes: PropTypes.object.isRequired,
// }

// export default withStyles(styles)(withRouter(ControlledEditor))


