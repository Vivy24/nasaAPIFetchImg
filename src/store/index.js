import { configureStore } from "@reduxjs/toolkit";

import imgSlice from "./img-slices";

const store = configureStore({
  reducer: {
    image: imgSlice.reducer,
  },
});

export default store;
