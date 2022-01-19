import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchImage } from "../store/img-action";

import Image from "../components/Image";
import classes from "../styles/imageList.module.css";

const ImagesList = () => {
  const dispatch = useDispatch();
  const imagesStore = useSelector((state) => state.image);
  useEffect(() => {
    if (imagesStore.imageList.length === 0) {
      dispatch(
        fetchImage(
          "https://api.nasa.gov/planetary/apod?api_key=XpcQD12R63nhygJvUVAvJayfZyzQQeuiODtrBD1q&count=20&thumbs=true"
        )
      );
    }
  }, [dispatch]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (event.target.date.value) {
      dispatch(
        fetchImage(
          `https://api.nasa.gov/planetary/apod?api_key=XpcQD12R63nhygJvUVAvJayfZyzQQeuiODtrBD1q&start_date=${event.target.date.value}&thumbs=true`
        )
      );
    }
    dispatch(
      fetchImage(
        "https://api.nasa.gov/planetary/apod?api_key=XpcQD12R63nhygJvUVAvJayfZyzQQeuiODtrBD1q&count=20&thumbs=true"
      )
    );
  };

  return (
    <div className={classes.list}>
      <h3 className={classes.pageTitle}>Spacestagram</h3>
      <p className={classes.pageCredit}>
        Brought to you by <a href="https://api.nasa.gov/">NASA's image API</a>
      </p>

      <form className={classes.searchList} onSubmit={handleSearchSubmit}>
        <label htmlFor="date"> Date </label>
        <input name="date" type="date"></input>
        <button type="submit"> Search</button>
        <p>If date is not chosen, it will display randomly</p>
      </form>
      {imagesStore.imageList.length === 0 ? (
        Object.keys(imagesStore.fetchingError).length > 0 ? (
          <div style={{ textAlign: "center" }}>
            <h1>{imagesStore.fetchingError.statusCode}</h1>
            <p>{imagesStore.fetchingError.message}</p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Fetching data</p>
        )
      ) : (
        <div className={classes.imgContainer}>
          <h3>
            Images Found: {imagesStore.imageList.length} || Liked Images:{" "}
            {imagesStore.likeImageId.length}
          </h3>
          <div className={classes.imgList}>
            {imagesStore.imageList.map((image) => {
              return <Image key={image.id} image={image} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesList;
