import api from "../../utils/api";
import { EMAIL_SIGNUP, EMAIL_ERROR } from "./types";
import { setAlert } from "./alert";

//TODO refactor this and api to make sense for error response

export const emailSignup =
  (data: { email: string }) => async (dispatch: any) => {
    try {
      const res = await api.put("/email/signup", data);
      console.log("email response", res);

      dispatch({
        type: EMAIL_SIGNUP,
        payload: res.data.response,
      });

      dispatch(setAlert("You have successfully signed up!", "success"));
    } catch (error) {
      console.error(error);
      dispatch({
        type: EMAIL_ERROR,
        payload: error,
      });
      dispatch(setAlert("Could not signup", "danger"));
    }
  };
