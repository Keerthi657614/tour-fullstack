import React, { useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Booking = ({ tour, avgRating }) => {
    const { price, reviews } = tour;
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!credentials.fullName || !credentials.phone || !credentials.bookAt || !credentials.guestSize) {
            setError('Please fill in all required fields.');
            return;
        }

        setError('');
        navigate('/thank-you');
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>${price}<span>/per person</span></h3>
                <span className="tour__rating d-flex align-items-center">
                    <i className="ri-star-s-fill"></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>

            <div className="booking__form">
                <h5>Information</h5>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form className="booking__info-form" onSubmit={handleSubmit}>
                    <FormGroup>
                        <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input type="date" id="bookAt" required onChange={handleChange} />
                        <input type="number" placeholder="Guest" id="guestSize" min="1" required onChange={handleChange} />
                    </FormGroup>
                    <Button className="btn primary__btn w-100 mt-4" type="submit">
                        Book Now
                    </Button>
                </Form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            ${price} <i className="ri-close-line"></i> {credentials.guestSize} person(s)
                        </h5>
                        <span>${price * credentials.guestSize}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Service charge</h5>
                        <span>${serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>${totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    );
};

export default Booking;
