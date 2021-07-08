import { FETCH_VIDEOS } from "./types";
import axios from "axios";

export const fetchVideos = (max: number) => async (dispatch: any) => {
  const key = "AIzaSyDFmPHtUMdOvCkSkI2XAGZ5t-Gjy42kFZM";

  try {
    const fetch = axios.create({
      baseURL: `https://www.googleapis.com/youtube/v3/playlistItems`,
      //   headers: "Access-Control-Allow-Origin",
    });

    const res = await fetch.get("/", {
      params: {
        part: "snippet",
        playlistId: "PLk8oy35jC2LW5KpLxYupwAy-mJ5MBt3Fs",
        q: "crash+the+calm",
        maxResults: max,
        key,
      },
    });
    dispatch({
      type: FETCH_VIDEOS,
      payload: res.data.items,
    });
  } catch (error: any) {
    console.log(error.response);
  }
};
