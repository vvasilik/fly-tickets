import styled from "styled-components";
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from "../Row";

const StyledTableContainer = styled(TableContainer)`
    margin-bottom: 20px;
`;

const Heading = styled.h3`
    margin: 0 0 10px;
`;

const DateText = styled.span`
    font-size: 12px;
    font-weight: normal;
`;

export const Table = ({ departureFlightData, arriveFlightData }) => {
    const departureDate = departureFlightData?.Quotes?.[0]?.OutboundLeg?.DepartureDate?.slice(0, 10);
    const arriveDate = arriveFlightData?.Quotes?.[0]?.OutboundLeg?.DepartureDate?.slice(0, 10);

    return departureFlightData.Carriers && arriveFlightData.Carriers ? <>
        <Heading>Departure {departureDate && <DateText>({departureDate})</DateText>}</Heading>
        <StyledTableContainer component={Paper}>
            <MuiTable aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        departureFlightData.Carriers.map(item =>
                            <Row
                                key={item.CarrierId}
                                currencies={departureFlightData.Currencies}
                                carrier={item}
                                quotes={departureFlightData.Quotes}
                                places={departureFlightData.Places}
                            />
                        )
                    }
                </TableBody>
            </MuiTable>
        </StyledTableContainer>
        <Heading>Arrive {arriveDate && <DateText>({arriveDate})</DateText>}</Heading>
        <StyledTableContainer component={Paper}>
            <MuiTable aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        arriveFlightData.Carriers.map(item =>
                            <Row
                                key={item.CarrierId}
                                currencies={arriveFlightData.Currencies}
                                carrier={item}
                                quotes={arriveFlightData.Quotes}
                                places={arriveFlightData.Places}
                            />
                        )
                    }
                </TableBody>
            </MuiTable>
        </StyledTableContainer>
    </> : null
}