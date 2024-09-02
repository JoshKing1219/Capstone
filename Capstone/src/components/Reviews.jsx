import { useGetTheoryQuery } from "../api/index.js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Reviews({ token }) {
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

  return (
    <section id="reviews-page">
      <div id="reviews-intro-container">
        <h2 id="reviews-intro-title">
          All Reviews For <br />
          Your Chosen Theory
        </h2>
        <div key={data.id} className="theory-card">
          <div id="theory-details-container">
            <img
              src={data.image_url}
              alt={data.title}
              className="theory-image"
            />
            <h3 id="theory-title">{data.title}</h3>
          </div>
        </div>
      </div>
      <div>
        {isLoading && <p>{message}</p>}
        {err && <p>{message}</p>}
        {data?.reviews?.map((review) => (
          <div className="reviews-card" key={review.id}>
            <p className="reviews-username">User: {review.user.username}</p>
            <p className="reviews-info">Review: {review.user_review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
