const initialState = {
	logined:false,
	verified:false,
	username:'',
	lang:'ja',
	status:'',
	resent:'',
	errors:{},
}

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_SESSIONS':
			return {...initialState}
		case 'CLEAR_STATUS_SESSIONS':
			return {
				...state,
				status:'',
				resent:'',
				errors:{}
			}
		case 'SET_SESSIONS_FROM_INITIAL':
			return {
				...state,
				logined: action.payload.logined,
				verified: action.payload.verified,
				username: action.payload.username,
				lang: action.payload.lang,
				status:'',
				resent:'',
				errors:{}
			}
		case 'SET_SESSIONS_FROM_SUCCESS':
			window.axios.defaults.headers.common['X-CSRF-TOKEN']=action.payload.csrf
			return {
				...state,
				logined: action.payload.logined,
				verified: action.payload.verified,
				username: action.payload.username,
				lang: action.payload.lang,
				status: action.payload.status,
				resent: action.payload.resent,
				errors:{},
			}
		case 'SET_SESSIONS_FROM_FAILURE':
			let errorType = typeof action.payload.errors
			console.log(errorType)
			let errors = {errors:{fatal:'undefined'}}
			switch(errorType)
			{
				case 'string':
					errors = {errors:{fatal:action.payload.errors}}
					break;
				case 'object':
					errors = action.payload.errors
					break;
			}
			return {
				...state,
				status:'',
				resent:'',
				errors,
			}
		case 'SET_LANG':
			return {
				...state,
				lang: action.payload.lang,
			}
		default:
			return state
	}
}

export default sessionReducer
