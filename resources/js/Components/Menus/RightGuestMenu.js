// React Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
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
// Redux
import { setLang } from '../../redux/actions/session.action'
import { setWords } from '../../redux/actions/lang.action'
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
				{props.words.langLink}
			</Button>
			<Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper id="menu-list-grow">
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList>
									<MenuItem onClick={e=>changeLang(props,'ja')}>日本語</MenuItem>
									<MenuItem onClick={e=>changeLang(props,'en')}>English</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<Link to="/login" className={props.outerLinkStyle}>
				<Button color="inherit" className={classes.linkStyle}>
					{props.words.loginLink}
				</Button>
			</Link>
			<Link to="/register" className={props.outerLinkStyle}>
				<Button color="inherit" className={classes.linkStyle}>
					{props.words.registerLink}
				</Button>
			</Link>
		</>
	)
}

const changeLang = (props,lang) => {
	props.setLang(lang)
	props.setWords(lang)
	let params = new URLSearchParams()
	let url = props.root+'lang/'+lang
		window.axios.post(url,params)
			.then((response)=>{
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
	setLang: PropTypes.func.isRequired,
	setWords: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	words: state.lang.words,
	name: state.session.name,
})

const mapDispatchToProps = dispatch => ({
	setSessions: (sessions) => dispatch(setSessions(sessions)),
	setSessionsFromSuccess: (sessions) => dispatch(setSessionsFromSuccess(sessions)),
	setLang: (lang) => dispatch(setLang(lang)),
	setWords: (lang) => dispatch(setWords(lang)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightMemberMenu))
