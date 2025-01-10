import { useState } from "react";

const serviceList = [
  {
    id: 1,
    title: "High-Quality Products",
    description: "We offer a curated selection of high-quality products",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description: "We deliver your order promptly to your door",
    image: "/images/home/services/fast-delivery.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    description: "Explore products & order with ease using our Online Ordering",
    image: "/images/home/services/order.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    description: "Give the gift of exceptional dining with SE Shop Gift Cards",
    image: "/images/home/services/gift.png",
  },
];

const Service = () => {
  const [myServices, setMyServices] = useState(serviceList);

  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              "As a software developer, I'm always on the lookout for unique
              accessories to express my love for coding. The Keyboard Key
              Keychain is not only stylish but also durable. Will definitely be
              purchasing more items!"
            </p>
            <a
              className="btn bg-red px-8 py-3 font-semibold text-white rounded-full"
              href="/shop"
            >
              Explore
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {myServices.length > 0 &&
              myServices.map((item) => (
                <div
                  key={item.id}
                  className="shadow-lg rounded-lg py-6 px-6 text-center space-y-4 bg-white hover:bg-indigo-50 text-red-600 cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out border-2 border-transparent hover:border-indigo-500"
                >
                  <img src={item.image} alt="" className="mx-auto h-16" />
                  <h5 className="font-semibold">{item.title}</h5>
                  <p className="text-secondary">{item.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
