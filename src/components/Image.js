import classes from "../styles/image.module.css";
import { useSelector, useDispatch } from "react-redux";
import { imageActions } from "../store/img-slices";

const Image = (props) => {
  const imageStore = useSelector((state) => state.image);

  const dispatch = useDispatch();

  const handleOnClick = (event) => {
    if (event.target.name === "like") {
      dispatch(
        imageActions.saveLike({
          imageId: event.target.value,
        })
      );
    } else {
      dispatch(
        imageActions.deleteLike({
          imageId: event.target.value,
        })
      );
    }
  };

  return (
    <div className={classes.card}>
      {props.image.copyright && <p>Brough to you by {props.image.copyright}</p>}
      <img src={`${props.image.imageUrl}`} alt={props.image.title}></img>
      <h2>{props.image.title}</h2>
      <h5>{props.image.date}</h5>
      {props.image.explanation && <p>{props.image.explanation}</p>}

      {imageStore.likeImageId.find((id) => `${props.image.id}` === id) ? (
        <button name="unlike" value={props.image.id} onClick={handleOnClick}>
          {" "}
          Unlike
        </button>
      ) : (
        <button name="like" value={props.image.id} onClick={handleOnClick}>
          {" "}
          Like
        </button>
      )}
    </div>
  );
};

export default Image;
