const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-lg p-4 mb-3">
      <h3 className="font-semibold">
        {review.user?.name}
      </h3>

      <p>
        {review.rating}/5
      </p>

      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;