import { useState } from "react";

const categoryItems = [
  {
    id: 1,
    img: "/images/home/category/img1.jpg",
    title: "Clothing",
    number: 59,
  },
  {
    id: 2,
    img: "/images/home/category/img2.jpg",
    title: "Accesssories",
    number: 16,
  },
  {
    id: 3,
    img: "/images/home/category/img3.jpg",
    title: "Gadgets",
    number: 56,
  },
  {
    id: 4,
    img: "/images/home/category/img4.jpg",
    title: "Swag",
    number: 26,
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(categoryItems);

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Categories</h2>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-around items-center">
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.id}
                className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:translate-y-4 transition-all duration-300 hover:shadow-xl "
              >
                <div className="w-full mx-auto flex items-center justify-center">
                  <img
                    src={item.img}
                    alt=""
                    className="bg-red p-2 rounded-full w-28 h-28"
                  />
                </div>
                <div className="mt-5 space-y-1">
                  <h5 className="text-[#1E1E1E] font-semibold">{item.title}</h5>
                  <p className="text-secondary text-sm">
                    ({item.number}) items
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
