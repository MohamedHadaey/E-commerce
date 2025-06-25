import React from 'react'
import '../Categories/Categories.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';

export default function Brands() {

  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  };

  const { data, isLoading } = useQuery({
    queryKey: ['allBrands'],
    queryFn: getAllBrands,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <>
      <div id="categories-section">
        <div className="container mx-auto py-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5 p-5">
            <div className="static-card">
              <h3>Our Brands</h3>
              <p>You can see our categories and each category has its own page.</p>
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

  if (data) {
    return <>
      <div id="categories-section">
        <div className="container mx-auto py-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5 p-5">
            <div className="static-card">
              <h3>Our Brands</h3>
              <p>You can see our brands and each brand has its own page.</p>
            </div>
            {data.data.data.map((category) => {
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
