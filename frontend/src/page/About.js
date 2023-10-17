import React from 'react'
import wallpaper from '../assest/walpaper.jpg'

const About = () => {
  return (
    <div className='p-2 mb:p-4'>
       <h2 className='text-xl my-3 text-center md:text-4xl font-semibold text-slate-600'>Our mission is to sell best products over the internet.</h2>
       <div>
          <img src={wallpaper} className='w-full'></img>
       </div>
    </div>
  )
}

export default About