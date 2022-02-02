import { combineReducers } from 'redux';

const posts = (posts = [], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;        
        case 'DELETE':
            return posts.filter((post)=> post._id !== action.payload);
        case 'UPDATE':
            return posts;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
};

// Combining all the reducers here
export default combineReducers({
    posts,
});
