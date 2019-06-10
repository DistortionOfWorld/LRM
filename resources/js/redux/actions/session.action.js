export const clearSessions = () => ({
	type: 'CLEAR_SESSIONS',
})


export const clearStatusSessions = () => ({
	type: 'CLEAR_STATUS_SESSIONS',
})

export const setSessionsFromInitial = (sessions) => ({
	type: 'SET_SESSIONS_FROM_INITIAL',
	payload: {
		...sessions
	}, 
})

export const setSessionsFromSuccess = (sessions) => ({
	type: 'SET_SESSIONS_FROM_SUCCESS',
	payload: {
		...sessions,
	}, 
})

export const setSessionsFromFailure = (errors) => ({
	type: 'SET_SESSIONS_FROM_FAILURE',
	payload: {
		errors,
	}, 
})

export const setLang = (lang) => ({
	type: 'SET_LANG',
	payload: {
		lang,
	}, 
})
