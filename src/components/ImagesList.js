import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchImage } from "../store/img-action";

import Image from "../components/Image";

const ImagesList = () => {
  const dispatch = useDispatch();
  const imagesStore = useSelector((state) => state.image);
  useEffect(() => {
    if (imagesStore.imageList.length === 0) {
      dispatch(fetchImage());
    }
  }, [dispatch, imagesStore.imageList.length]);

  return (
    <div>
      {imagesStore.imageList.length === 0 ? (
        Object.keys(imagesStore.fetchingError).length > 0 ? (
          <div>
            <h6>{imagesStore.fetchingError.statusCode}</h6>
            <p>{imagesStore.fetchingError.message}</p>
          </div>
        ) : (
          <p>Fetching data</p>
        )
      ) : (
        <div>
          {imagesStore.imageList.map((image) => {
            return <Image key={image.id} image={image} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ImagesList;
