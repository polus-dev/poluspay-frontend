import { Button, Counter, Div, Panel, Spinner } from '@vkontakte/vkui';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MerchantApiResp, NewApi } from '../../logic/api';
import { useGetMerchantsQuery } from '../../store/api/endpoints/merchant/Merchant';

interface MainProps {
  id: string;
  setActiveModal: Function;
  consoleLog: Function;
  logOut: Function;
  setSelectMerchantId: Function;
  isDesktop: boolean;
  newApi: NewApi;
  onErrorApi: Function;
}

export const Main: React.FC<MainProps> = (props: MainProps) => {
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);


  /// NEW CODE START

  // todo: make dynamic limit
  const limit = 10;
  const { data: merchants, isFetching } = useGetMerchantsQuery({
    limit,
    offset,
  });

  /// NEW CODE END

  return (
    <Panel id={props.id}>
      <Div style={{ paddingTop: 0 }}>
        <div className="admin-header-block">
          <h5 className="polus-h5">Merchants</h5>
          <Button
            size="l"
            onClick={() => props.setActiveModal('create_merchant')}
          >
            Create merchant
          </Button>
        </div>

        {isFetching && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Spinner size="large" style={{ margin: '20px 0' }} />
          </div>
        )}

        {merchants && (
          <div className="mobile-table">
            {merchants.data.length > 0 ? (
              <table className="polus-table polus-table-big">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    {props.isDesktop ? <th>Website link</th> : null}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {merchants.data.map((merchant, key: React.Key) => (
                    <tr
                      key={key}
                      onClick={() => history(`/merchant/${merchant.id}`)}
                    >
                      <td>{merchant.id}</td>
                      <td>{merchant.name}</td>
                      {props.isDesktop ? <td>{merchant.domain}</td> : null}
                      <td>
                        {/* {merchant.dns_confirmed
                                                    ? <Button
                                                        size="m"
                                                        mode="secondary"
                                                        onClick={() => {
                                                            props.setSelectMerchantId(merchant.id)
                                                            props.setActiveModal('create_invoice')
                                                        }}
                                                    >
                                            Create invoice
                                                    </Button> : null } */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                You don't have any merchants yet
              </div>
            )}
          </div>
        )}
        {/* pagination */}
        {merchants && merchants.data.length > 0 && merchants.totalCount > limit ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onClick={() => {
                setPage(page - 1)
                setOffset(offset - limit)
              }}
              size="l"
              mode="outline"
              disabled={page <= 1}
            >
              {isFetching ? <Spinner size="small" /> : 'Load prev merchants'}
            </Button>

            <Counter>{page + 1}</Counter>
            <Button
              onClick={() => {
                setOffset(offset + limit)
                setPage(page + 1)
              }}
              disabled={isFetching || offset + limit >= merchants.totalCount}
              size="l"
              mode="outline"
            >
              {isFetching ? <Spinner size="medium" /> : 'Load next merchants'}
            </Button>
          </div>
        ) : null}
      </Div>
    </Panel>
  );
};
