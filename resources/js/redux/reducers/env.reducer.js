const initialState = {
	root:'',
	next:'',
	title:'',
}

const envReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ROOT_PATH':
			return {
				...state,
				root: action.payload.root,
			}
		case 'SET_NEXT_ROUTE':
			return {
				...state,
				next: action.payload.next,
			}
		case 'SET_TITLE':
			return {
				...state,
				title: action.payload.title,
			}
		default:
			return state
	}
}

export default envReducer
