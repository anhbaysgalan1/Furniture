import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import BaseField from './BaseField';
import { connectField } from './Connect'

const debug = require("debug")("mq:form:TextField")
const styles = theme => ({
    textField: {
    },
    'input': {
        '&::placeholder': {
          fontSize: "14px !important",
        }
      }
})
class TextFieldCustom extends BaseField {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
        }
    }

    render() {
        debug("render TextField: ", this.props.name)
        debug("props: ", this.props)
        const { margin, defaultValue, classes, className, name, InputProps, ...otherProps } = this.propsRemovedIgrone()
        return (
            <TextField
                {...otherProps}
                name={name}
                error={this.state.error ? true : false}
                helperText={this.state.error}
                className={`${classes.TextField} ${className}`}
                inputRef={ref => this.ref = ref}
                margin={margin || "normal"}
                value={this.state.value}
                onChange={e => this.onChange(e.target.value)}
                onBlur={e => this.onBlur(e)}
                InputProps={{ classes: {input: classes['input']}, ...InputProps }}
            />
        )
    }
}
TextFieldCustom.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    validate: PropTypes.arrayOf(PropTypes.func),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    margin: PropTypes.string
}

export default withStyles(styles)(connectField(TextFieldCustom))