import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_HUM,
  UNLIKE_HUM,
  DELETE_HUM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_HUM,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

export const getHums = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/Hums")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

export const postHum = (newHum) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/Hum", newHum)
    .then((res) => {
      dispatch({
        type: POST_HUM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const likeHum = (humId) => (dispatch) => {
  console.log("like");
  axios
    .get(`/Hum/${humId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_HUM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unlikeHum = (humId) => (dispatch) => {
  console.log("unlike");
  axios
    .get(`/Hum/${humId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_HUM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const submitComment = (humId, commentData) => (dispatch) => {
  axios
    .post(`/Hum/${humId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getHum = (humId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/Hum/${humId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const deleteHum = (humId) => (dispatch) => {
  axios
    .delete(`/Hum/${humId}`)
    .then(() => {
      dispatch({ type: DELETE_HUM, payload: humId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.Hums,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
