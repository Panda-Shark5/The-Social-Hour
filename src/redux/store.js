import {configureStore} from '@reduxjs/toolkit'
import feedReducer from './feed.js'

export default configureStore({
    reducer: {
        likes: feedReducer
    }
});