import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './mySwiper.css';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function MySwiper() {
    
    const imageClass = 'md:w-[100%] md:h-[350px]';

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div className=''>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >

                <SwiperSlide><img className={imageClass} src="https://t4.ftcdn.net/jpg/01/26/65/59/360_F_126655980_lewSwaiVCOjCviDw2KDwwD4NvGGeOCOz.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className={imageClass} src="https://static.vecteezy.com/system/resources/previews/007/343/533/non_2x/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className={imageClass} src="https://static.vecteezy.com/system/resources/previews/009/922/020/non_2x/time-to-study-banner-with-kids-back-to-school-children-with-books-and-flowers-flat-illustration-vector.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className={imageClass} src="https://img.freepik.com/premium-vector/abstract-coding-programming-banner-background-with-digital-binary-data-gears-digital-pixels_618588-1696.jpg" alt="" /></SwiperSlide>
            
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
}
export default MySwiper