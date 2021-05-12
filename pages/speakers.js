import Speakers from '../src/components/Speakers/Speakers';
import Layout from '../src/components/Layout/Layout';

export default function Page() {
    return (
        <Layout>
            <Speakers />
        </Layout>
    );
}




// code when using Patterns

/* import React from "react";
import Header from "../src/components/Header/header";
import Footer from "../src/components/Footer/footer";
import Searchbar from "../src/components/Searchbar/searchbar";
import Menu from "../src/components/Menu/menu";
import Speakers from "../src/components/Speakers/speakers";
import SpeakerContext from "../src/components/Speakers/SpeakerContext";
import Layout from '../src/components/Layout/Layout';

function page() {

    const speakers = [
        {
            imageSrc: 'speaker-component-1124',
            name: 'Douglas Crockford',
        },
        {
            imageSrc: 'speaker-component-1530',
            name: 'Tamara Baker',
        },
        {
            imageSrc: 'speaker-component-10803',
            name: 'Eugene Chuvyrov',
        },
    ];

    return (
        <>
            <Header />
            <Menu />
            <SpeakerContext.Provider value={speakers}>
                <Searchbar />
                <Layout>
                    <Speakers />
                </Layout>
            </SpeakerContext.Provider>
            <Footer />
        </>
    )
}
export default page; */