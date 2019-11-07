/**
 * hỗ trợ gợi ý người dùng input =>  nhưng không bắt buộc phải chọn trường trong dropdown - Phung Luan
 */
import React from 'react'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Popper from '@material-ui/core/Popper'
import withStyles from '@material-ui/core/styles/withStyles'
import BaseField from './BaseField'
import { connectField } from './Connect'

const styles = (theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        // marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        // height: theme.spacing(2),
    },

    
}));

class AutoSuggestField extends BaseField {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            anchorEl: null,
            value: "",
            suggestions: []
        }
        this.hideDropdown = false
    }

    renderInputComponent = (inputProps) => {
        const { classes, inputRef = () => { }, ref, ...other } = inputProps;

        return (
            <TextField
                fullWidth
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                {...other}
            />
        );
    }

    getSuggestions = (value) => {
        const { suggestions = [] } = this.props
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : suggestions.filter(suggestion => {
                const keep =
                    count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }

    renderSuggestion = (suggestion, { query, isHighlighted }) => {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map(part => (
                        <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                            {part.text}
                        </span>
                    ))}
                </div>
            </MenuItem>
        );
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.label;
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        if (this.hideDropdown) {
            this.setState({ suggestions: [] });
            this.hideDropdown = false
            return
        }
        const { suggestions = [] } = this.props
        if (!value) {
            this.setState({ suggestions: suggestions });
        } else {
            let suggests = this.getSuggestions(value);
            this.setState({ suggestions: suggests });
        }
    };

    onSuggestionSelected = (event, { suggestion }) => {
        this.hideDropdown = true
        let {label = ''} = suggestion
        if(typeof this.props.onSuggestionSelected === 'function'){
            this.props.onSuggestionSelected(label)
        }
    }

    handleSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    handleChange = (event, { newValue }) => {
        this.onChange(newValue);
    };

    render() {
        const { classes = {} } = this.props
        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
            onSuggestionSelected: this.onSuggestionSelected
        };
        return (
            // <div className={classes.root}>

            <Autosuggest
                {...autosuggestProps}
                alwaysRenderSuggestions={true}
                inputProps={{
                    classes,
                    id: 'autosuggest',
                    label: this.props.label,
                    placeholder: this.props.placeholder,
                    value: this.state.value,
                    onChange: this.handleChange,
                    inputRef: node => {
                        this.setState({ anchorEl: node });
                    },
                    error: this.state.error ? true : false, //error=true text sẽ là màu đỏ
                    helperText: this.state.error, //nội dung lỗi phía dưới input
                    InputLabelProps: {
                        shrink: true,
                    },
                }}
                theme={{
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Popper style = {{zIndex: 1000}} anchorEl={this.state.anchorEl}  open={Boolean(options.children)}>
                        <Paper
                            square
                            {...options.containerProps}
                            style={{ width: this.state.anchorEl ? this.state.anchorEl.clientWidth : undefined, maxHeight: '200px', overflow: 'auto' }}
                        >
                            {options.children}
                        </Paper>
                    </Popper>
                )}
            />
            // </div>
        );
    }
}
export default withStyles(styles)(connectField(AutoSuggestField)) 