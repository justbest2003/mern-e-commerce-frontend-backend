import { useState } from "react";

const Card = ({ item }) => {
  const { _id, name, image, description, category, price } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-2 z-10 heartStar bg-red rounded-full shadow-lg transform transition-all duration-300 hover:scale-110`}
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="rating-3"
          className={`mask mask-heart ${isHeartFilled ? "bg-white" : ""}`}
        />
      </div>
      <figure>
        <img
          src={image}
          alt=""
          className="hover:scale-105 transition-all duration-300 md:h-60"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-bold">
            {price}
            <span className="text-sm text-red">฿</span>
          </h5>
          <button className="btn bg-red text-white">Add to Card</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
