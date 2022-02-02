import React from 'react';
import {Grid, CircularProgress, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import makeStyles from './style';

import { useSelector } from 'react-redux';
import { deletePost, likePost } from '../../actions/posts';

function Posts(props) {
    const posts = useSelector((state) => state.posts);
    const classes = makeStyles();
    const dispatch = useDispatch();

    const post = posts.map((pos)=>{
        return (
            <Grid key={pos._id} item xs={12} sm={6}>
                <Card className={classes.card}>
                    <CardMedia className={classes.media} image={pos.selectedFile} title={pos.title} />
                    <div className={classes.overlay}>
                        <Typography varient="h6">{pos.creator}</Typography>
                        <Typography varient="body2">{moment(pos.createdAt).fromNow()}</Typography>
                    </div>
                    <div className={classes.overlay2}>
                        <Button style={{color:'white'}} size="small" onClick={() => props.setCurrentId(pos._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                    <div className={classes.details}>
                        <Typography varient="body2" color="textSecondary">
                            { pos.tags.map((tag)=>`#${tag} `) }
                        </Typography>
                    </div>
                        <Typography className={classes.title} varient="h5" gutterBottom>
                            { pos.title }
                        </Typography>
                    <CardContent>
                        <Typography varient="body2" component="p" color="textSecondary" gutterBottom>
                            { pos.message }
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button size="small" color="primary" onClick={()=>dispatch(likePost(pos._id))}>
                            <ThumbUpAltIcon fontSize="small" />
                            Like {" "}
                            { pos.likeCount }
                        </Button>
                        <Button size="small" color="primary" onClick={()=>dispatch(deletePost(pos._id))}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    });

    console.log(posts);
    return !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {post}
            </Grid>
    );
}

export default Posts;