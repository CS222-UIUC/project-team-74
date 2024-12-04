import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ReviewComment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const handymanId = queryParams.get("id");
  const [review, setReview] = useState([]);

  useEffect(() => {
    let token = null;
    try {
      token = localStorage.getItem("token");
    } catch (error) {
      console.error(
        "There was an error retrieving the token from localStorage",
        error
      );
    }

    if (token) {
      axios
        .get(
          `http://127.0.0.1:8000/api/reviews/averageRating/?id=${handymanId}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          setReview(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the reviews!", error);
        });
    } else {
      console.error("No token found in localStorage");
    }
  }, [handymanId]);

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-[#3f3f3f] text-[4.75rem] font-bold font-fraunces mb-4">
        Reviews
      </h1>
      <h1 className="text-[#7b7335] text-[2.50rem] font-bold font-fraunces">
        Handyman ID: {handymanId}
      </h1>
      <h2 className="text-[#7b7335] text-[1.75rem] font-bold font-fraunces mb-9">
        Average Rating: {review.average_rating ? review.average_rating + "/10": "N/A"}
      </h2>

      {review.reviews && review.reviews.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {review.reviews.map((reviewItem) => (
            <div
              key={reviewItem.review_id}
              className="block mx-24 max-w-[70%] w-auto p-6 bg-[#545454] rounded-lg shadow hover:bg-[#6c6a6a]"
            >
              <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Rating: {reviewItem.rating}/10
              </p>
              <h3 className="font-normal text-xl text-gray-100">
                Review ID: {reviewItem.review_id}
              </h3>
              <p className="font-normal text-xl text-gray-100">
                Written By: {reviewItem.written_by}
              </p>
              <p className="font-normal text-xl text-gray-100">
                Comment: &quot;{reviewItem.comment}&quot;
              </p>
              
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-700">No reviews available</p>
      )}
    </div>
  );
}

export default ReviewComment;
