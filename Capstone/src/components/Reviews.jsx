import {
  useGetTheoryQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
} from "../api/index.js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpaghettiMonsterFlying,
  faArrowTrendDown,
  faMagicWandSparkles,
  faStreetView,
  faArrowRightToBracket,
  faUserSecret,
  faArrowsTurnRight,
} from "@fortawesome/free-solid-svg-icons";

function Reviews({ token, userId }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data = {}, err, isLoading, isSuccess } = useGetTheoryQuery(id);

  console.log(data);

  let message;

  if (isLoading) {
    message = "Loading details and reviews...";
  }

  if (err) {
    message = "Failed to load the details and reviews...";
  }

  const [showReviewUpdateForm, updateShowReviewUpdateForm] = useState(false);
  const [currentReviewIndex, updateCurrentReviewIndex] = useState(null);

  const handleEditClick = (index, reviewId) => {
    updateShowReviewUpdateForm(!showReviewUpdateForm);
    updateCurrentReviewIndex(index);
    updateCurrentReviewId(reviewId);
  };

  const [newUserReview, setNewUserReview] = useState("");

  const [showCommentForm, updateShowCommentForm] = useState(false);
  const [currentIndex, updateCurrentIndex] = useState(null);
  const [currentReviewId, updateCurrentReviewId] = useState(null);

  const handleClick = (index, reviewId) => {
    updateShowCommentForm(!showCommentForm);
    updateCurrentIndex(index);
    updateCurrentReviewId(reviewId);
  };

  const [createComment] = useCreateCommentMutation();
  const [comment, setComment] = useState("");

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();

    await createComment({ id: currentReviewId, body: { comment }, token });

    updateShowCommentForm(false);
  };

  const [showReplyForm, updateShowReplyForm] = useState(false);
  const [currentCommentIndex, updateCurrentCommentIndex] = useState(null);
  const [currentCommentId, updateCurrentCommentId] = useState(null);

  const handleReplyClick = (index, commentId) => {
    updateShowReplyForm(!showReplyForm);
    updateCurrentCommentIndex(index);
    updateCurrentCommentId(commentId);
  };

  const [createReply] = useCreateReplyMutation();
  const [reply, setReply] = useState("");

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    await createReply({ id: currentCommentId, body: { reply }, token });

    updateShowReplyForm(false);
  };

  return (
    <section id="reviews-page">
      <div id="return-container">
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          rotation={180}
          style={{ color: "#f7f7f7" }}
          id="return-button"
          onClick={() => navigate(`/theory/${data.id}`)}
        />
      </div>
      <div id="secret-button-container">
        <FontAwesomeIcon
          icon={faSpaghettiMonsterFlying}
          style={{ color: "#ababab" }}
          id="secret-button-1"
        />
      </div>
      <div id="reviews-intro-container">
        <h2 id="reviews-intro-title">
          All Reviews For <br />
          Your Chosen Theory
        </h2>
      </div>
      <div key={data.id} className="theory-card">
        <div id="theory-details-container">
          <img src={data.image_url} alt={data.title} className="theory-image" />
          <h3 id="theory-title">{data.title}</h3>
        </div>
      </div>

      <div id="review-cards-container">
        {isLoading && <p>{message}</p>}
        {err && <p>{message}</p>}
        {data?.reviews?.map((review, index) => (
          <section>
            <div className="reviews-card" key={review.id}>
              {token && (
                <div className="edit-container">
                  <FontAwesomeIcon
                    icon={faMagicWandSparkles}
                    style={{
                      color: "#00ffbf",
                      display: review.user_id === userId ? "block" : "none",
                    }}
                    className="edit-button"
                    onClick={() => handleEditClick(index, review.id)}
                  />
                </div>
              )}
              <div className="user-container">
                <FontAwesomeIcon
                  icon={faStreetView}
                  style={{ color: "#ff0000" }}
                  className="user-icon"
                />
                <p className="reviews-username">{review.user.username}</p>
              </div>
              {showReviewUpdateForm && currentReviewIndex === index ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>
                      <input
                        name="user_review"
                        value={newUserReview}
                        placeholder={review.user_review}
                        onChange={(evnt) => setNewUserReview(evnt.target.value)}
                      />
                    </label>
                    <button>Submit</button>
                  </form>
                </div>
              ) : (
                <p className="reviews-info">{review.user_review}</p>
              )}
              {token && (
                <div className="comment-container">
                  <FontAwesomeIcon
                    icon={faArrowTrendDown}
                    style={{ color: "#FFD43B" }}
                    className="comment-button"
                    onClick={() => handleClick(index, review.id)}
                  />
                </div>
              )}
            </div>
            <div
              className="comment-form-container"
              style={{
                display:
                  showCommentForm && currentIndex === index ? "block" : "none",
              }}
            >
              <form onSubmit={handleSubmit}>
                <label>
                  <input
                    name="comment"
                    value={comment}
                    placeholder="Your comment here..."
                    onChange={(evnt) => setComment(evnt.target.value)}
                  />
                </label>
                <button>Submit</button>
              </form>
            </div>

            <div className="comment-cards-container">
              {review.comments.length > 0 ? (
                review?.comments?.map((review_comment, index) => (
                  <article className="comments-card-box">
                    <div className="comments-card" key={review_comment.id}>
                      <div className="user-container">
                        <FontAwesomeIcon
                          icon={faUserSecret}
                          style={{ color: "#1100ff" }}
                          className="user-icon"
                        />
                        <p className="comments-username">
                          {review_comment.author?.username}
                        </p>
                      </div>
                      <p className="comments-info">{review_comment.comment}</p>
                      <div className="reply-container">
                        <FontAwesomeIcon
                          icon={faArrowsTurnRight}
                          flip="vertical"
                          style={{ color: "#ff7b00" }}
                          className="reply-button"
                          onClick={() =>
                            handleReplyClick(index, review_comment.id)
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="reply-form-container"
                      style={{
                        display:
                          showReplyForm && currentCommentIndex === index
                            ? "block"
                            : "none",
                      }}
                    >
                      <form onSubmit={handleReplySubmit}>
                        <label>
                          <input
                            name="reply"
                            value={reply}
                            placeholder="Your reply here..."
                            onChange={(evnt) => setReply(evnt.target.value)}
                          />
                        </label>
                        <button>Submit</button>
                      </form>
                    </div>
                  </article>
                ))
              ) : (
                <p>No comments</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
