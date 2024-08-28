import { useNavigate, useParams } from "react-router-dom";
import { useGetTheoryQuery } from "../api/index.js";
import StarRating from "./StarRating.jsx";

function SingleTheory() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data = {}, error, isLoading, isSuccess } = useGetTheoryQuery(id);

  console.log(data);

  let message;

  if (isLoading) {
    message = "Loading details and reviews...";
  }

  if (error) {
    message = "Failed to load the details and reviews...";
  }

  return (
    <section id="single-theory-page">
      <div id="single-theory-intro-container">
        <h2 id="single-theory-intro-title">Your Chosen Conspiracy Theory</h2>
      </div>
      <div id="single-theory">
        {isLoading && <p>{message}</p>}
        {error && <p>{message}</p>}
        <div key={data.id} className="theory-card">
          <div id="theory-details-container">
            <img
              src={data.image_url}
              alt={data.title}
              className="theory-image"
            />
            <h3 id="theory-title">{data.title}</h3>
            <p id="theory-descrip">{data.description}</p>
          </div>
        </div>
        <div id="review-form-container">
          <form id="review-form">
            <label name="user-review-input" id="user-review-label">
              Write a Review:
              <textarea
                name="user-review"
                placeholder="Your review here..."
                id="user-review-input"
              />
            </label>
            <div id="user-rating-container"><StarRating /></div>
            <button id="review-submission-button">Submit Review</button>
          </form>
        </div>
      </div>
      
    </section>
  );
}

export default SingleTheory;
