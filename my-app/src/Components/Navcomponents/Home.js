import React from 'react'
import BannerBackground from "../Images/background.jpg";
//import Footer from "../Navcomponents/Footer"
import BannerImage from "../Images/blogg.jpeg.jpg";



const Home = () => {
  return (
    <div>
    <div className="home-container">
    <div className="home-banner-container">
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <div className="home-text-section">
        {/* <h1 className="primary-heading">
          Blogs
        </h1>
        <p className="primary-text">
          bg
        </p> */}
        
      </div>
      <div className='home-section-image'>
        <img className="home-image-section" src={BannerImage} alt="" />
        <p className="primary-text text-prim">
          <a href='#'>Create your first blog</a>
        </p>
      </div>

    </div>
  </div>
  <div class="mbottom-container">
        <p class="mcopy">©Adithya Vikas</p>
    </div>
    
  </div>


  )
}

export default Home