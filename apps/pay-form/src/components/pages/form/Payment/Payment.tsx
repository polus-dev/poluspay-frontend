import { FormCurrencies } from './Currencies/Currencies';
import { FormSelect } from './Select/Select';
import { FormTimer } from './Timer/Timer';

import './Payment.scoped.scss';
import { useModal } from '@poluspay-frontend/hooks';
import {
    blockchainList,
    ModalBlockChainSelector,
    ModalCurrencySelector,
} from '@poluspay-frontend/ui';
import React from 'react';
import { AssetRepresentation } from '@poluspay-frontend/api';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { block } from '@itznevikat/router';
import { setCurrentBlockchain } from '../../../../store/features/connection/connectionSlice';

interface FormPaymentProps {
    expireAt: string;
    availableTokens: AssetRepresentation[];
    availableCategories: string[];
    paymentAvailableBlockchains: string[];
    userToken: AssetRepresentation;
    setUserToken: (token: AssetRepresentation) => void;
}

export const FormPayment = (props: FormPaymentProps) => {
    const dispatch = useAppDispatch();
    const modalCurrency = useModal();
    const modalBlockchains = useModal();
    const currentBlockchain =
        useAppSelector((state) => state.connection.currentBlockchain) ||
        'Polygon';
    const item =
        blockchainList.find((e) => e.label === currentBlockchain) ||
        blockchainList[0];
    return (
        <>
            <div className="payment">
                <div className="payment__select">
                    <FormSelect
                        item={{ image: item.image, text: item.name }}
                        onClick={modalBlockchains.open}
                    />
                </div>
                <div className="payment__currencies">
                    <FormCurrencies
                        openModal={modalCurrency.open}
                        availableTokens={props.availableTokens}
                        userToken={props.userToken}
                        setUserToken={props.setUserToken}
                    />
                </div>
                <div className="payment__timer">
                    <FormTimer expiresAt={props.expireAt} />
                </div>
            </div>

            <ModalBlockChainSelector
                visible={modalBlockchains.visible}
                options={blockchainList.filter((e) =>
                    props.paymentAvailableBlockchains.includes(e.label)
                )}
                setSelected={(e) => dispatch(setCurrentBlockchain(e.label))}
                selected={blockchainList.find(
                    (e) => e.label === currentBlockchain
                )}
                onClose={() => modalBlockchains.close()}
            />

            <ModalCurrencySelector
                visible={modalCurrency.visible}
                assetsRepresentation={props.availableTokens}
                categories={props.availableCategories}
                onClose={(token) => {
                    modalCurrency.close();
                    if (!token) return;
                    props.setUserToken(token);
                }}
                assetUrl={import.meta.env.VITE_ASSET_URL}
            />
        </>
    );
};
