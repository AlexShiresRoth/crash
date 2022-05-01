import api from "../../utils/api";
import { CLOUDINARY_ERROR, LOAD_SONG_BOOK } from "./types";

export const loadSongBook = () => async (dispatch: any) => {
  try {
    const res = await api.get("/cloudinary/songbook");

    dispatch({
      type: LOAD_SONG_BOOK,
      payload: res.data.response,
    });
  } catch (error) {
    console.error("ERROR AT CLOUDINARY:", error);
    dispatch({
      type: CLOUDINARY_ERROR,
      payload: error,
    });
  }
};
