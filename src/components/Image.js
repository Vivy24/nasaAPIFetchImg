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
      <img src={`${props.image.imageUrl}`} alt={props.image.title}></img>

      <p className={classes.imgTitle}>{props.image.title}</p>
      <p className={classes.imgDate}>{props.image.date}</p>

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
      {props.image.copyright && <p>Copyright {props.image.copyright}</p>}
    </div>
  );
};

export default Image;
