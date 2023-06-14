import React, { useState } from "react";
import useClasses from "../../../hooks/useClasses";

const SliderHome = () => {
  const [classes, refetch] = useClasses();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === classes.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(classes.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="carousel w-full bg-light">
      {classes.map((classItem, index) => (
        <div
          key={index}
          id={`slide${index + 1}`}
          className={`carousel-item relative w-full flex ${
            activeIndex === index ? "active" : ""
          }`}
        >
          <div className="w-1/2">
            <img
              src={classItem.image}
              className="w-full max-h-400"
              alt="Slider Image"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <h2>{classItem.name}</h2>
            <p>Price: {classItem.price}</p>
            <p>Instructor: {classItem.instructor}</p>
            <div className="available-seats">
              <span>Available Seats:</span>
              <span>{classItem.availableSeats}</span>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${index === 0 ? classes.length : index}`}
              className="btn btn-circle"
              onClick={handlePrev}
            >
              ❮
            </a>
            <a
              href={`#slide${index === classes.length - 1 ? 1 : index + 2}`}
              className="btn btn-circle"
              onClick={handleNext}
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SliderHome;
