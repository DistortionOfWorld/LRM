const drawerWidth = 240

const menuStyles = theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		marginLeft: theme.spacing(0),
		marginRight: theme.spacing(0),
		[theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
			width: 1000,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	title: {
		flexGrow: 1,
	},
	menuTitleStyle: {
		color:'white',
		textTransform:'none',
		fontSize:'0.9rem',
		[theme.breakpoints.up(400)]: {
			fontSize:'1.1rem',
		},
	},
	linkStyle: {
		color:'white',
		textTransform:'none',
		fontSize:'0.8rem',
		[theme.breakpoints.up(400)]: {
			fontSize:'1rem',
		},
	},
	outerLinkStyle: {
		color:'white',
		textTransform:'none',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
})

export default menuStyles