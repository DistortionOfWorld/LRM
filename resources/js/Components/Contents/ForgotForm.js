// React Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'
import {
	Avatar,
	CssBaseline,
	Paper,
	Typography,
} from '@material-ui/core'
// config
import authStyles from '../../config/styles/auth.style'
// Components
import TextInput from '../Elements/TextInput'
import SubmitButton from '../Elements/SubmitButton'
import SessionAlert from '../Elements/SessionAlert'
import PaperTemplate from '../Templates/PaperTemplate'
// Redux
import {
	clearStatusSessions,
	setSessionsFromSuccess,
	setSessionsFromFailure,
} from '../../redux/actions/session.action'
import { setNextRoute } from '../../redux/actions/env.action'
import pageInit from '../../redux/actions/pageInit.group.action'

const page = 'forgot'

const ForgotForm = (props) => {
	useEffect(()=>{
		pageInit(props,page)
	},[])
	return PaperTemplate(props,Form(props),page)
}

const Form = (props) => {
	const [email, setEmail] = useState('')
	let mixedProps = {
		...props,
		email,
	}
	const classes = props.classes
	return (
		<>
			<SessionAlert message={props.status} />
			<form className={classes.form}>
				<TextInput
					identity="email"
					controlType="email"
					label={props.words.email}
					defaultValue={email}
					action={setEmail}
					autoFocus={true}
					/>
				<SubmitButton
					label={props.words.forgotButton}
					onClick={e=>preSubmit(e,mixedProps)}
					styles={classes.submit}
					/>
			</form>
		</>
	)
}
const preSubmit = (event,props) => {
	event.preventDefault()
	let params = new URLSearchParams()
	params.set('email',props.email)
	let url = props.root+'password/email'
	window.axios.post(url,params)
		.then((response)=>{
			props.setNextRoute('forgot')
			props.setSessionsFromSuccess(response.data)
		})
		.catch((error)=>{
			props.setNextRoute('forgot')
			props.setSessionsFromFailure(error.response.data.errors)
		})
}

ForgotForm.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	words: PropTypes.object,
	status: PropTypes.string,
	setNextRoute: PropTypes.func.isRequired,
	clearStatusSessions: PropTypes.func.isRequired,
	setSessionsFromSuccess: PropTypes.func.isRequired,
	setSessionsFromFailure: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	next: state.env.next,
	words: state.lang.words,
	status: state.session.status,
})

const mapDispatchToProps = dispatch => ({
	setNextRoute: (next) => dispatch(setNextRoute(next)),
	clearStatusSessions: () => dispatch(clearStatusSessions()),
	setSessionsFromSuccess: (sessions) => dispatch(setSessionsFromSuccess(sessions)),
	setSessionsFromFailure: (errors) => dispatch(setSessionsFromFailure(errors)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(authStyles)(ForgotForm)))
