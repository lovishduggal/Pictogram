import { CircularProgress, Stack, Toolbar, Typography } from '@mui/material';
import Post from './Post';
import { useSelector } from 'react-redux';
import { selectPostStatus, selectPosts } from '../postSlice';
import { selectUserId } from '../../auth/authSlice';

function Posts() {
    const posts = useSelector(selectPosts);
    const postStatus = useSelector(selectPostStatus);
    const loggedInUserId = useSelector(selectUserId);

    function search(loggedInUserId, arrOfObjsLikes) {
        for (let i = 0; i < arrOfObjsLikes.length; i++) {
            if (arrOfObjsLikes[i].user === loggedInUserId) {
                return true;
            }
        }
        return false;
    }
    return (
        <Stack justifyContent="center" alignItems="center">
            {postStatus === 'loading' ? (
                <>
                    <Toolbar />
                    <CircularProgress variant="indeterminate" />
                </>
            ) : posts && posts?.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post._id}
                        postId={post._id}
                        data={post}
                        allowed={loggedInUserId === post.user._id}
                        isLikedByUser={search(
                            loggedInUserId,
                            post.likes
                        )}></Post>
                ))
            ) : (
                <Typography sx={{ textAlign: 'center' }}>No Feed</Typography>
            )}
        </Stack>
    );
}

export default Posts;
