import { useState } from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { convertDate } from "../../helpers/convertDate";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    & > *.MuiFormControl-root {
        min-width: 50%;
    }
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

export const Form = ({ getFlightData, onClear }) => {
    const [departureDate, setDepartureDate] = useState(convertDate(new Date("Thu Jul 11 2021 22:11:18 GMT+0200")));
    const [from, setFrom] = useState("london");
    const [to, setTo] = useState("krakow");
    const [currency, setCurrency] = useState("EUR");

    const onSubmit = () =>
        getFlightData({
            departureDate,
            from,
            to,
            currency
        });

    

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
                <TextField placeholder="London" label="From" value={from} onChange={(e) => setFrom(e.target.value)} />
            </Row>
            <Row>
                <TextField placeholder="Paris" label="To" value={to} onChange={(e) => setTo(e.target.value)} />
            </Row>
            <InputsHolder>
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