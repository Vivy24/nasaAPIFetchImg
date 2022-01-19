import { imageActions } from "./img-slices";

export const fetchImage = (httpRequest) => {
  return async (dispatch) => {
    try {
      dispatch(imageActions.reset());
      const response = await fetch(`${httpRequest}`);
      if (!response.ok) {
        throw {
          statusCode: response.status,
          message: response.statusText,
        };
      }

      const data = await response.json();
      console.log(data);
      const filterImage = data.filter(
        (image) => image["media_type"] === "image"
      );
      const imagesList = filterImage.map((image, index) => {
        return {
          id: index,
          date: image.date,
          explanation: image.explanation,
          title: image.title,
          imageUrl: image.url,
          copyright: image.copyright,
        };
      });

      console.log(imagesList);

      dispatch(
        imageActions.fetchImages({
          images: imagesList || [],
        })
      );
    } catch (error) {
      dispatch(
        imageActions.hasFetchError({
          error: error,
        })
      );
    }
  };
};
