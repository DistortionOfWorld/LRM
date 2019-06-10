// React Libraries
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'
// Config
import contentStyles from '../../config/styles/content.style'
// Components
import SessionAlert from '../Elements/SessionAlert'
import ContentTemplate from '../Templates/ContentTemplate'
// Redux
import { clearStatusSessions } from '../../redux/actions/session.action'
import { setNextRoute } from '../../redux/actions/env.action'
import { setDrawerOpen } from '../../redux/actions/drawer.action'
import pageInit from '../../redux/actions/pageInit.group.action'

const page = 'home'

const Home = (props) => {
	useEffect(()=>{
		pageInit(props,page)
	},[])
	return ContentTemplate(props,Content(props),page)
}

const Content = (props) => {
	return (
		<>
			<SessionAlert message={props.status} />
			{props.words.homeContent}
		</>
	)
}


Home.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	words: PropTypes.object,
	status: PropTypes.string,
	setNextRoute: PropTypes.func.isRequired,
	clearStatusSessions: PropTypes.func.isRequired,
	setDrawerOpen: PropTypes.func.isRequired,
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
	setDrawerOpen: (open) => dispatch(setDrawerOpen(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(contentStyles)(Home))
