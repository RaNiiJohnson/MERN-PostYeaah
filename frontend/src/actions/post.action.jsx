export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const COMMENT_POST = "COMMENT_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPost = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/post", {
      method: "GET",
      withCredentials: true,
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(res.error);
    } else {
      console.log("okey get");
    }
    dispatch({ type: GET_POST, payload: data });
  };
};

export const addPost = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_POST, payload: data });
  };
};

export const deletePost = (data) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_POST, payload: data });
  };
};

export const postEdit = (data) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_POST, payload: data });
  };
};

export const commentPost = (data) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_POST, payload: data });
  };
};

export const deleteComment = (data) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_COMMENT, payload: data });
  };
};
