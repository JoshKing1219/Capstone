import { useNavigate } from "react-router";
import { useGetTheoriesQuery } from "../api/index.js";

const AllTheories = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, isSuccess } = useGetTheoriesQuery();

  return (
    <section id="all-theories-page">
      {isLoading && <p>Loading Theories...</p>}
      {error && (
        <p>
          Oopsie daisy! Something went wrong!
          <br />
          Please try again!
        </p>
      )}
      <div id="theory-library">
        <div id="library-intro-container">
          <h2 id="library-intro-title">The Library of Theories</h2>
          <p className="library-descrip">
            Below is a mass collection of all the conspiracy theories currently
            in our database. There is also a drop-down menu that will filter the
            conspiracy theories based on it's primary subject (i.e. Politics,
            Science & Technology, Medicine, etc.).
          </p>
          <p className="library-descrip">
            The "See Details" button will allow you to view the following: a
            brief description of the conspiracy theory you've chosen, a form to
            submit a review for the chosen conspiracy theory, and all reviews
            and user comments related to the chosen conspiracy theory.
          </p>
          <p className="library-descrip">
            You must either register for an account or login to your existing
            account in order to submit a review and comment on other people's
            reviews. You may only submit one review per conspiracy theory.
          </p>
          <div id="dropdown">
            <div id="dropdown-button-container">
              <button id="dropdown-button">Select a Subject:</button>
            </div>
            <div className="dropdown-content">
              <a href="#" className="theory-type">
                All Theories (default)
              </a>
              <a href="#" className="theory-type">
                Politics
              </a>
              <a href="#" className="theory-type">
                Science & Technology
              </a>
              <a href="#" className="theory-type">
                Weather
              </a>
              <a href="#" className="theory-type">
                Aliens
              </a>
              <a href="#" className="theory-type">
                Space
              </a>
              <a href="#" className="theory-type">
                Society
              </a>
              <a href="#" className="theory-type">
                Medicine
              </a>
              <a href="#" className="theory-type">
                Religion
              </a>
              <a href="#" className="theory-type">
                Cover-Ups
              </a>
            </div>
          </div>
        </div>
        {data?.map((theory) => (
          <div key={theory.id} className="theory-container">
            <div className="theory-title-container">
              <h2 className="theory-title">{theory.title}</h2>
            </div>
            <div className="theory-image-container">
              <img
                className="theory-image"
                src={theory.image_url}
                alt={theory.title}
              />
            </div>
            <div className="theory-details-container">
              {/* <p>Score: {theory.reviews.score}</p> */}
              <button
                onClick={() => navigate(`/theory/${theory.id}`)}
                className="details-button"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllTheories;
