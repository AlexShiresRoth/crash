import api from "../../utils/api";
import { EMAIL_SIGNUP, EMAIL_ERROR } from "./types";
import { setAlert } from "./alert";

export const emailSignup = (data: any) => async (dispatch: any) => {
  try {
    const res = await api.put("/email/signup", data);
    console.log(res.data);

    dispatch({
      type: EMAIL_SIGNUP,
      payload: res.data,
    });

    dispatch(setAlert("You have successfully signed up!", "success"));
  } catch (error: any) {
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      dispatch({
        type: EMAIL_ERROR,
        payload: errors,
      });
      errors.forEach((err: any) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: EMAIL_ERROR,
      payload: error,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};
