import { useState } from 'react';

import MerchantItem from '../../components/pages/merchants/MerchantItem';
import PButton from '../../components/ui/PButton/PButton';
import PPagination from '../../components/ui/PPagination/PPagination';

import './Merchants.scoped.scss';
import { useGetMerchantsQuery } from '../../store/api/endpoints/merchant/Merchant';

const MerchantsPage: React.FC = () => {
    // get data for merchants list
    // const merchants = [
    //     { name: 'qwe', website: 'https://polus.fi', id: '1' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1w' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1ww' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '11' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1w1' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1w12w' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1123' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '12315w' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1w3456w' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1457' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1w346' },
    //     { name: 'qwe', website: 'https://polus.fi', id: '1w35467w' },
    // ];

    const [current, setCurrent] = useState(1);
    const limit = 8;

    const { data: merchants } = useGetMerchantsQuery({ limit, offset: 0 });

    const merchantsPaginated = merchants?.data.slice(
        (current - 1) * limit,
        (current - 1) * limit + limit
    );

    const onPageChange = (value: number) => {
        setCurrent(value);
    };

    return (
        <div className="merchants">
            {merchants?.totalCount !== 0 ? (
                <div className="merchants__inner">
                    <div className="merchants__header">
                        <h4 className="merchants__header-title">Merchants</h4>
                        <div className="merchants__header-button">
                            <PButton
                                wide
                                to="/merchants/create"
                                children={<p>Create&nbsp;merchant</p>}
                            />
                        </div>
                    </div>
                    <div className="merchants__table">
                        <div className="merchants__table-headline">
                            <p className="merchants__table-headline-name">
                                Name
                            </p>
                            <p className="merchants__table-headline-nameweb">
                                Name/Website
                            </p>
                            <p className="merchants__table-headline-website">
                                Website
                            </p>
                            <p className="merchants__table-headline-id">ID</p>
                        </div>
                        <div className="merchants__table-container">
                            {merchantsPaginated?.map((el) => (
                                <MerchantItem
                                    name={el.name}
                                    website={el.domain}
                                    id={el.id}
                                    key={el.id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="merchants__pagination">
                        {merchants?.totalCount > limit && (
                            <PPagination
                                current={current}
                                totalItems={merchants.totalCount}
                                pageItems={limit}
                                onPageChange={(value) => onPageChange(value)}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className="merchants__error">
                    <h6 className="merchants__error-title">
                        Create your first merchants
                    </h6>
                    <div className="merchants__error-button">
                        <PButton
                            wide
                            to="/merchants/create"
                            children={<p>+ New merchant</p>}
                        />
                    </div>
                    <div className="merchants__error-button merchants__error-button--desktop">
                        <PButton
                            wide
                            size="lg"
                            to="/merchants/create"
                            children={<p>+ New merchant</p>}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MerchantsPage;
