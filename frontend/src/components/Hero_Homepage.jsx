import './Hero_Homepage.css'
import { Link } from 'react-router-dom';

function Hero_Homepage() {
  return (
    <>
    <div className="section-homepage">
        <div className="text-homepage">
            <div id="adv-homepage">FASTEST<br/>CHEAPEST<br/>MOST CONVENIENT</div>
            <div>
            <div id="text-above-button-homepage">What are you waiting for?</div>
            <Link to="/post" id="button-homepage">FIND YOUR HANDYMEN NOW</Link>
            </div>
        </div>
        <img id="repair-homepage" src='/images/image3.jpeg' alt='repair man' />
    </div>

    <div className="section-homepage" id='reverse-homepage'>
        <div className="text-homepage" id="text-reverse-homepage">
            <div><i className="fas fa-check-circle" style={{color:'#9E8C61'}}/> Skilled Handymen</div>
            <div><i className="fas fa-check-circle" style={{color:'#9E8C61'}}/> Easy Job Posting</div>
            <div><i className="fas fa-check-circle" style={{color:'#9E8C61'}}/> Direct Chat</div>
            <div><i className="fas fa-check-circle" style={{color:'#9E8C61'}}/> Secure Payment</div>
            <div><i className="fas fa-check-circle" style={{color:'#9E8C61'}}/> Location-Based Search</div>
            <div><i className="fas fa-check-circle" style={{color:'#9E8C61'}}/> Full of Reviews</div>
        </div>
        <img id="repair-reverse-homepage" src='/images/image2.png' alt='repair man' />
    </div>

    <div className="section-homepage" style={{ height: "500px" }}>
      <div className="grid-container-homepage">
        <div id="review-title-homepage">Review</div>
        <Link to="/post" id="button-end1-homepage">Find Your Handymen</Link>
        <Link to="/browse" id="button-end2-homepage">Browse Handyman Profile</Link>
        <div id="review-text-homepage">&quot;HandyHelper made it incredibly easy to find trustworthy handymen. I quickly connected with a local student for a repair, and the whole process—from messaging to payment—was seamless. Highly recommend it for college students needing affordable, reliable help!&quot;</div>
      </div>
    </div>
    </>
  )
}

export default Hero_Homepage