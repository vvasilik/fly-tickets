import styled from "styled-components";
import Row from "../Row";

const StyledTable = styled.table`
  width: 100%;
`;

export const Table = ({ flightData }) => {

    return (<StyledTable>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
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
        </tbody>
    </StyledTable>)
}