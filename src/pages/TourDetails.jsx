// import React, { useRef, useState } from "react";
// import '../styles/tour-details.css';
// import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
// import { useParams } from 'react-router-dom';
// import tourData from '../assets/data/tours';
// import calculateAvgRating from './../utils/avgRating';
// import avatar from '../assets/images/avatar.jpg';
// import Booking from "../components/Booking/Booking";
// import Newsletter from '../shared/Newsletter';

// const TourDetails = () => {
//     const { id } = useParams();
//     const reviewMsgRef = useRef('');
//     const [tourRating, setTourRating] = useState(null);
//     const [userReviews, setUserReviews] = useState([]); // State for user reviews

//     const tour = tourData.find(tour => tour.id === id);

//     // Destructure properties from tour object
//     const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour;

//     const { totalRating, avgRating } = calculateAvgRating(reviews);
//     const options = { day: 'numeric', month: 'long', year: 'numeric' };

//     const submitHandler = e => {
//         e.preventDefault();
//         const reviewText = reviewMsgRef.current.value;
//         if (reviewText && tourRating) {
//             const newReview = {
//                 user: 'Guest', // Replace with user data if available
//                 date: new Date().toLocaleDateString('en-US', options),
//                 rating: tourRating,
//                 text: reviewText,
//             };
//             setUserReviews([newReview, ...userReviews]);
//             reviewMsgRef.current.value = ''; // Clear input field
//         }
//     };

//     return (
//         <>
//             <section>
//                 <Container>
//                     <Row>
//                         <Col lg='8'>
//                             <div className="tour__content">
//                                 <img src={photo} alt="" />
//                                 <div className="tour__info">
//                                     <h2>{title}</h2>
//                                     <div className="d-flex align-items-center gap-5">
//                                         <span className="tour__rating d-flex align-items-center gap-1">
//                                             <i className="ri-star-s-fill" style={{ 'color': "var(--secondary-color)" }}></i>
//                                             {avgRating === 0 ? null : avgRating}
//                                             {totalRating === 0 ? "Not rated" : (
//                                                 <span>({reviews?.length})</span>
//                                             )}
//                                         </span>
//                                         <span>
//                                             <i className="ri-map-pin-user-fill"></i>{address}
//                                         </span>
//                                     </div>
//                                     <div className="tour__extra-details">
//                                         <span><i className="ri-map-pin-2-line"></i>{city}</span>
//                                         <span><i className="ri-money-dollar-circle-line"></i>${price}/per person</span>
//                                         <span><i className="ri-map-pin-time-line"></i>${distance}k/m</span>
//                                         <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
//                                     </div>
//                                     <h5>Description</h5>
//                                     <p>{desc}</p>
//                                 </div>
//                                 <div className="tour__reviews mt-4">
//                                     <h4>Reviews ({[...reviews, ...userReviews].length} reviews)</h4>
//                                     <Form onSubmit={submitHandler}>
//                                         <div className="d-flex align-items-center gap-3 mb-4 rating__group">
//                                             {[1, 2, 3, 4, 5].map(num => (
//                                                 <span key={num} onClick={() => setTourRating(num)}>
//                                                     {num} <i className="ri-star-s-fill"></i>
//                                                 </span>
//                                             ))}
//                                         </div>
//                                         <div className="review__input">
//                                             <input
//                                                 type="text"
//                                                 ref={reviewMsgRef}
//                                                 placeholder="Share your thoughts"
//                                                 required
//                                             />
//                                             <button className="btn primary__btn text-white" type="submit">
//                                                 Submit
//                                             </button>
//                                         </div>
//                                     </Form>

//                                     <ListGroup className="user__reviews">
//                                         {[...reviews, ...userReviews].map((review, index) => (
//                                             <div className="review__item" key={index}>
//                                                 <img src={avatar} alt="" />
//                                                 <div className="w-100">
//                                                     <div className="d-flex align-items-center justify-content-between">
//                                                         <div>
//                                                             <h5>{review.user || 'Guest'}</h5>
//                                                             <p>{review.date}</p>
//                                                         </div>
//                                                         <span className="d-flex align-items-center">
//                                                             {review.rating}<i className="ri-star-s-fill"></i>
//                                                         </span>
//                                                     </div>
//                                                     <h6>{review.text}</h6>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </ListGroup>
//                                 </div>
//                             </div>
//                         </Col>

//                         <Col lg='4'>
//                             <Booking tour={tour} avgRating={avgRating} />
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>
//             <Newsletter />
//         </>
//     );
// };

// export default TourDetails;
import React, { useRef, useState, useEffect } from "react";
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import tourData from '../assets/data/tours';
import calculateAvgRating from './../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from "../components/Booking/Booking";
import Newsletter from '../shared/Newsletter';

const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);
    const [userReviews, setUserReviews] = useState([]); // State for user reviews
    const [avgRating, setAvgRating] = useState(0); // State for average rating

    const tour = tourData.find(tour => tour.id === id);

    // Destructure properties from tour object
    const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour;

    // Use effect to calculate average rating dynamically when reviews or userReviews change
    useEffect(() => {
        const allReviews = [...reviews, ...userReviews];
        const { avgRating } = calculateAvgRating(allReviews);
        setAvgRating(avgRating);
    }, [reviews, userReviews]); // Recalculate whenever reviews or userReviews change

    const { totalRating } = calculateAvgRating(reviews); // Total rating from initial reviews

    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const submitHandler = e => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;
        if (reviewText && tourRating) {
            const newReview = {
                user: 'Guest', // Replace with user data if available
                date: new Date().toLocaleDateString('en-US', options),
                rating: tourRating,
                text: reviewText,
            };
            setUserReviews([newReview, ...userReviews]);
            reviewMsgRef.current.value = ''; // Clear input field
        }
    };

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg='8'>
                            <div className="tour__content">
                                <img src={photo} alt="" />
                                <div className="tour__info">
                                    <h2>{title}</h2>
                                    <div className="d-flex align-items-center gap-5">
                                        <span className="tour__rating d-flex align-items-center gap-1">
                                            <i className="ri-star-s-fill" style={{ 'color': "var(--secondary-color)" }}></i>
                                            {avgRating === 0 ? null : avgRating}
                                            {totalRating === 0 ? "Not rated" : (
                                                <span>({reviews?.length})</span>
                                            )}
                                        </span>
                                        <span>
                                            <i className="ri-map-pin-user-fill"></i>{address}
                                        </span>
                                    </div>
                                    <div className="tour__extra-details">
                                        <span><i className="ri-map-pin-2-line"></i>{city}</span>
                                        <span><i className="ri-money-dollar-circle-line"></i>${price}/per person</span>
                                        <span><i className="ri-map-pin-time-line"></i>${distance}k/m</span>
                                        <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
                                    </div>
                                    <h5>Description</h5>
                                    <p>{desc}</p>
                                </div>
                                <div className="tour__reviews mt-4">
                                    <h4>Reviews ({[...reviews, ...userReviews].length} reviews)</h4>
                                    <Form onSubmit={submitHandler}>
                                        <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <span key={num} onClick={() => setTourRating(num)}>
                                                    {num} <i className="ri-star-s-fill"></i>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="review__input">
                                            <input
                                                type="text"
                                                ref={reviewMsgRef}
                                                placeholder="Share your thoughts"
                                                required
                                            />
                                            <button className="btn primary__btn text-white" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </Form>

                                    <ListGroup className="user__reviews">
                                        {[...reviews, ...userReviews].map((review, index) => (
                                            <div className="review__item" key={index}>
                                                <img src={avatar} alt="" />
                                                <div className="w-100">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <h5>{review.user || 'Guest'}</h5>
                                                            <p>{review.date}</p>
                                                        </div>
                                                        <span className="d-flex align-items-center">
                                                            {review.rating}<i className="ri-star-s-fill"></i>
                                                        </span>
                                                    </div>
                                                    <h6>{review.text}</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </ListGroup>
                                </div>
                            </div>
                        </Col>

                        <Col lg='4'>
                            <Booking tour={tour} avgRating={avgRating} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default TourDetails;
