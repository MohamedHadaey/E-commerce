import React from 'react'
import '../Categories/Categories.css'
import { ThreeCircles } from 'react-loader-spinner';
import useAllBrands from '../../CustomHooks/useAllBrands';

export default function Brands() {
  const sharedBrands = useAllBrands();

  if (sharedBrands.isLoading) {
    return <>
      <div id="categories-section">
        <div className="container mx-auto py-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5 p-5">
            <div className="static-card">
              <h3>Our Brands</h3>
              <p> Discover our featured brands, Click on any brand to view its dedicated page and explore their products!</p>
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

  if (sharedBrands.data) {
    return <>
      <div id="categories-section">
        <div className="container mx-auto py-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5 p-5">
            <div className="static-card">
              <h3>Our Brands</h3>
              <p> Discover our featured brands, Click on any brand to view its dedicated page and explore their products!</p>
            </div>
            {sharedBrands.data.data.data.map((category) => {
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
