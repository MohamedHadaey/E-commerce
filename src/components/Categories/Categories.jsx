import React from 'react'
import './Categories.css'
import { ThreeCircles } from 'react-loader-spinner';
import useAllCategories from '../../CustomHooks/useAllCategories';

export default function Categories() {
  const sharedCategories = useAllCategories();

  if (sharedCategories.isLoading) {
    return <>
      <div id="categories-section">
        <div className="container mx-auto py-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5 p-5">
            <div className="static-card">
              <h3>Our Categories</h3>
              <p> Discover a variety of categories, Click on any category to view its dedicated page and explore related products!</p>
            </div>
          </div>
          <div className="static-card2">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      </div>
    </>
  }

  if (sharedCategories.data) {
    return <>
      <div id="categories-section">
        <div className="container mx-auto py-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5 p-5">
            <div className="static-card">
              <h3>Our Categories</h3>
              <p> Discover a variety of categories, Click on any category to view its dedicated page and explore related products!</p>
            </div>
            {sharedCategories.data.data.data.map((category) => {
              return <div className="category-item" key={category.id}>
                <img src={category.image} className="w-full shadow-lg" alt={category.name} />
                <span>{category.name}</span>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  }
}
