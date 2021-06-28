import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledDD = styled.dd`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const StyledSpanNoWrap = styled.span`
    white-space: nowrap;
    margin-right: 10px;
`;

const convertDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

export const Form = ({ getFlightData, onClear }) => {
    const [departureDate, setDepartureDate] = useState(new Date());
    const [from, setFrom] = useState("London");
    const [fromPlaces, setFromPlaces] = useState([]);
    const [to, setTo] = useState("Paris");
    const [toPlaces, setToPlaces] = useState([]);
    const [country, setCountry] = useState("PL");
    const [currency, setCurrency] = useState("PLN");
    const [lang, setLang] = useState("en-US");
    const onSubmit = () =>
        getFlightData({
            departureDate: convertDate(departureDate),
            from: fromPlaces.filter(({ isChecked }) => isChecked),
            to: toPlaces.filter(({ isChecked }) => isChecked),
            country,
            currency,
            lang
        });
    const findCountry = async (countryName) => {
        const storedCountriesString = localStorage.getItem("countries");
        const storedCountries = storedCountriesString ? JSON.parse(storedCountriesString) : [];
        const storedCountry = storedCountries.find(item => item.countryName === countryName);

        if (storedCountry) {
            return storedCountry.results;
        }

        const results = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/${currency}/${lang}/?query=${countryName}`, {
            headers: {
                "x-rapidapi-key": "c37641f051mshe682881ca808e3ep1b0ba1jsne813ccecdbfb",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "useQueryString": true
            },
        }).then(data => data.json()).then(({Places}) => Places).catch(() => {
            alert("No such country");
            return [];
        });

        if (results.length) {
            if (!storedCountries.some(item => item.CountryName === countryName)) {
                storedCountries.push({ countryName, results });
                localStorage.setItem(
                    "countries",
                    JSON.stringify(storedCountries)
                )
            }
        }

        return results;
    }

    const findCountryFrom = async () => {
        const storedResults = await findCountry(from);

        setFromPlaces(storedResults);
    }

    const findCountryTo = async () => {
        const storedResults = await findCountry(to);

        setToPlaces(storedResults);
    }

    const setCheckedFrom = (status, id) => {
        setFromPlaces(fromPlaces.map((item) => item.PlaceId === id ? {...item, isChecked: status} : item));
    };

    const setCheckedTo = (status, id) => {
        setToPlaces(toPlaces.map((item) => item.PlaceId === id ? {...item, isChecked: status} : item));
    };

    return <form onSubmit={e => e.preventDefault()}>
        <dl>
            <Row>
                <dt>Departure Date (yyyy-MM-dd)</dt>
                <dd>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                    />
                </dd>
            </Row>
            <Row>
                <dt>From</dt>
                <StyledDD>
                    <div>
                        <input type="text" value={from} onBlur={findCountryFrom} onChange={(e) => setFrom(e.target.value)} />
                        <button onClick={findCountryFrom}>find</button>
                    </div>
                    {
                        fromPlaces.map((item, index) => <StyledSpanNoWrap key={item.PlaceId}>
                            <input onChange={(e) => setCheckedFrom(e.target.checked, item.PlaceId)} id={item.PlaceName + item.CountryName} type="checkbox"/>
                            <label htmlFor={item.PlaceName + item.CountryName}>
                                {
                                    index === 0 && fromPlaces.length > 1
                                        ? <strong>{`All airports for: ${item.PlaceName} (${item.CountryName})`}</strong>
                                        : `${item.PlaceName} (${item.CountryName})`
                                }
                            </label>
                        </StyledSpanNoWrap>)
                    }
                </StyledDD>
            </Row>
            <Row>
                <dt>To</dt>
                <dd>
                    <div>
                        <input type="text" value={to} onBlur={findCountryTo} onChange={(e) => setTo(e.target.value)} />
                        <button onClick={findCountryTo}>find</button>
                    </div>
                    {
                        toPlaces.map((item, index) => <StyledSpanNoWrap key={item.PlaceId}>
                            <input onChange={(e) => setCheckedTo(e.target.checked, item.PlaceId)} id={item.PlaceName + item.CountryName} type="checkbox"/>
                            <label htmlFor={item.PlaceName + item.CountryName}>
                                {
                                    index === 0 && toPlaces.length > 1
                                        ? <strong>{`All airports for: ${item.PlaceName} (${item.CountryName})`}</strong>
                                        : `${item.PlaceName} (${item.CountryName})`
                                }
                            </label>
                        </StyledSpanNoWrap>)
                    }
                </dd>
            </Row>
            <Row>
                <dt>Country</dt>
                <dd>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </dd>
            </Row>
            <Row>
                <dt>Currency</dt>
                <dd>
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </dd>
            </Row>
            <Row>
                <dt>Lang</dt>
                <dd>
                    <input type="text" value={lang} onChange={(e) => setLang(e.target.value)} />
                </dd>
            </Row>
        </dl>
        <button onClick={onSubmit} type="submit">Get data</button>
        <button onClick={onClear}>Clear</button>
    </form>
}