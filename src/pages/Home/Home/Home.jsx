import React from 'react';
import Banner from '../Banner/Banner';
import Success from '../Success/Success';

const storiesPromise = fetch('./data/successStories.json').then(res => res.json())

const Home = () => {
    return (
        <div className='bg-[#F2F9FF]'>
            <Banner></Banner>
            <Success storiesPromise={storiesPromise}></Success>
        </div>
    );
};

export default Home;