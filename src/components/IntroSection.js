import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroSection.css';

const IntroSection = () => {
    const navigate = useNavigate();

  return (
    <>
        <section className="showcase">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img-a img-cover-center"></div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Welcome to Hayley Travel!</h2>
                        <p className="lead mb-0">Are you ready to embark on your next unforgettable adventure? Look no further because we've got you covered! At Hayley Travel, we specialize in crafting personalized travel experiences tailored to your unique preferences. Whether you're seeking a thrilling getaway, a relaxing beach retreat, or a cultural exploration, our comprehensive website offers a wide range of options to satisfy your wanderlust.</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 text-white showcase-img-b img-cover-center"></div>
                    <div className="col-lg-6 my-auto showcase-text">
                        <h2>We understand that every traveler has different priorities,</h2>
                        <p className="lead mb-0">which is why we want to know exactly what you're looking for. Are you in search of the perfect flights to whisk you away to your dream destination? Our flight search feature allows you to compare prices, airlines, and schedules to find the most convenient and affordable options for your journey.</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img-c img-cover-center"></div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Perhaps you're in need of a comfortable and cozy place to rest your head after a day of exploration.</h2>
                        <p className="lead mb-0">Our hotel search functionality empowers you to browse through a vast selection of accommodations, ranging from luxurious resorts to budget-friendly guesthouses, ensuring that you find the ideal home away from home.</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 text-white showcase-img-d img-cover-center"></div>
                    <div className="col-lg-6 my-auto showcase-text">
                        <h2>If you're looking for an immersive and guided experience, our tour search feature is here to help.</h2>
                        <p className="lead mb-0">Discover captivating itineraries, knowledgeable guides, and awe-inspiring destinations that will leave you with memories to last a lifetime. Whether you're interested in a thrilling wildlife safari, a historical city tour, or an adventurous hiking expedition, we have an array of options to suit your interests.</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img-e img-cover-center"></div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Your journey begins here, and we're committed to making it as seamless and enjoyable as possible.</h2>
                        <p className="lead mb-0">Let us know what you're after, and we'll help you create the perfect itinerary that matches your desires and budget. Our team of travel experts is always ready to assist you, ensuring that every step of your journey is filled with excitement, relaxation, and discovery.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className='app-container flex-full-center hero-full-vh'>
            <div className='app-content flex-full-center flex-column'>
                <h1 className="display-5 text-center fw-bold text-body-emphasis lh-1 mb-3">So, are you ready to embark on your next great adventure?</h1>
                <p className='fs-4 text-embark text-center'>Choose from <a className='link-embark'>flight search</a>, <a className='link-embark'>hotel booking</a>, or <a className='link-embark'>explore tours</a>, and let's make your travel dreams come true.</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type="button" className="btn-intro btn-lg fw-bold" onClick={ () => navigate('/flights') }>Search</button>
                    <button type="button" className="btn-intro btn-lg fw-bold">Book</button>
                    <button type="button" className="btn-intro btn-lg fw-bold">Explore</button>
                </div>
            </div>
        </section>

        <section className="cta">
            <div className="cta-content">
                <div className="container px-5">
                    <h2 className="text-white display-1 lh-1 mb-4">
                        Welcome to Hayley Travel,
                        <br />
                        where the world is yours to explore!
                    </h2>
                    <a className="btn btn-outline-light py-3 px-4 rounded-pill" href="#" onClick={ () => navigate('/flights') }>Search Flights</a> &nbsp;
                    <a className="btn btn-outline-light py-3 px-4 rounded-pill" href="#" target="_blank">Book Hotels</a> &nbsp;
                    <a className="btn btn-outline-light py-3 px-4 rounded-pill" href="#" target="_blank">Explore Tours</a>
                </div>
            </div>
        </section>

    </>
  )
}

export default IntroSection;
