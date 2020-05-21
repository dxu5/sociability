import {
  SET_SCREAMS,
  LIKE_HUM,
  UNLIKE_HUM,
  LOADING_DATA,
  DELETE_HUM,
  POST_HUM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  hums: [],
  hum: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        hums: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        hum: action.payload,
      };
    case LIKE_HUM:
    case UNLIKE_HUM:
      let index = state.hums.findIndex(
        (hum) => hum.humId === action.payload.humId
      );
      state.hums[index] = action.payload;
      if (state.hum.humId === action.payload.humId) {
        state.hum = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_HUM:
      index = state.hums.findIndex((hum) => hum.humId === action.payload);
      state.hums.splice(index, 1);
      return {
        ...state,
      };
    case POST_HUM:
      return {
        ...state,
        hums: [action.payload, ...state.hums],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        hum: {
          ...state.hum,
          comments: [action.payload, ...state.hum.comments],
        },
      };
    default:
      return state;
  }
}
