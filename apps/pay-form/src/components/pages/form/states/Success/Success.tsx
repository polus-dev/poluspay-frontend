import type { FormHeaderProps } from '../../Header/Header';

import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../store/hooks';
import {
    setSmartLineStatus,
    SmartLineStatus,
} from '../../../../../store/features/smartLine/smartLineSlice';

import { FormHeader } from '../../Header/Header';
import { FormFooter } from '../../Footer/Footer';
import { ReactComponent as IconCheckmarkRound } from '../../../../../assets/icons/checkmark-round.svg';

import './Success.scoped.scss';
import { FormButton } from '../../Button/Button';
import { redirectToMerchantSite } from 'apps/pay-form/src/utils/redirectToMerchantSite';

interface FormSuccessProps extends FormHeaderProps {}

export const FormSuccess = (props: FormSuccessProps) => {
    const dispatch = useAppDispatch();
    const {merchant: {success_redirect_url, domain}} = props, redirectUrl = success_redirect_url || domain;

    useEffect(() => {
        dispatch(setSmartLineStatus(SmartLineStatus.SUCCESS));
    }, []);

    return (
        <div className="success">
            <div className="success__header">
                <FormHeader {...props} />
            </div>
            <div className="success__content">
                <IconCheckmarkRound className="success__content-icon" />
                <p className="success__content-text">The invoice is paid</p>
            </div>
            {redirectUrl && (
            <div className="form__footer-button">
                <FormButton
                    text="Back to store"
                    onClick={() => redirectToMerchantSite(redirectUrl)}
                />
            </div>
            )}
            <div className="success__footer">
                <FormFooter hasLegal={false} />
            </div>
        </div>
    );
};
