// React Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Material UI Library
import {
	FormControl,
	Input,
	InputLabel,
} from '@material-ui/core';
// Views
import ValidationError from './ValidationError'

const TextInput = (props) => {
	let inputProps = {}
	inputProps.id=props.identity
	inputProps.type=props.controlType===undefined?'text':props.controlType
	inputProps.className=(props.errors[props.identity]===undefined)?'':' is-invalid'
	inputProps.name=props.name===undefined?props.identity:props.name
	inputProps.autoComplete=props.autoComplete===undefined?props.identity:props.autoComplete
	inputProps.required=props.required===undefined?true:props.required
	inputProps.autoFocus=props.autoFocus===undefined?false:props.autoFocus
	if(props.defaultValue!==undefined)
	{
		inputProps.defaultValue=props.defaultValue
	}
	if(props.action!==undefined)
	{
		inputProps.onChange=(text)=>props.action(text.target.value)
	}
	return (
		<FormControl margin="normal" required fullWidth>
			<InputLabel htmlFor={props.identity}>{props.label}</InputLabel>
			<Input {...inputProps} />
			<ValidationError message={props.errors[props.identity]} />
		</FormControl>
	)
}


TextInput.propTypes = {
	errors: PropTypes.object,
}

const mapStateToProps = state => ({
	errors: state.session.errors,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
