// React Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Material UI Library
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
// Config
import menuStyles from '../../config/styles/menu.style'
// Components
import RightMenu from './RightMenu'
// Redux
import { setDrawerOpen } from '../../redux/actions/drawer.action'

function handleDrawerOpen() {
}

function handleDrawerClose() {
}

const NavBar = (props) => {
	const classes = props.classes
	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: props.open,
				})}
				>
				<Toolbar className={props.session.logined?'':classes.toolbar}>
					{ drawerButton(props,classes) }
					<div className={classes.title}>
						<Button color="inherit" href="/" className={classes.menuTitleStyle}>{props.title}</Button>
					</div>
					<RightMenu session={props.session} classes={classes} />
				</Toolbar>
			</AppBar>
		</div>
	)
}

const drawerButton = (props,classes) => {
	if(props.session.logined&&props.session.verified)
	{
		return (
			<IconButton
				color="inherit"
				aria-label="Open drawer"
				onClick={()=>props.setDrawerOpen(true)}
				edge="start"
				className={clsx(classes.menuButton, {
					[classes.hide]: props.open,
				})}
				>
				<i className="material-icons">menu</i>
			</IconButton>
		)
	}
	else
	{
		return <></>
	}
}

NavBar.propTypes = {
	title: PropTypes.string,
	session: PropTypes.object,
	open: PropTypes.bool,
	setDrawerOpen: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	title: state.env.title,
	session: state.session,
	open: state.drawer.open,
})

const mapDispatchToProps = dispatch => ({
	setDrawerOpen: (open) => dispatch(setDrawerOpen(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(menuStyles)(NavBar))
