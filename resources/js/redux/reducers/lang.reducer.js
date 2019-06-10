const initialState = {
	root:'',
	next:'',
	lang:'ja',
	words:{}
}

const wordsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_WORDS':
			return {
				...state,
				words: require('../../config/lang/'+action.payload.lang+'/resourses').languageResourse,
			}
		default:
			return state
	}
}

export default wordsReducer
