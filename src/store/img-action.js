import { imageActions } from "./img-slices";

export const fetchImage = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=XpcQD12R63nhygJvUVAvJayfZyzQQeuiODtrBD1q&count=20"
      );
      if (!response.ok) {
        throw {
          statusCode: response.status,
          message: response.statusText,
        };
      }

      const data = await response.json();
      console.log(data);
      const imagesList = data.map((image, index) => {
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
      console.log(error);
      dispatch(
        imageActions.hasFetchError({
          error: error,
        })
      );
    }
  };
};
