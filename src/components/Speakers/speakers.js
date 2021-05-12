import React, { useState, useEffect } from 'react';
import SpeakerSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';
import axios from 'axios';
const Speakers = () => {

    const [searchQuery, setSearchQuery] = useState("");
    /* const speakersArray = [
        {
            imageSrc: 'speaker-component-1124',
            name: 'Douglas Crockford',
            id: 1124,
            firstName: 'Douglas',
            lastName: 'Crockford',
            sat: true,
            sun: false,
            isFavorite: false,
            bio:
                'Douglas Crockford discovered the JSON Data Interchange Format. He is also the author of _JavaScript: The Good Parts_. He has been called a guru, but he is actually more of a mahatma.',
        },
        {
            imageSrc: 'speaker-component-1530',
            name: 'Tamara Baker',
            id: 1530,
            firstName: 'Tamara',
            lastName: 'Baker',
            sat: false,
            sun: true,
            isFavorite: true,
            bio:
                'Tammy has held a number of executive and management roles over the past 15 years, including VP engineering Roles at Molekule Inc., Cantaloupe Systems, E-Color, and Untangle Inc.',
        },
        {
            imageSrc: 'speaker-component-10803',
            name: 'Eugene Chuvyrov',
            id: 10803,
            firstName: 'Eugene',
            lastName: 'Chuvyrov',
            sat: true,
            sun: false,
            isFavorite: false,
            bio:
                'Eugene Chuvyrov is  a Senior Cloud Architect at Microsoft. He works directly with both startups and enterprises to enable their solutions in Microsoft cloud, and to make Azure better as a result of this work with partners.',
        },
    ]; */

    const [speakers, setSpeakers] = useState([]);
    const REQUEST_STATUS = {
        LOADING: "loading",
        SUCCESS: "success",
        ERROR: "error"
    }
    const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/speakers');
                setSpeakers(response.data);
                setStatus(REQUEST_STATUS.SUCCESS)
            }
            catch (e) {
                setStatus(REQUEST_STATUS.ERROR);
                setError(e);
            }
        }
        fetchData();
    }, [])
    const filteredSpeakers = speakers.filter((speaker) => {
        const targetString = `${speaker.firstName} ${speaker.lastName}`.toLowerCase();
        return searchQuery.length === 0 ? true : targetString.includes(searchQuery.toLowerCase());
    });
    function toggleSpeakerFavorite(speakerRec) {

        return {
            ...speakerRec,
            isFavorite: !speakerRec.isFavorite,
        };
    }
    async function onFavoriteToggleHandler(speakerRec) {

        const toggledSpeakerRec = toggleSpeakerFavorite(speakerRec)

        const newSpeakers = speakers.map((speaker) =>
            speaker.id === toggledSpeakerRec.id ? toggledSpeakerRec : speaker
        )
        try {
            await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledSpeakerRec);
            setSpeakers(newSpeakers)
        }
        catch (e) {
            setStatus(REQUEST_STATUS.ERROR);
            setError(e);
        }

    }

    const success = status === REQUEST_STATUS.SUCCESS;
    const isLoading = status === REQUEST_STATUS.LOADING;
    const hasErrored = status === REQUEST_STATUS.ERROR;
    return (
        <div>
            <SpeakerSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {isLoading && <div>Loading...</div>}
            {hasErrored && (
                <div>
                    Loading error... Is the json-server running? (try "npm run
                    json-server" at terminal prompt)
                    <br />
                    <b>ERROR: {error.message}</b>
                </div>
            )}
            {success && (<div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
                {filteredSpeakers.map((speaker) => (
                    <Speaker key={speaker.id} {...speaker}
                        onFavoriteToggle={() => onFavoriteToggleHandler(speaker)} />
                ))}
            </div>)}
        </div>

    );
};
export default Speakers;