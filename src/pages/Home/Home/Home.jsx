import React from 'react';
import Banner from '../Banner/Banner';
import Success from '../Success/Success';
import Faq from '../Faq/Faq';
import Brand from '../Brand/Brand';

const storiesPromise = fetch('./data/successStories.json').then(res => res.json())

const Home = () => {
    return (
        <div className='bg-[#F2F9FF]'>
            <Banner></Banner>
            <Success storiesPromise={storiesPromise}></Success>
            <Brand></Brand>
            <Faq></Faq>
        </div>
    );
};

export default Home;