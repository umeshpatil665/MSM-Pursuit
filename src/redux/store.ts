import { configureStore } from "@reduxjs/toolkit";

// import piechartSlicer from "./Slicer/piechartSlicer";
import loginSlicer from "./Slicer/loginSlicer";



export const store=configureStore(
  {  reducer:{
    login:loginSlicer,
// piechart:piechartSlicer
// errorBoundry: errorHadlingSlicer,
    }
}
)

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;