import { useNavigate, useParams } from "react-router-dom";
import { useCreateReviewMutation, useGetTheoryQuery } from "../api/index.js";
import StarRating from "./StarRating.jsx";
import { useState } from "react";

function SingleTheory() {
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

  const initialForm = {
    user_review: "",
  };

  const [error, setError] = useState(null);
  const [form, updateForm] = useState(initialForm);
  const [score, setScore] = useState(null);
  const [createReview] = useCreateReviewMutation();

  const handleChange = ({ target }) => {
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();

    if (form.user_review === "" || score === null) {
      setError("Please write a review and give it a lil rating");
      return;
    }

    const { data, error } = await createReview({ id, form, score });

    if (error) {
      setError(error);
      return;
    }

    console.log(data);
    navigate("/theories");
  };

  const { user_review } = form;

  return (
    <section id="single-theory-page">
      <div id="single-theory-intro-container">
        <h2 id="single-theory-intro-title">Your Chosen Conspiracy Theory</h2>
      </div>
      <div id="single-theory">
        {isLoading && <p>{message}</p>}
        {err && <p>{message}</p>}
        <div key={data.id} className="theory-card">
          <div id="theory-details-container">
            <img
              src={data.image_url}
              alt={data.title}
              className="theory-image"
            />
            <h3 id="theory-title">{data.title}</h3>
            <div id="average-score-container">
              <p id="average-score">4</p>
            </div>
            <p id="theory-descrip">{data.description}</p>
          </div>
        </div>
        <div id="review-form-container">
          <form id="review-form">
            <label name="user-review-input" id="user-review-label">
              Write a Review:
              <textarea
                name="user_review"
                value={user_review}
                onChange={handleChange}
                placeholder="Your review here..."
                id="user-review-input"
              />
            </label>
            <div id="user-rating-container">
              <StarRating setScore={setScore} />
            </div>
            <button onSubmit={handleSubmit} id="review-submission-button">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SingleTheory;
