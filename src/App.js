import { useState } from 'react';
import Form from "./components/Form";
import Table from "./components/Table";
import { findCountry } from "./helpers/findCountry";
import './App.css';

const lang = "en-US";
const marketCountry = "UA";

const getCountryUrl = (currency) =>
    `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${marketCountry}/${currency}/${lang}/?query=`;

const App = () => {
    const [departureFlightData, setDepartureData] = useState({});
    const [arriveFlightData, setArriveData] = useState({});

    const findCountryFrom = async (from, currency) => {
        if (!from || !currency) {
            return;
        }

        const storedResults = await findCountry(from, getCountryUrl(currency));

        return storedResults?.[0];
    }

    const findCountryTo = async (to, currency) => {
        if (!to || !currency) {
            return;
        }

        const storedResults = await findCountry(to, getCountryUrl(currency));

        return storedResults?.[0];
    }

    const getFlightData = async (options) => {
        const { departureDate, arriveDate, from, to, currency } = options;

        const fromCountry = await findCountryFrom(from, currency);
        const toCountry = await findCountryTo(to, currency);

        if (!departureDate || !arriveDate || !fromCountry || !toCountry || !currency) {
            return;
        }

        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${marketCountry}/${currency}/${lang}/${fromCountry?.PlaceId}/${toCountry?.PlaceId}/${departureDate}`, {
            headers: {
                "x-rapidapi-key": "ab45838c7cmsh9ac1edb62d199a4p1e3ca7jsnc9b68cdbfc9f",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "useQueryString": true
            },
        }).then(data => data.json()).then(data =>
            setDepartureData({...data, Places: { from: fromCountry.PlaceId, to: toCountry.PlaceId }}));

        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${marketCountry}/${currency}/${lang}/${toCountry?.PlaceId}/${fromCountry?.PlaceId}/${arriveDate}`, {
            headers: {
                "x-rapidapi-key": "ab45838c7cmsh9ac1edb62d199a4p1e3ca7jsnc9b68cdbfc9f",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "useQueryString": true
            },
        }).then(data => data.json()).then(data =>
            setArriveData({...data, Places: { from: toCountry.PlaceId, to: fromCountry.PlaceId }}));
    };

    return (
        <div className="app">
            <Form getFlightData={getFlightData} />
            <Table departureFlightData={departureFlightData} arriveFlightData={arriveFlightData}/>
        </div>
    );
}

export default App;
