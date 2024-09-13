import {
  useGetTheoryQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useDeleteCommentMutation,
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
  faGhost,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";

function Reviews({ token, userId }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data = {}, err, isLoading, isSuccess } = useGetTheoryQuery(id);

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
  const [newUserComment, setNewUserComment] = useState("");

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
  const [currentCommentId, updateCurrentCommentId] = useState(null);

  const handleReplyClick = (commentId) => {
    updateShowReplyForm(!showReplyForm);
    updateCurrentCommentId(commentId);
  };

  const [createReply] = useCreateReplyMutation();
  const [reply, setReply] = useState("");

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    await createReply({ id: currentCommentId, body: { reply }, token });

    updateShowReplyForm(false);
  };

  const [showCommentUpdateForm, updateShowCommentUpdateForm] = useState(false);

  const handleEditCommentClick = (commentId) => {
    updateShowCommentUpdateForm(!showCommentUpdateForm);
    updateCurrentCommentId(commentId);
  };

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteCommentClick = async (commentId) => {
    console.log(commentId);
    updateCurrentCommentId(commentId);
    console.log(updateCurrentCommentId());
    await deleteComment({ id: currentCommentId, token });
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
          <h3 id="theory-title-2">{data.title}</h3>
        </div>
      </div>

      <div id="review-cards-container">
        {isLoading && <p>{message}</p>}
        {err && <p>{message}</p>}
        {data?.reviews?.map((review, index) => (
          <section>
            <div className="reviews-card" key={review.id}>
              {token && (
                <div className="edit-delete-container">
                  <FontAwesomeIcon
                    icon={faArrowTrendDown}
                    style={{ color: "#FFD43B" }}
                    className="comment-button"
                    onClick={() => handleClick(index, review.id)}
                  />
                  <div className="edit-delete-box">
                    <FontAwesomeIcon
                      icon={faMagicWandSparkles}
                      style={{
                        color: "firebrick",
                        display: review.user_id === userId ? "block" : "none",
                      }}
                      className="edit-button"
                      onClick={() => handleEditClick(index, review.id)}
                    />
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      style={{
                        color: "#ff8800",
                        display: review.user_id === userId ? "block" : "none",
                      }}
                      className="delete-button"
                    />
                  </div>
                </div>
              )}
              <div className="user-container">
                <div className="user-box">
                  <FontAwesomeIcon
                    icon={faStreetView}
                    style={{ color: "#ff0000" }}
                    className="user-icon"
                  />
                  <p className="reviews-username">{review.user.username}</p>
                </div>

                {showReviewUpdateForm && currentReviewIndex === index ? (
                  <div className="edit-review-container">
                    <form onSubmit={handleSubmit} className="edit-review-form">
                      <label className="edit-review-label">
                        <input
                          name="user_review"
                          value={newUserReview}
                          placeholder={review.user_review}
                          onChange={(evnt) =>
                            setNewUserReview(evnt.target.value)
                          }
                          className="edit-review-input"
                        />
                      </label>
                      <button className="edit-review-submit-button">
                        Submit
                      </button>
                    </form>
                  </div>
                ) : (
                  <p className="reviews-info">{review.user_review}</p>
                )}
              </div>
            </div>

            <div
              className="comment-form-container"
              style={{
                display:
                  showCommentForm && currentIndex === index ? "block" : "none",
              }}
            >
              <form onSubmit={handleSubmit} className="comment-form">
                <label className="comment-form-label">
                  <input
                    name="comment"
                    value={comment}
                    placeholder="Your comment here..."
                    onChange={(evnt) => setComment(evnt.target.value)}
                    className="comment-form-input"
                  />
                </label>
                <button className="comment-form-submit-button">Submit</button>
              </form>
            </div>

            <div className="comment-cards-container">
              {review.comments.length > 0 ? (
                review?.comments?.map((review_comment) => (
                  <div className="comments-container">
                    <article className="comments-card-box">
                      <div className="comments-card" key={review_comment.id}>
                        {token && (
                          <div className="edit-delete-container-2">
                            <FontAwesomeIcon
                              icon={faArrowsTurnRight}
                              flip="vertical"
                              style={{ color: "#ff7b00" }}
                              className="reply-button"
                              onClick={() =>
                                handleReplyClick(review_comment.id)
                              }
                            />
                            <div className="edit-delete-box-2">
                              <FontAwesomeIcon
                                icon={faMagicWandSparkles}
                                style={{
                                  color: "firebrick",
                                  display:
                                    review_comment.author_id === userId
                                      ? "block"
                                      : "none",
                                }}
                                className="edit-button"
                                onClick={() =>
                                  handleEditCommentClick(review_comment.id)
                                }
                              />
                              <FontAwesomeIcon
                                icon={faSkullCrossbones}
                                style={{
                                  color: "#ff8800",
                                  display:
                                    review_comment.author_id === userId
                                      ? "block"
                                      : "none",
                                }}
                                className="delete-button"
                                onClick={() =>
                                  handleDeleteCommentClick(review_comment.id)
                                }
                              />
                            </div>
                          </div>
                        )}
                        <div className="user-container">
                          <div className="user-box">
                            <FontAwesomeIcon
                              icon={faUserSecret}
                              style={{ color: "#1100ff" }}
                              className="user-icon"
                            />
                            <p className="comments-username">
                              {review_comment.author?.username}
                            </p>
                          </div>

                          {showCommentUpdateForm &&
                          currentCommentId === review_comment.id ? (
                            <div className="edit-comment-container">
                              <form className="edit-comment-form">
                                <label className="edit-comment-label">
                                  <input
                                    name="user_review"
                                    value={newUserComment}
                                    placeholder={review_comment.comment}
                                    onChange={(evnt) =>
                                      setNewUserComment(evnt.target.value)
                                    }
                                    className="edit-comment-input"
                                  />
                                </label>
                                <button className="edit-comment-submit-button">
                                  Submit
                                </button>
                              </form>
                            </div>
                          ) : (
                            <p className="comments-info">
                              {review_comment.comment}
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className="reply-form-container"
                        style={{
                          display:
                            showReplyForm &&
                            currentCommentId === review_comment.id
                              ? "block"
                              : "none",
                        }}
                      >
                        <form
                          onSubmit={handleReplySubmit}
                          className="reply-form"
                        >
                          <label className="reply-label">
                            <input
                              name="reply"
                              value={reply}
                              placeholder="Your reply here..."
                              onChange={(evnt) => setReply(evnt.target.value)}
                              className="reply-input"
                            />
                          </label>
                          <button className="reply-submit-button">
                            Submit
                          </button>
                        </form>
                      </div>
                    </article>
                    <div id="reply-cards-container">
                      {review_comment.replies.length > 0 ? (
                        review_comment.replies?.map((comment_reply) => (
                          <div className="replies-card" key={comment_reply.id}>
                            {token && (
                              <div className="edit-delete-container-3">
                                <div className="edit-delete-box-3">
                                  <FontAwesomeIcon
                                    icon={faMagicWandSparkles}
                                    style={{
                                      color: "firebrick",
                                      display:
                                        comment_reply.replier_id === userId
                                          ? "block"
                                          : "none",
                                    }}
                                    className="edit-button"
                                    onClick={() =>
                                      handleEditClick(index, review.id)
                                    }
                                  />
                                  <FontAwesomeIcon
                                    icon={faSkullCrossbones}
                                    style={{
                                      color: "#ff8800",
                                      display:
                                        comment_reply.replier_id === userId
                                          ? "block"
                                          : "none",
                                    }}
                                    className="delete-button"
                                  />
                                </div>
                              </div>
                            )}
                            <div className="user-container">
                              <div className="user-box">
                                <FontAwesomeIcon
                                  icon={faGhost}
                                  style={{ color: "#7fff00" }}
                                  className="user-icon"
                                />
                                <p className="replies-username">
                                  {comment_reply.replier?.username}
                                </p>
                              </div>

                              <p className="replies-info">
                                {comment_reply.reply}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="replies-fireback-container">
                          <div className="replies-fireback-sidebar-l"></div>
                          <p className="replies-fireback">No replies</p>
                          <div className="replies-fireback-sidebar-r"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="comments-fireback-container">
                  <div className="comments-fireback-sidebar-l"></div>
                  <p className="comments-fireback">No comments</p>
                  <div className="comments-fireback-sidebar-r"></div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
