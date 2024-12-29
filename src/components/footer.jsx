import React from 'react'

const Footer = () => {
  return (
    <footer className="h-30 bg-blue-400  ">
       <div className=' flex justify-around py-3'>
        <div className='text-center'>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p>
        </div>
        <div>
            <h1 className='text-2xl'>Important links</h1>
            <ul>
                <li>Instagram</li>
                <li>facebook</li>
            </ul>
        </div>
        </div>
    </footer>
  );
}

export default Footer;