import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import { useNavigate } from "react-router";

const onboardingData = [
  {
    id: "02",
    title: "Find your partner with us",
    description:
      "Amet minim mollit non deserunt sit aliqua dolor do amet sint.",
    image: image1,
    buttonText: "Next",
  },
  {
    id: "03",
    title: "Dating better than ever before",
    description:
      "Amet minim mollit non deserunt sit aliqua dolor do amet sint.",
    image: image2,
    buttonText: "Next",
  },
  {
    id: "04",
    title: "Find your perfect match",
    description:
      "Amet minim mollit non deserunt sit aliqua dolor do amet sint.",
    image: image3,
    buttonText: "Get Started",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      sliderRef.current.slickNext();
    } else {
      navigate("/register");
    }
  };

  return (
    <>
      <div className="flex-1 flex items-center justify-center mt-20">
        <Slider ref={sliderRef} {...settings} className="w-full h-full">
          {onboardingData.map((slide) => (
            <div
              key={slide.id}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="w-full px-10 flex flex-col items-center justify-center">
                <div className="w-[26rem] h-[390px] flex justify-center items-center mb-8">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt="Onboarding illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {slide.title}
                </h1>
                <p className="text-base text-gray-600 mb-10 leading-relaxed text-center">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="px-10 pb-10">
        <div className="flex justify-center gap-2 mb-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-sm transition-colors ${
                currentSlide === index ? "bg-pink-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <button
          className="w-full py-3 bg-pink-500 text-white border-none rounded-3xl text-base font-semibold cursor-pointer transition-colors hover:bg-pink-600"
          onClick={handleNext}
        >
          {onboardingData[currentSlide].buttonText}
        </button>
      </div>
    </>
  );
}
