import React from 'react'

import './Hero_AboutUs.css'

import { useEffect } from 'react';

function Hero_AboutUs() {



  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show2');
        } else {
          entry.target.classList.remove('show2');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden2'); 
    hiddenElements.forEach((el) => observer.observe(el));

  
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div className="section-aboutus hidden2">
        <img id='bg-image-aboutus' src='public\images\image5.jpg' />
        <div className='container-aboutus'>
            <h1 className='title-aboutus'>Who are we?</h1>
            <p className='text-aboutus'><strong><i>HandyHelper</i></strong> is a platform designed by college students for college students, offering a reliable and easy way to connect with skilled, verified handymen for various maintenance tasks. Our mission is to provide an affordable, trustworthy solution to help students find the right help, when they need it. From moving assistance to repairs, HandyHelper simplifies the process of finding the right person for the job, all through a user-friendly interface that includes secure payment, real-time messaging, and location-based matching.</p>
        </div>
    </div>
    </>
  )
}

export default Hero_AboutUs
