// React Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// Material UI Library
import {
	Button,
	ClickAwayListener,
	Grow,
	Paper,
	Popper,
	MenuItem,
	MenuList,
} from '@material-ui/core'
// Compontnts
import MaterialIcon from '../Elements/MaterialIcon'
// Redux
import { setSessionsFromSuccess } from '../../redux/actions/session.action'

const RightMemberMenu = (props) => {
	const classes = props.classes
	const [open, setOpen] = React.useState(false)
	const anchorRef = React.useRef(null)

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}

	const handleClose = (event) => {
		if(event!==null && anchorRef.current && anchorRef.current.contains(event.target)){
			return
		}
	    setOpen(false)
	}
	return (
		<>
			<Button
				className={classes.linkStyle}
				ref={anchorRef}
				aria-owns={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				>
				{props.username}
			</Button>
			<Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper id="menu-list-grow">
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList>
									<MenuItem onClick={e=>preSubmit(e,props,handleClose)}><MaterialIcon icon="exit_to_app" />{props.words.logoutLink}</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	)
}

const preSubmit = (event,props,handleClose) => {
	let params = new URLSearchParams()
	let url = props.root+'logout'
	handleClose(null)
	window.axios.post(url,params)
		.then((response)=>{
			props.setSessionsFromSuccess(response.data)
			props.history.push('/login')
		})
		.catch((error)=>{
		})
}

RightMemberMenu.propTypes = {
	root: PropTypes.string,
	words: PropTypes.object,
	name: PropTypes.string,
	setSessions: PropTypes.func.isRequired,
	setSessionsFromSuccess: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	words: state.lang.words,
	name: state.session.name,
})

const mapDispatchToProps = dispatch => ({
	setSessions: (sessions) => dispatch(setSessions(sessions)),
	setSessionsFromSuccess: (sessions) => dispatch(setSessionsFromSuccess(sessions)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightMemberMenu))
