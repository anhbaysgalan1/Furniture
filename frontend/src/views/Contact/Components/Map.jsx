import React, { Component } from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'

const AnyReactComponent = ({ text }) => <div>{text}</div>
 
class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            position: {}
        }
    }

    render() {
        let latitudeIn  = Number(_.get(this.props, "latitudeIn", 20.979531))
        let longitudeIn = Number(_.get(this.props, "longitudeIn", 105.785417))
        let src = `https://maps.google.com/maps?q=${latitudeIn},${longitudeIn}&z=15&output=embed`
        return (
            <Card> 
                <iframe 
                    width="100%" 
                    height="400px" 
                    src={src}
                >
                </iframe>
            </Card>
        )
    }
}
 
export default SimpleMap
