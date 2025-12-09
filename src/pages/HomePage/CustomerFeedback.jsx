import Marquee from "react-fast-marquee";

const feedbacks = [
  "Amazing service! Fast delivery and excellent quality.",
  "I love the product, totally worth the money!",
  "Customer support was super friendly and helpful.",
  "Great experience! I will definitely order again.",
  "Five stars! Highly recommended to everyone.",
  "The packaging was premium. Very impressed.",
  "Smooth transaction and quick response from the seller.",
  "Product quality exceeded my expectations!",
  "Affordable price with outstanding performance.",
  "I received exactly what I expected. Great job!",
];

const CustomerFeedback = () => {
  return (
    <div className="px-4 max-w-7xl mx-auto my-10">
      <div className=" bg-gray-900 py-8 rounded-xl border-x">
        <h2 className="text-center mb-4 font-semibold text-xl">
          Customer Feedback
        </h2>
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="bg-gray-800 text-gray-200 px-6 py-3 mx-4 rounded-xl border border-gray-700 shadow-md"
            >
              ⭐ {feedback}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default CustomerFeedback;
