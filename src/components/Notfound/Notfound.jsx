import React from 'react';
import notFoundImg from '../../assets/images/notfound.svg';

export default function Notfound() {
  return <>
    <div id="notfound">
      <div className="container mx-auto  px-5 py-10">
          <img src={notFoundImg} alt="not found image" className='w-full' style={{maxWidth: '600px', margin: '0 auto'}}/>
      </div>
    </div>
  </>
}
