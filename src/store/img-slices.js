import { createSlice } from "@reduxjs/toolkit";

const imgSlice = createSlice({
  name: "image",
  initialState: {
    imageList: [],
    likeImageId: [],
    fetchingError: {},
  },
  reducers: {
    fetchImages(state, action) {
      state.imageList = action.payload.images;
    },
    saveLike(state, action) {
      console.log(action.payload.imageId);
      state.likeImageId = [...state.likeImageId, action.payload.imageId];
      console.log(state.likeImageId);
    },
    deleteLike(state, action) {
      const imageIndex = state.likeImageId.indexOf(action.payload.imageId);
      state.likeImageId.splice(imageIndex, 1);
    },

    hasFetchError(state, action) {
      console.log(action.payload.error);
      state.fetchingError = action.payload.error;
    },
  },
});

export const imageActions = imgSlice.actions;

export default imgSlice;
