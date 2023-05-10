import React from "react";

const Categories = ({ categories }) => {
  return (
    <div className="category-container">
        {/* <div className="category-options"> */}
          <h3 style={{color: "rgb(120, 120, 120)"}}>Categories</h3>
        {/* </div> */}
          {categories.map((cat) => {
        return (
          <div key={cat.id} className="category-options">
            <h3>{cat.value}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
