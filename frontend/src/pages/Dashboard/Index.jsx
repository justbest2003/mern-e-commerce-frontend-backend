import React from "react";

const Index = () => {
  const cards = [
    {
      title: "Add a new Product",
      description: "Add a new product to the store to be displayed on the shop...",
      buttonText: "Add Product",
      buttonColor: "bg-blue-500 hover:bg-blue-700",
      link: "/dashboard/add-product",
    },
    {
      title: "Manage Items",
      description: "View, edit, and delete products that are currently in the store",
      buttonText: "Manage Items",
      buttonColor: "bg-green-500 hover:bg-green-700",
      link: "/dashboard/manage-items",
    },
    {
      title: "Manage Users",
      description: "View and manage users that have signed up to the store",
      buttonText: "Manage Users",
      buttonColor: "bg-pink-500 hover:bg-pink-700",
      link: "/dashboard/all-users",
    },
    {
      title: "Manage Orders",
      description: "View and manage orders that have been placed by customers",
      buttonText: "Manage Orders",
      buttonColor: "bg-purple-500 hover:bg-purple-700",
      link: "/dashboard/manage-orders",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-500">Welcome to the dashboard</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-gray-900 text-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-gray-300 mt-2">{card.description}</p>
            <a
              href={card.link}
              className={`block mt-4 text-center text-white py-2 px-4 rounded ${card.buttonColor}`}
            >
              {card.buttonText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
