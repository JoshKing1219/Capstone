import { useState } from "react";

// function StarRating() {
//   const [rating, setRating] = useState(null);
//   const [hover, setHover] = useState(null);
//   const [totalStars, setTotalStars] = useState(5);
//   console.log("I am on line 7")
//   return (
//     <div className="App">
//       <h1>Star rating</h1>
//       {[...Array(totalStars)].map((star, index) => {
//         const currentRating = index + 1;

//         return (
//           <label key={index}>
//             <input
//               key={star}
//               type="radio"
//               name="rating"
//               value={currentRating}
//               onChange={() => setRating(currentRating)}
//             />
//             <span
//               className="star"
//               style={{
//                 color:
//                   currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
//               }}
//               onMouseEnter={() => setHover(currentRating)}
//               onMouseLeave={() => setHover(null)}
//             >
//               &#9733;
//             </span>
//           </label>
//         );
//       })}
//       <br />
//       <br />
//       <p>Your rating is: {rating}</p> )
// }

// {/* export default StarRating; */}

export default function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);

  return (
    <div id="star-rating">
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ff0000" : "#67fead",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <p id="rating-total">
        Your rating is: <br />
        {rating} / 5
      </p>
    </div>
  );
}
