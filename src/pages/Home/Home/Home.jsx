import React from 'react';
import Banner from '../Banner/Banner';
import Success from '../Success/Success';
import Faq from '../Faq/Faq';
import Brand from '../Brand/Brand';
import TopScholarships from '../TopScholarships/TopScholarships';
import HowScholarStreamWorks from '../HowScholarStreamWorks/HowScholarStreamWorks';
import SmartRecommendations from '../SmartRecommendations/SmartRecommendations';
import BrowseCategory from '../BrowseCategory/BrowseCategory';
import VerifiedScholarships from '../VerifiedScholarships/VerifiedScholarships';
import ImpactStatistics from '../ImpactStatistics/ImpactStatistics';
import CallToAction from '../CallToAction/CallToAction';

const storiesPromise = fetch('./data/successStories.json').then(res => res.json())

const Home = () => {
    return (
        <div className='bg-base-200' style={{
            background: "linear-gradient(to top right, var(--color-gradient-start), var(--color-gradient-end))",
        }}>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <Success storiesPromise={storiesPromise}></Success>
            <HowScholarStreamWorks></HowScholarStreamWorks>
            <SmartRecommendations></SmartRecommendations>
            <BrowseCategory></BrowseCategory>
            <Brand></Brand>
            {/* <VerifiedScholarships></VerifiedScholarships> */}
            <ImpactStatistics></ImpactStatistics>
            <Faq></Faq>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;