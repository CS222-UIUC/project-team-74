import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <>
    <div className="section">
        <div className="text">
            <div id="adv">FASTEST<br/>CHEAPEST<br/>MOST CONVENIENT</div>
            <div>
            <div id="text-above-button">What are you waiting for?</div>
            <div id="button">FIND YOUR HANDYMEN NOW</div>
            </div>
        </div>
        <img id="repair" src='/images/image3.jpeg' alt='repair man' />
    </div>

    <div className="section" id='reverse'>
        <div className="text" id="text-reverse">
            <div><i class="fas fa-check-circle" style={{color:'tomato'}}/> Skilled Handymen</div>
            <div><i class="fas fa-check-circle" style={{color:'tomato'}}/> Easy Job Posting</div>
            <div><i class="fas fa-check-circle" style={{color:'tomato'}}/> Direct Chat</div>
            <div><i class="fas fa-check-circle" style={{color:'tomato'}}/> Secure Payment</div>
            <div><i class="fas fa-check-circle" style={{color:'tomato'}}/> Location-Based Search</div>
            <div><i class="fas fa-check-circle" style={{color:'tomato'}}/> Full of Reviews</div>
        </div>
        <img id="repair-reverse" src='/images/image2.png' alt='repair man' />
    </div>
    </>
  )
}

export default Hero