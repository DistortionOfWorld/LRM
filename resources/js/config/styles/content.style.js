const drawerWidth = 240

const contentStyles = theme => ({
	root: {
		display: 'flex',
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
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	main: {
		width: 1100,
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		[theme.breakpoints.up(1120 + theme.spacing(3 * 2))]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),

		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(10),
		},
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'left',
		padding: `${theme.spacing(2)}px ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px`,
		[theme.breakpoints.up(400)]: {
			padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
		},
		minHeight: 300,
	},
	link: {
		textDecoration:'none',
		color:'rgba(0,0,0,0.54)',
	}
})

export default contentStyles