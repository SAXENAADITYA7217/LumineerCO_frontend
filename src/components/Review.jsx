import React from "react";
import { Quote, Star } from "lucide-react";

const Review = () => {
    const reviews = [
        {
            name: "Rahul Sharma",
            role: "Student",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            review: "Amazing service! My laptop was repaired within a day.",
        },
        {
            name: "Priya Verma",
            role: "Designer",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            review: "Very professional technicians. Pickup was smooth.",
        },
        {
            name: "Amit Kumar",
            role: "Developer",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            review: "Fast and reliable service. Highly recommended.",
        },
        {
            name: "Sneha Gupta",
            role: "Freelancer",
            image: "https://randomuser.me/api/portraits/women/4.jpg",
            review: "Affordable pricing and quick repair service.",
        },
    ];

    return (
        <section className="py-5 bg-light">
            <div className="container">

                {/* Heading */}
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold">
                        Our <span className="text-primary">Happy</span> Customers
                    </h2>

                    <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
                        Don't just take our word for it. Here is what our clients
                        have to say about our laptop repair services.
                    </p>
                </div>

                {/* Carousel */}
                <div
                    id="reviewCarousel"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                >
                    {/* Indicators */}
                    <div className="carousel-indicators">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#reviewCarousel"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                            ></button>
                        ))}
                    </div>

                    {/* Slides */}
                    <div className="carousel-inner">

                        {reviews.map((item, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${
                                    index === 0 ? "active" : ""
                                }`}
                            >
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="card border-0 shadow-lg rounded-4 p-4"
                                        style={{
                                            maxWidth: "700px",
                                            width: "100%",
                                        }}
                                    >
                                        <div className="card-body">

                                            <div className="d-flex justify-content-between align-items-start mb-4">

                                                <div className="d-flex align-items-center gap-3">

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="rounded-circle border border-2 border-primary"
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                            objectFit: "cover",
                                                        }}
                                                    />

                                                    <div>
                                                        <h5 className="fw-bold mb-1">
                                                            {item.name}
                                                        </h5>

                                                        <p className="text-primary mb-0">
                                                            {item.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Quote
                                                    size={40}
                                                    className="text-primary opacity-25"
                                                />
                                            </div>

                                            <p className="text-muted fs-5">
                                                "{item.review}"
                                            </p>

                                            <div className="d-flex gap-1 mt-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        fill="#ffc107"
                                                        color="#ffc107"
                                                    />
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Previous */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#reviewCarousel"
                        data-bs-slide="prev"
                    >
            <span
                className="carousel-control-prev-icon bg-dark rounded-circle p-3"
            ></span>
                    </button>

                    {/* Next */}
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#reviewCarousel"
                        data-bs-slide="next"
                    >
            <span
                className="carousel-control-next-icon bg-dark rounded-circle p-3"
            ></span>
                    </button>

                </div>
            </div>
        </section>
    );
};

export default Review;