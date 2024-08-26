import { useNavigate, useParams } from "react-router-dom";
import { useGetTheoryQuery } from "../api/index.js";

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
            <button id="review-submission-button">Submit Review</button>
            {/* <div>
              <div>
                <label>Rate the Conspiracy Theory!</label>
                <div>
                  <div>
                    <div>
                      <label>
                        <input type="radio" value="1" />
                        <div>1</div>
                      </label>
                      <label>
                        <input type="radio" value="2" />
                        <div>2</div>
                      </label>
                      <label>
                        <input type="radio" value="3" />
                        <div>3</div>
                      </label>
                      <label>
                        <input type="radio" value="4" />
                        <div>4</div>
                      </label>
                      <label>
                        <input type="radio" value="5" />
                        <div>5</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default SingleTheory;
