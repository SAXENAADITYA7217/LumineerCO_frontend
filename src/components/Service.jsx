import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
    Monitor,
    BatteryCharging,
    Cpu,
    MemoryStick,
    HardDrive,
    Fan,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const services = [
    {
        icon: <Monitor />,
        title: "Display Excellence",
        desc: "Original 4K & Retina screen replacements with zero-dead-pixel guarantee.",
        color: "#2563eb",
    },
    {
        icon: <Cpu />,
        title: "Chip-Level Repair",
        desc: "Advanced motherboard diagnostics and micro-soldering by experts.",
        color: "#ef4444",
    },
    {
        icon: <BatteryCharging />,
        title: "Power Up",
        desc: "Long-lasting original batteries to restore your laptop's true mobility.",
        color: "#10b981",
    },
    {
        icon: <HardDrive />,
        title: "Extreme Storage",
        desc: "High-speed NVMe SSD upgrades to make your system 10x faster.",
        color: "#8b5cf6",
    },
    {
        icon: <MemoryStick />,
        title: "Memory Boost",
        desc: "DDR4/DDR5 RAM expansions for seamless high-end multitasking.",
        color: "#f59e0b",
    },
    {
        icon: <Fan />,
        title: "Silent Cooling",
        desc: "Thermal paste renewal and deep fan cleaning for peak performance.",
        color: "#06b6d4",
    },
];

const Service = () => {
    return (
        <section
            id="services"
            className="py-5 position-relative bg-light overflow-hidden"
        >
            <div className="container">

                {/* Header */}
                <div className="text-center mb-5">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="display-4 fw-bold"
                    >
                        Premium Care for <br />
                        <span className="text-primary">
              Your Digital Life
            </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="lead text-secondary mx-auto"
                        style={{ maxWidth: "650px" }}
                    >
                        Professional laptop repair services delivered with surgical
                        precision and genuine parts.
                    </motion.p>
                </div>

                {/* Slider */}
                <div className="position-relative">

                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={25}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: ".service-prev",
                            nextEl: ".service-next",
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {services.map((item, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="card border-0 shadow-sm h-100 position-relative overflow-hidden"
                                    style={{
                                        borderRadius: "30px",
                                        minHeight: "300px",
                                    }}
                                >
                                    <div className="card-body p-4">

                                        {/* Icon */}
                                        <div
                                            className="d-flex align-items-center justify-content-center mb-4"
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "18px",
                                                backgroundColor: item.color,
                                                color: "white",
                                            }}
                                        >
                                            {React.cloneElement(item.icon, {
                                                size: 26,
                                            })}
                                        </div>

                                        {/* Title */}
                                        <h4 className="fw-bold mb-3">
                                            {item.title}
                                        </h4>

                                        {/* Description */}
                                        <p className="text-secondary">
                                            {item.desc}
                                        </p>

                                        {/* Number */}
                                        <span
                                            className="position-absolute bottom-0 end-0 fw-bold text-light"
                                            style={{
                                                fontSize: "4rem",
                                                marginRight: "20px",
                                                marginBottom: "10px",
                                                userSelect: "none",
                                            }}
                                        >
                      0{index + 1}
                    </span>

                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation */}

                    <button
                        className="service-prev btn btn-light shadow position-absolute top-50 start-0 translate-middle-y d-none d-xl-flex align-items-center justify-content-center"
                        style={{
                            width: "50px",
                            height: "50px",
                            zIndex: 10,
                            borderRadius: "12px",
                        }}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        className="service-next btn btn-primary shadow position-absolute top-50 end-0 translate-middle-y d-none d-xl-flex align-items-center justify-content-center"
                        style={{
                            width: "50px",
                            height: "50px",
                            zIndex: 10,
                            borderRadius: "12px",
                        }}
                    >
                        <ChevronRight size={20} />
                    </button>

                </div>
            </div>

            <style>
                {`
          .swiper-pagination-bullet{
            background:#cbd5e1 !important;
            opacity:1 !important;
          }

          .swiper-pagination-bullet-active{
            background:#0d6efd !important;
            width:20px !important;
            border-radius:10px !important;
          }
        `}
            </style>
        </section>
    );
};

export default Service;