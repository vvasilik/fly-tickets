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
    margin-bottom: 50px;

    & > *.MuiFormControl-root {
        min-width: 45%;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`;

export const Form = ({ getFlightData }) => {
    const [departureDate, setDepartureDate] = useState(convertDate(new Date()));
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [currency, setCurrency] = useState("EUR");
    const onSubmit = () => getFlightData({ departureDate, from, to, currency });

    return <>
        <StyledForm onSubmit={e => e.preventDefault()}>
            <Row>
                <TextField label="From" value={from} onChange={(e) => setFrom(e.target.value)} />
                <TextField label="To" value={to} onChange={(e) => setTo(e.target.value)} />
            </Row>
            <Row>
                <TextField
                    type="date"
                    label="Departure Date"
                    defaultValue={departureDate}
                    onChange={(date) => setDepartureDate(date.target.value)}
                />
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
            </Row>
        </StyledForm>
        <Actions>
            <Button onClick={onSubmit} variant="contained" color="primary">
                Find
            </Button>
        </Actions>
    </>
}