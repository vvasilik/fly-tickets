import { useState } from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { convertDate } from "../../helpers/convertDate";
import { findCountry } from "./helpers";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const InputsHolder = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    & > *:not(:first-child) {
        margin-left: 10px;
    }

    & > * {
        flex: 0 1 33%;
    }
`;

const StyledDL = styled.dl`
    display: flex;
    flex-direction: column;
    margin: 0;
    text-align: right;
`;

const StyledDT = styled.dt`
    margin: 0 0 5px;
    font-size: 13px;
    color: #0000008a;
`;

const StyledDD = styled.dd`
    margin: 0;
`;

export const Form = ({ getFlightData, onClear }) => {
    const [departureDate, setDepartureDate] = useState(convertDate(new Date()));
    const [from, setFrom] = useState("");
    const [fromPlaces, setFromPlaces] = useState([]);
    const [to, setTo] = useState("");
    const [toPlaces, setToPlaces] = useState([]);
    const [country, setCountry] = useState("UA");
    const [currency, setCurrency] = useState("EUR");
    const [lang, setLang] = useState("en-US");
    const getUrl = () => `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/${currency}/${lang}/?query=`;

    const onSubmit = () =>
        getFlightData({
            departureDate,
            from: fromPlaces?.[0] || [],
            to: toPlaces?.[0] || [],
            country,
            currency,
            lang
        });

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

    return <>
        <StyledForm onSubmit={e => e.preventDefault()}>
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
                    fromPlaces.length !== 0 && <StyledDL>
                        <StyledDT>All airports for:</StyledDT>
                        <StyledDD>{fromPlaces[0].PlaceName} ({fromPlaces[0].CountryName})</StyledDD>
                    </StyledDL>
                }
            </Row>
            <Row>
                <TextField placeholder="Paris" label="To" value={to} onBlur={findCountryTo} onChange={(e) => setTo(e.target.value)} />
                {
                    toPlaces.length !== 0 && <StyledDL>
                        <StyledDT>All airports for:</StyledDT>
                        <StyledDD>{toPlaces[0].PlaceName} ({toPlaces[0].CountryName})</StyledDD>
                    </StyledDL>
                }
            </Row>
            <InputsHolder>
                <TextField label="Market Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                <FormControl>
                    <InputLabel shrink>
                        Currency
                    </InputLabel>
                    <Select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="UAH">UAH</MenuItem>
                        <MenuItem value="RUB">RUB</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Lang" disabled type="text" value={lang} onChange={(e) => setLang(e.target.value)} />
            </InputsHolder>
        </StyledForm>
        <Actions>
            <Button onClick={onClear} variant="contained" color="secondary">
                Clear
            </Button>
            <Button onClick={onSubmit} variant="contained" color="primary">
                Get data
            </Button>
        </Actions>
    </>
}