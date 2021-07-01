import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const Row = ({ carrier, currencies, quotes, places }) => {
    const { CarrierId, Name } = carrier;
    const currency = currencies[0].Symbol;
    const flightData = quotes.filter(quote => quote.OutboundLeg.CarrierIds[0] === CarrierId);

    return <TableRow>
        <TableCell>{Name} ({places.from.replace("-sky", "")}/{places.to.replace("-sky", "")})</TableCell>
        <TableCell>{flightData.map(({ MinPrice }) => MinPrice).join(", ")} {currency}</TableCell>
    </TableRow>
}