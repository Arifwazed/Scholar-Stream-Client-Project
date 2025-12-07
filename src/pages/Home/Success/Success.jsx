import React, { use } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import SuccessCard from './SuccessCard';

const Success = ({storiesPromise}) => {
    const stories = use(storiesPromise);
    return (
        <div className='py-20 border'>
            <div className='text-center my-8'>
                <h1 className='text-primary text-4xl md:text-5xl font-semibold'>Real Scholarship Success Stories</h1>
                <p className='my-3 text-lg md:text-xl text-gray-600'>Discover inspiring journeys from students who turned challenges into opportunities through scholarships.</p>
            </div>
            
            
                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3} // default
                    coverflowEffect={{
                        rotate: 10,
                        stretch: '50%',
                        depth: 200,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1, coverflowEffect: { stretch: 0, depth: 100 } },
                        640: { slidesPerView: 1, coverflowEffect: { stretch: 20, depth: 150 } },
                        768: { slidesPerView: 2, coverflowEffect: { stretch: 30, depth: 180 } },
                        1024: { slidesPerView: 3, coverflowEffect: { stretch: 50, depth: 200 } },
                    }}
                    className="mySwiper"
                >
                    {
                        stories.map(story => 
                            <SwiperSlide key={story.id}>
                                <SuccessCard story={story}></SuccessCard>
                                {/* <ReviewCard review={review}></ReviewCard> */}
                                {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            </SwiperSlide>
                        )
                    }
                    
                </Swiper>
        </div>
    );
};

export default Success;