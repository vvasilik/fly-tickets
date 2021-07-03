import { useState } from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { convertDate } from "../../helpers/convertDate";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const Divider = styled.div`
    width: 48px;
`;

const FormElement = styled.div`
    width: calc(50% - 24px);
    flex: 0 0 calc(50% - 24px);

    & > * {
        width: 100%;
    }
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
`;

export const Form = ({ getFlightData }) => {
    const [departureDate, setDepartureDate] = useState(convertDate(new Date()));
    const [arriveDate, setArriveDate] = useState(convertDate(new Date()));
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [currency, setCurrency] = useState("PLN");
    const onSubmit = () => getFlightData({ departureDate, arriveDate, from, to, currency });

    const reversePlaces = () => {
        setFrom(to);
        setTo(from);
    }

    return <>
        <StyledForm onSubmit={e => e.preventDefault()}>
            <Row>
                <FormElement>
                    <TextField label="From" value={from} onChange={(e) => setFrom(e.target.value)} />
                </FormElement>
                <IconButton onClick={reversePlaces} aria-label="reverse">
                    <SyncAltIcon />
                </IconButton>
                <FormElement>
                    <TextField label="To" value={to} onChange={(e) => setTo(e.target.value)} />
                </FormElement>
            </Row>
            <Row>
                <FormElement>
                    <TextField
                        type="date"
                        label="Departure Date"
                        defaultValue={departureDate}
                        onChange={(date) => setDepartureDate(date.target.value)}
                    />
                </FormElement>
                <Divider />
                    <FormElement>
                    <TextField
                        type="date"
                        label="Arrive Date"
                        defaultValue={arriveDate}
                        onChange={(date) => setArriveDate(date.target.value)}
                    />
                </FormElement>
            </Row>
            <Row>
                <FormElement>
                    <FormControl>
                        <InputLabel shrink>
                            Currency
                        </InputLabel>
                        <Select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="PLN">PLN</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="UAH">UAH</MenuItem>
                        </Select>
                    </FormControl>
                </FormElement>
                <Button size="large" onClick={onSubmit} variant="contained" color="primary">
                    Find
                </Button>
            </Row>
        </StyledForm>
    </>
}