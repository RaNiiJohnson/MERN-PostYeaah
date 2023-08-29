export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/user", {
      method: "GET",
      withCredentials: true,
      headers: { "content-Type": "application/json" },
    });
    const data = await res.json();
    dispatch({ type: GET_USER, payload: data }); //data tout court ;) :D
  };
};

export const useSignup = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP, payload: data });
  };
};

export const useLogin = (data) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN, payload: data });
  };
};

export const useLogout = (data) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT, payload: data });
  };
};
