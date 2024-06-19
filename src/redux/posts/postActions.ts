// Define Post interface
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Define action types
export const SET_POSTS = 'SET_POSTS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

// For setting posts
export const setPosts = (posts: Post[]) => ({
  type: SET_POSTS,
  payload: posts,
});

// For fetch posts failure
export const fetchPostsFailed = (error: string) => ({
  type: FETCH_POSTS_FAILED,
  payload: error,
});
