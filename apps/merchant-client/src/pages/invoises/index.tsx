import { Div, Panel } from '@vkontakte/vkui/old';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface MainProps {
    id: string;
    setActiveModal: Function;
}

export const Invoices: React.FC<MainProps> = (props: MainProps) => {
    const [firstRender, setFirstRender] = React.useState<boolean>(false);

    const history = useNavigate();

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(true);
        }
    }, []);

    return (
        <Panel id={props.id}>
            <Div style={{ paddingTop: 0 }}>
                <div className="admin-header-block">
                    <h5 className="polus-h5">Invoices</h5>
                </div>

                <table className="polus-table">
                    <thead>
                        <tr>
                            <th>UUID</th>
                            <th>Merchant name</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Paid by</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>b80b...6875</td>
                            <td>Vladislav92</td>
                            <td>00.0300</td>
                            <td>USDC</td>
                            <td>0x255...9079f</td>
                            <td>Sep 14, 11:14 PM</td>
                            <td>Paid</td>
                        </tr>
                        <tr>
                            <td>b80b...6875</td>
                            <td>Vladislav92</td>
                            <td>00.0300</td>
                            <td>USDC</td>
                            <td>0x255...9079f</td>
                            <td>Sep 14, 11:14 PM</td>
                            <td>Paid</td>
                        </tr>
                        <tr>
                            <td>b80b...6875</td>
                            <td>Vladislav92</td>
                            <td>00.0300</td>
                            <td>USDC</td>
                            <td>0x255...9079f</td>
                            <td>Sep 14, 11:14 PM</td>
                            <td>Paid</td>
                        </tr>
                    </tbody>
                </table>
            </Div>
        </Panel>
    );
};
