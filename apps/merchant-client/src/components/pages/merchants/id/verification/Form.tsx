import type { DomainVerification } from '../../../../../pages/merchants/id/verification/Domain';

import { useState } from 'react';

import { FormInput, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconCopy } from '../../../../../assets/icons/copy.svg';
import { ReactComponent as IconYoutube } from '../../../../../assets/icons/youtube.svg';

import './Form.scoped.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useGetMerchantByIdQuery,
    useVerifyDomainMutation,
} from '@poluspay-frontend/merchant-query';

interface MerchantDomainFormProps {
    type: DomainVerification | null;
}

export const MerchantDomainForm: React.FC<MerchantDomainFormProps> = ({
    type,
}) => {
    const [copied, setCopied] = useState(false);

    const [fileName, setFileName] = useState('polus-verification.txt');

    const { id: merchantId } = useParams<{ id: string }>();
    if (!merchantId) {
        return null;
    }

    const navigate = useNavigate();

    const { data: merchant } = useGetMerchantByIdQuery({
        merchant_id: merchantId,
    });

    const [veirfyDomain, { isLoading }] = useVerifyDomainMutation();

    const copy = async (value: string) => {
        if (copied) return undefined;

        await navigator.clipboard.writeText(value);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    const handleButtonClick = async () => {
        try {
            await veirfyDomain({
                merchant_id: merchantId,
                method: type === 'dns' ? 'dns' : 'response',
                path: type === 'file' ? fileName : undefined,
            }).unwrap();
            navigate(`/merchants/${merchantId}/merchant`);
        } catch (error) {
            console.error(error);
        }

        return undefined;
    };

    return (
        <div className="form">
            <div className="form__header">
                <p className="form__header-domain">Merchant's domain</p>
                <p className="form__header-id">Merchand ID</p>
            </div>
            <div className="form__divider" />
            {type === 'dns' && (
                <>
                    <div className="form__point">
                        <p className="form__point-text">
                            1. Add TXT Record code to DNS domain:
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="DNS TXT Record code"
                                overlay={false}
                                value={
                                    copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code ??
                                          'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy(
                                                merchant!
                                                    .domain_confirmation_code
                                            )
                                        }
                                    />
                                }
                                onInput={() => {}}
                            />
                        </div>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            2. Wait for DNS update
                        </p>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            3. Click the button "Confirm"
                        </p>
                    </div>
                    <div className="form__buttons">
                        <div className="form__buttons-item">
                            <PButton
                                wide
                                outline
                                href=""
                                target="_blank"
                                children={
                                    <>
                                        <IconYoutube className="form__buttons-item-icon" />
                                        Video guide
                                    </>
                                }
                            />
                        </div>
                        <div className="form__buttons-item">
                            <PButton
                                loading={isLoading}
                                wide
                                children={<p>Confirm</p>}
                                onClick={handleButtonClick}
                            />
                        </div>
                    </div>
                </>
            )}
            {type === 'html' && (
                <>
                    <div className="form__point">
                        <p className="form__point-text">
                            1. Add HTML tag to your code
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="HTML tag"
                                overlay={false}
                                value={
                                    copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code
                                        ? `<meta name="poluspay" content="${merchant.domain_confirmation_code}" />`
                                        : 'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy(
                                                `<meta name="poluspay" content="${
                                                    merchant!
                                                        .domain_confirmation_code
                                                }" />`
                                            )
                                        }
                                    />
                                }
                                onInput={() => {}}
                            />
                        </div>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            2. Click the button "Check HTML record"
                        </p>
                    </div>
                    <div className="form__buttons">
                        <div className="form__buttons-item">
                            <PButton
                                wide
                                outline
                                href=""
                                target="_blank"
                                children={
                                    <>
                                        <IconYoutube className="form__buttons-item-icon" />
                                        Video guide
                                    </>
                                }
                            />
                        </div>
                        <div className="form__buttons-item">
                            <PButton
                                loading={isLoading}
                                wide
                                children={<p>Check&nbsp;HTML&nbsp;record</p>}
                                onClick={handleButtonClick}
                            />
                        </div>
                    </div>
                </>
            )}
            {type === 'file' && (
                <>
                    <div className="form__point">
                        <p className="form__point-text">1. Create TXT file</p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="File name"
                                overlay={false}
                                value={copied ? 'Copied!' : fileName}
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy('polus-verification.txt')
                                        }
                                    />
                                }
                                onInput={() => {}}
                            />
                        </div>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            2. Inside the file, write the record code
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="Record code"
                                overlay={false}
                                value={
                                    copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code ??
                                          'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy(
                                                merchant!
                                                    .domain_confirmation_code
                                            )
                                        }
                                    />
                                }
                                onInput={() => {}}
                            />
                        </div>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            3. Upload this file to your server
                        </p>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            4. Click the button "Check file"
                        </p>
                    </div>
                    <div className="form__buttons">
                        <div className="form__buttons-item">
                            <PButton
                                wide
                                outline
                                href=""
                                target="_blank"
                                children={
                                    <>
                                        <IconYoutube className="form__buttons-item-icon" />
                                        Video guide
                                    </>
                                }
                            />
                        </div>
                        <div className="form__buttons-item">
                            <PButton
                                loading={isLoading}
                                wide
                                children={<p>Check file</p>}
                                onClick={handleButtonClick}
                            />
                        </div>
                    </div>
                </>
            )}
            {type === 'server' && (
                <>
                    <div className="form__point">
                        <p className="form__point-text">
                            1. Add code to your domain. On our domain request,
                            your server should respond with the following code:
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="Verification code"
                                overlay={false}
                                value={
                                    copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code ??
                                          'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy(
                                                merchant!
                                                    .domain_confirmation_code
                                            )
                                        }
                                    />
                                }
                                onInput={() => {}}
                            />
                        </div>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            4. Click the button "Check"
                        </p>
                    </div>
                    <div className="form__buttons">
                        <div className="form__buttons-item">
                            <PButton
                                wide
                                outline
                                href=""
                                target="_blank"
                                children={
                                    <>
                                        <IconYoutube className="form__buttons-item-icon" />
                                        Video guide
                                    </>
                                }
                            />
                        </div>
                        <div className="form__buttons-item">
                            <PButton
                                loading={isLoading}
                                wide
                                children={<p>Check</p>}
                                onClick={handleButtonClick}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
