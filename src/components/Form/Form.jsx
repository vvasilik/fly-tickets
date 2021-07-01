import { useState } from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { convertDate } from "../../helpers/convertDate";
import { findCountry } from "./helpers";

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AirportsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const StyledSpanNoWrap = styled.span`
    white-space: nowrap;
    margin-right: 10px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Form = ({ getFlightData, onClear }) => {
    const [departureDate, setDepartureDate] = useState(convertDate(new Date()));
    const [from, setFrom] = useState("london");
    const [fromPlaces, setFromPlaces] = useState([]);
    const [to, setTo] = useState("paris");
    const [toPlaces, setToPlaces] = useState([]);
    const [country, setCountry] = useState("PL");
    const [currency, setCurrency] = useState("PLN");
    const [lang, setLang] = useState("en-US");
    const onSubmit = () =>
        getFlightData({
            departureDate,
            from: fromPlaces.filter(({ isChecked }) => isChecked),
            to: toPlaces.filter(({ isChecked }) => isChecked),
            country,
            currency,
            lang
        });

    const getUrl = () => `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/${currency}/${lang}/?query=`;

    const findCountryFrom = async () => {
        if (!from) {
            return;
        }

        const storedResults = await findCountry(from, getUrl());

        setFromPlaces(storedResults);
    }

    const findCountryTo = async () => {
        if (!to) {
            return;
        }

        const storedResults = await findCountry(to, getUrl());

        setToPlaces(storedResults);
    }

    const setCheckedFrom = (status, id) => {
        setFromPlaces(fromPlaces.map((item) => item.PlaceId === id ? {...item, isChecked: status} : item));
    };

    const setCheckedTo = (status, id) => {
        setToPlaces(toPlaces.map((item) => item.PlaceId === id ? {...item, isChecked: status} : item));
    };

    return <form onSubmit={e => e.preventDefault()}>
        <div>
            <Row>
                <TextField
                    type="date"
                    label="Departure Date"
                    defaultValue={departureDate}
                    onChange={(date) => setDepartureDate(date.target.value)}
                />
            </Row>
            <Row>
                <TextField placeholder="London" label="From" value={from} onBlur={findCountryFrom} onChange={(e) => setFrom(e.target.value)} />
                {
                    fromPlaces.length === 0
                        ? "-- no airports found --"
                        : <AirportsList>
                            {
                                fromPlaces.map((item, index) => <StyledSpanNoWrap key={item.PlaceId}>
                                    <Checkbox
                                        edge="start"
                                        onChange={(e) => setCheckedFrom(e.target.checked, item.PlaceId)}
                                        id={item.PlaceName + item.CountryName}
                                    />
                                    <label htmlFor={item.PlaceName + item.CountryName}>
                                        {
                                            index === 0 && fromPlaces.length > 1
                                                ? <strong>{`All airports for: ${item.PlaceName} (${item.CountryName})`}</strong>
                                                : `${item.PlaceName} (${item.CountryName})`
                                        }
                                    </label>
                                </StyledSpanNoWrap>)
                            }
                        </AirportsList>
                }
            </Row>
            <Row>
                <TextField placeholder="Paris" label="To" value={to} onBlur={findCountryTo} onChange={(e) => setTo(e.target.value)} />
                {
                    toPlaces.length === 0
                        ? "-- no airports found --"
                        : <div>
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
                        </div>
                }
            </Row>
            <Row>
                <TextField label="Market Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </Row>
            <Row>
                <TextField label="Currency" type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </Row>
            <Row>
                <TextField label="Lang" disabled type="text" value={lang} onChange={(e) => setLang(e.target.value)} />
            </Row>
        </div>
        <Actions>
            <Button onClick={onClear} variant="contained" color="secondary">
                Clear
            </Button>
            <Button onClick={onSubmit} variant="contained" color="primary">
                Get data
            </Button>
        </Actions>
    </form>
}