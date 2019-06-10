// React Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Material UI Library
import clsx from 'clsx'
import { 
	IconButton,
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
// config
import RoutingTable from '../../config/routes/RoutingTable'
import drawerStyles from '../../config/styles/drawer.style'
// Compontnts
import MaterialIcon from './MaterialIcon'
// Redux
import { setDrawerOpen } from '../../redux/actions/drawer.action'

const ContentDrawer = (props) => {
	const classes = props.classes
	const theme = useTheme()
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	}
	const handleClose = () => {
		setAnchorEl(null);
	}
	let leftMenu = []
	for(let key in RoutingTable){
		if(RoutingTable[key].category==='member')
		{
			let listItem = (
				<Link key={key} to={RoutingTable[key].path} className={classes.link}>
					<ListItem button key={key}>
						<ListItemIcon><MaterialIcon icon={RoutingTable[key].icon} /></ListItemIcon>
						<ListItemText primary={props.words[key+'Title']} />
					</ListItem>
				</Link>
			)
			leftMenu.push(listItem)
		}
	}
	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: props.open,
				[classes.drawerClose]: !props.open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: props.open,
					[classes.drawerClose]: !props.open,
				}),
			}}
			open={props.open}
			>
			<div className={classes.toolbar}>
				<IconButton onClick={()=>props.setDrawerOpen(false)}>
					<MaterialIcon icon="chevron_right" />
				</IconButton>
			</div>
			<Divider />
			<List>
				{leftMenu}
			</List>
		</Drawer>
	)
}

ContentDrawer.propTypes = {
	words: PropTypes.object,
	open: PropTypes.bool,
	setDrawerOpen: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	words: state.lang.words,
	open: state.drawer.open,
})

const mapDispatchToProps = dispatch => ({
	setDrawerOpen: (open) => dispatch(setDrawerOpen(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(drawerStyles)(ContentDrawer))
