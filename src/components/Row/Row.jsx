export const Row = ({ carrier, currencies, quotes, places }) => {
    const { CarrierId, Name } = carrier;
    const currency = currencies[0].Symbol;
    const flightData = quotes.filter(quote => quote.OutboundLeg.CarrierIds[0] === CarrierId);

    return <tr>
        <td>{Name} ({places.from.replace("-sky", "")}/{places.to.replace("-sky", "")})</td>
        <td>{flightData.map(({ MinPrice }) => MinPrice).join(", ")} {currency}</td>
    </tr>
}