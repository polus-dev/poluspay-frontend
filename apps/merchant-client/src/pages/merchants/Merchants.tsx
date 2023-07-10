import { useState } from 'react';
import { useGetMerchantsQuery } from '@poluspay-frontend/merchant-query';

import { PButton, PPagination } from '@poluspay-frontend/ui';
import { MerchantItem } from '../../components/pages/merchants/MerchantItem';

import './Merchants.scoped.scss';
import { Loader } from '../../components/ui/Loader/Loader';

export const MerchantsPage: React.FC = () => {
    const [current, setCurrent] = useState(1);
    const limit = 8;

    // replace this with actual data

    const { data: merchants, isLoading: isMerchantLoading } =
        useGetMerchantsQuery({
            limit,
            offset: current - 1,
        });

    const merchantsPaginated = merchants?.data.slice(
        (current - 1) * limit,
        (current - 1) * limit + limit
    );

    const onPageChange = (value: number) => {
        setCurrent(value);
    };

    return (
        <div className="merchants">
            {merchants && merchants?.totalCount !== 0 ? (
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
                    {merchants.totalCount > limit && (
                        <div className="merchants__pagination">
                            <PPagination
                                current={current}
                                totalItems={merchants.totalCount}
                                pageItems={limit}
                                onPageChange={(value) => onPageChange(value)}
                            />
                        </div>
                    )}
                </div>
            ) : isMerchantLoading ? (
                <Loader height={400} />
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
