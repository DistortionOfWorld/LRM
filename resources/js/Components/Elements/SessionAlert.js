// React Libraries
import React from 'react'
// Material UI Library
import { green } from '@material-ui/core/colors';
import { SnackbarContent } from '@material-ui/core';

const snackbarStyle = {
	backgroundColor: green[600],
	marginBottom:10,
}

const SessionAlert = (props) => {
	if(props.message!=='')
	{
		return <SnackbarContent style={snackbarStyle} message={props.message} />
	}
	else
	{
		return <></>
	}
}

export default SessionAlert
