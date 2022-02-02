import axios from 'axios';

// Action Creators
async function getPosts(dispatch){
    
    await axios.get('http://localhost:5001/posts')
    .then((data)=>{
        dispatch({type: 'FETCH_ALL', payload: data.data});
    })
    .catch((error)=>{
        console.log(error.message);
    });
}

export const createPosts = (newPost) => async (dispatch)=>{
    
    // await axios.post('http://localhost:5000/posts',newPost)
    // .then((data)=>{
    //     console.log(data);
    //     dispatch({type: 'CREATE', payload: data.data});
    // })
    // .catch((error)=>{
    //     console.log(error.message);
    // });

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newPost)
    // };
    
    axios.post('http://localhost:5001/posts',newPost)
    .then(() => axios.get('http://localhost:5001/posts'))
    .then((data) => dispatch({type: 'FETCH_ALL', payload: data.data}))
    .catch((error) => console.log(error.message));
}

export const updatePost = (currentId, updatedPost) => async (dispatch)=>{
    
    axios.patch(`http://localhost:5001/posts/${currentId}`,updatedPost)
    .then(() => axios.get('http://localhost:5001/posts'))
    .then((data) => dispatch({type: 'UPDATE', payload: data.data}))
    .catch((error) => console.log(error.message));
}

export const deletePost = (id) => async (dispatch)=>{
    
    axios.delete(`http://localhost:5001/posts/${id}`)
    .then(() => dispatch({type: 'DELETE', payload: id}))
    .catch((error) => console.log(error.message));
}

export const likePost = (id) => async (dispatch)=>{
    
    axios.patch(`http://localhost:5001/posts/${id}/likePost`)
    .then((data) => dispatch({type: 'UPDATE', payload: data.data}))
    .catch((error) => console.log(error.message));
}

export default getPosts;

