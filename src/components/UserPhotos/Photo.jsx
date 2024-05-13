import { useState } from "react";
import "./Photo.css";
import { Link } from "react-router-dom";
import postData from "../../lib/postData";

const Photo = ({ photo }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(!!photo.comments && !!photo.comments.length ? photo.comments : []);

  const submitComment = async (event) => {
    event.preventDefault();

    try {
      const commentData = await postData(`/photo/commentsOfPhoto/${photo._id}`, { comment });
      setCommentList([commentData, ...commentList]);
    } catch (error) {
      console.log("error", error);
    }

    setComment("");
  }

  return (
    <div className="user-photo-container">
      <img src={`../../images/${photo.file_name}`} alt={`Photo by ${photo.user_id}`} />
      <p>Date: {new Date(photo.date_time).toLocaleString()}</p>
      <h3>Comments:</h3>
      <form onSubmit={submitComment} style={{ marginBottom: 10 }}>
        <input
          className="comment-input"
          type="text"
          placeholder="Write a comment..."
          name="comment"
          required
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button className="comment-btn" type="submit">Send</button>
      </form>
      {commentList.map(comment => (
        <div className="comment-container" key={comment._id}>
          <p>Date: {new Date(comment.date_time).toLocaleString()}</p>
          <p>
            Comment by
            <Link to={`/users/${comment.user_id._id}`}>
              {comment.user_id.first_name} {comment.user_id.last_name}
            </Link>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>

  )
}

export default Photo