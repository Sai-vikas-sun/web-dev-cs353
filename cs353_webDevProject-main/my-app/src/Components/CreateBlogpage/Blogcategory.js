import React from 'react'
import {useState} from 'react'
// import {MultiSelect} from 'multiselect-react-dropdown';
// npm i react-select
import Select from 'react-select';
const Blogcategory = ({categories,blogData,setBlogData}) => {
  const [selectedCateg,setSelectedCateg] = useState(null);

  const handleSelect=(selItems)=>{
    const options = []
    for(let i=0;i<selItems.length;i++){
      options.push(selItems[i].value);
    }
   setSelectedCateg(options);
   setBlogData({...blogData,category:options})
    // console.log(options);
  }
  // const options = [
  //   {value: "web", label: "Web"},
  //   {value: "cn", label: "CN"}
  //             ]
  return (
    <>
        <label htmlFor='categ'>Select Categories</label>
        <Select 
          isMulti
          defaultValue={selectedCateg}
          onChange={handleSelect}
          options = {categories}
        >
         
        </Select>
    </>
  )
}

export default Blogcategory

