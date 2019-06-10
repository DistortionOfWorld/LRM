// React Libraries
import React from 'react'

const ValidationError = (props) => {
	let errorStyle = {display:'none'}
	if(props.message!=='')
	{
		errorStyle = {color:'red'}
	}
	return (
		<span style={errorStyle} role="alert">
			<strong>{props.message}</strong>
		</span>
	)
}

export default ValidationError
