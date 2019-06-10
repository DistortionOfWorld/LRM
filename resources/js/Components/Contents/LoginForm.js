// React Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'
// Config
import authStyles from '../../config/styles/auth.style'
// Components
import TextInput from '../Elements/TextInput'
import CheckInput from '../Elements/CheckInput'
import LoginButton from '../Elements/LoginButton'
import PaperTemplate from '../Templates/PaperTemplate'
// Redux
import { 
	clearStatusSessions,
	setSessionsFromSuccess,
	setSessionsFromFailure,
} from '../../redux/actions/session.action'
import { setWords } from '../../redux/actions/lang.action'
import { setTheme } from '../../redux/actions/theme.action'
import { setNextRoute } from '../../redux/actions/env.action'
import { setDrawerOpen } from '../../redux/actions/drawer.action'
import pageInit from '../../redux/actions/pageInit.group.action'



const page = 'login'

const LoginForm = (props) => {
	useEffect(()=>{
		pageInit(props,page)
	},[])
	return PaperTemplate(props,Form(props),page)
}

const Form = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [remember, setRemember] = useState(false)
	let mixedProps = {
		...props,
		email,
		password,
		remember,
	}
	
	const classes = props.classes
	return (
		<form className={classes.form}>
			<TextInput
				identity="email"
				controlType="email"
				label={props.words.email}
				defaultValue={email}
				action={setEmail}
				autoFocus={true}
				/>
			<TextInput
				identity="password"
				controlType="password"
				autoComplete="current-password"
				label={props.words.password}
				defaultValue={password}
				action={setPassword}
				/>
			<CheckInput
				identity="remember"
				label={props.words.remember}
				checked={remember}
				action={setRemember}
				/>
			<LoginButton
				onClick={e=>preSubmit(e,mixedProps)}
				root={props.root}
				button={props.words.loginButton}
				forgot={props.words.forgotLink}
				styles={classes.submit}
				/>
		</form>
	)
}

const preSubmit = (event,props) => {
	event.preventDefault()
	let params = new URLSearchParams()
	params.set('email',props.email)
	params.set('password',props.password)
	params.set('remember',props.remember)
	let url = props.root+'login'
	window.axios.post(url,params)
		.then((response)=>{
			props.setSessionsFromSuccess(response.data)
			props.history.push('/home')
			props.setWords(response.data.lang)
			props.setTheme({primary:response.data.primary,secondary:response.data.secondary})
		})
		.catch((error)=>{
			props.setNextRoute('login')
			props.setSessionsFromFailure(error.response.data.errors)
		})
}

LoginForm.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	words: PropTypes.object,
	clearStatusSessions: PropTypes.func.isRequired,
	setSessionsFromSuccess: PropTypes.func.isRequired,
	setSessionsFromFailure: PropTypes.func.isRequired,
	setWords: PropTypes.func.isRequired,
	setTheme: PropTypes.func.isRequired,
	setNextRoute: PropTypes.func.isRequired,
	setDrawerOpen: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	next: state.env.next,
	words: state.lang.words,
})

const mapDispatchToProps = dispatch => ({
	clearStatusSessions: () => dispatch(clearStatusSessions()),
	setSessionsFromSuccess: (sessions) => dispatch(setSessionsFromSuccess(sessions)),
	setSessionsFromFailure: (errors) => dispatch(setSessionsFromFailure(errors)),
	setWords: (lang) => dispatch(setWords(lang)),
	setTheme: (theme) => dispatch(setTheme(theme)),
	setNextRoute: (next) => dispatch(setNextRoute(next)),
	setDrawerOpen: (open) => dispatch(setDrawerOpen(open)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(authStyles)(LoginForm)))
