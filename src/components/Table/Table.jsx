import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from "../Row";

export const Table = ({ flightData }) => {

    return (<TableContainer component={Paper}>
        <MuiTable aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    flightData.map(itemData => {
                        const { Carriers, Currencies, Quotes, Places } = itemData;
                
                        return Carriers &&
                            Carriers.map(item =>
                                <Row
                                    key={item.CarrierId}
                                    currencies={Currencies}
                                    carrier={item}
                                    quotes={Quotes}
                                    places={Places}
                                />
                            )
                    })
                }
            </TableBody>
        </MuiTable>
    </TableContainer>)
}