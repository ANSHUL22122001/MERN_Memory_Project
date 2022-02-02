import React ,{useState, useEffect} from 'react'
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useSelector } from 'react-redux';
// Paper => div with white background

import makeStyles from './style';
import { useDispatch } from 'react-redux';
import { createPosts, updatePost } from '../../actions/posts';

function Form(props) {
    const post = useSelector((state) => (props.currentId ? state.posts.find((message) => message._id === props.currentId) : null));
  
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const classes = makeStyles();
    const dispatch = useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(props.currentId){
            dispatch(updatePost(props.currentId, postData));
        }
        else{
            dispatch(createPosts(postData));
        }
        Clear();
    }
    const Clear=()=>{
        props.setCurrentId(null)
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography varient="h6">{ !props.currentId ? "Creating" : "Editing" } a Memory</Typography>
                <TextField name="creator" varient="outlined" label="creator" fullWidth 
                    value={postData.creator} onChange={(e)=>setPostData({
                        ...postData,
                        creator: e.target.value
                    })}
                />
                <TextField name="title" varient="outlined" label="title" fullWidth 
                    value={postData.title} onChange={(e)=>setPostData({
                        ...postData,
                        title: e.target.value
                    })}
                />
                <TextField name="message" varient="outlined" label="message" fullWidth 
                    value={postData.message} onChange={(e)=>setPostData({
                        ...postData,
                        message: e.target.value
                    })}
                />
                <TextField name="tags" varient="outlined" label="tags" fullWidth 
                    value={postData.tags} onChange={(e)=>setPostData({
                        ...postData,
                        tags: e.target.value.split(',')
                    })}
                />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" 
                    color="primary" size="large" type="submit" fullWidth>
                        Submit
                </Button>
                <Button variant="contained" 
                    color="secondary" size="small" onClick={Clear} fullWidth>
                        Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;