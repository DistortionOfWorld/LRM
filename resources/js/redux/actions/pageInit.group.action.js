const pageInit = (props,routeName) => {
	if(props.next!==routeName)
	{
		props.clearStatusSessions()
		props.setNextRoute(routeName)
		if(props.setDrawerOpen!==undefined)
		{
			props.setDrawerOpen(false)
		}
	}
}

export default pageInit