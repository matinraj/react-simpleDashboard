import { SET_POSTS, FETCH_POSTS_FAILED } from './postActions';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  error: string | null;
}

// Define initial state of posts
const initialState: PostsState = {
  posts: [],
  error: null,
};

// Post Action Types
type PostsActionTypes =
  | { type: typeof SET_POSTS; payload: Post[] }
  | { type: typeof FETCH_POSTS_FAILED; payload: string };

// Reducer function to handle posts and error
const postsReducer = (
  state = initialState,
  action: PostsActionTypes
): PostsState => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
