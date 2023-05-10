import React from "react";

const Categories = ({ categories,setSelectCat }) => {
  function Changecat(x){
    setSelectCat(x);
    console.log(x);
  }
  
  return (
    <div className="category-container">
        {/* <div className="category-options"> */}
          <h3 style={{color: "rgb(120, 120, 120)"}}>Categories</h3>
        {/* </div> */}
          {categories.map((cat) => {
        return (
          <div key={cat.id} className="category-options">
            <button className="btn success" onClick={()=>{Changecat(cat.value)}}>{cat.value}</button>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
