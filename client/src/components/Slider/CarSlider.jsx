import React from "react";
import { images } from "../../assets/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CarSlider.module.css";

const CarSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    
  };
  return (
    // <div className="bg-gray-200 p-8 mb-4">
    //   <div className="p-8  w-3/5 m-auto ">
    //     <Slider {...settings} className={styles["slider"]}>
    //       {images.map((image, index) => {
    //         return (
    //           <div className="mx-8">
    //             <div>
    //               <img src={image} alt="" />
    //             </div>

    //             <div className="flex flex-col items-center">
    //               <p className="border-4 border-red-600 rounded w-1/3 my-2"></p>
    //               <p className="text-black-600 font-bold">
    //                 Lorem ipsum dolor sit amet consectetur.
    //               </p>
    //               <p className="text-center font-medium text-gray-500">
    //                 Book now
    //               </p>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </Slider>
    //   </div>
    // </div>
    <div className='bg-red-500'>
        <Slider {...settings}>
        {
            images.map((obj,index)=>{
                return(
                    <div
                    className={styles['image']}
                    key={index}
                    >
                        <img className='w-3/4 h-56' src={`${images[index]}`} alt="" />

                    </div>
                )
            })
        }
        </Slider>
    </div>
  );
};

export default CarSlider;
