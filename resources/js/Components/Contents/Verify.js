// React Libraries
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'

// Config
import authStyles from '../../config/styles/auth.style'
// Components
import SessionAlert from '../Elements/SessionAlert'
import PaperTemplate from '../Templates/PaperTemplate'
// Redux
import {
	clearStatusSessions,
	setSessionsFromSuccess,
} from '../../redux/actions/session.action'
import { setNextRoute } from '../../redux/actions/env.action'
import pageInit from '../../redux/actions/pageInit.group.action'



const page = 'verify'

const Verify = (props) => {
	useEffect(()=>{
		pageInit(props,page)
	},[])
	return PaperTemplate(props,Form(props),page)
}

const Form = (props) => {
	return (
		<>
			<SessionAlert message={props.resent==='1'?props.words.verifyAlert:''} />
			{props.words.verifyContent}
			<a href={props.root+'email/resend'} onClick={e=>preSend(e,props)}>{props.words.resentLink}</a>.
		</>
	)
}
const preSend = (event,props) => {
	event.preventDefault()
	let params = new URLSearchParams()
	let url = props.root+'email/resend'
	window.axios.get(url,params)
		.then((response)=>{
			props.setNextRoute('verify')
			props.setSessionsFromSuccess(response.data)
			props.history.push('/home')
		})
		.catch((error)=>{
		})
}


Verify.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	words: PropTypes.object,
	resent: PropTypes.string,
	setNextRoute: PropTypes.func.isRequired,
	clearStatusSessions: PropTypes.func.isRequired,
	setSessionsFromSuccess: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	next: state.env.next,
	words: state.lang.words,
	resent: state.session.resent,
})

const mapDispatchToProps = dispatch => ({
	setNextRoute: (next) => dispatch(setNextRoute(next)),
	clearStatusSessions: () => dispatch(clearStatusSessions()),
	setSessionsFromSuccess: (sessions) => dispatch(setSessionsFromSuccess(sessions)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(authStyles)(Verify)))
