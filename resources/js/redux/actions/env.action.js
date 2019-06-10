export const setRootPath = (root) => ({
	type: 'SET_ROOT_PATH',
	payload: {
		root,
	}, 
})

export const setNextRoute = (next) => ({
	type: 'SET_NEXT_ROUTE',
	payload: {
		next,
	}, 
})

export const setTitle = (title) => ({
	type: 'SET_TITLE',
	payload: {
		title,
	}, 
})

