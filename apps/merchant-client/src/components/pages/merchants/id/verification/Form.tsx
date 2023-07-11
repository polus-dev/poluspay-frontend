import type { DomainVerification } from '../../../../../pages/merchants/id/verification/Domain';

import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { useCopyText } from '../../../../../hooks/useCopyText';

import { FormInput, notify, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconCopy } from '../../../../../assets/icons/copy.svg';
import { ReactComponent as IconYoutube } from '../../../../../assets/icons/youtube.svg';

import './Form.scoped.scss';
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
    const { id: merchantId } = useParams<{ id: string }>();
    if (!merchantId) {
        return null;
    }

    const [fileName, setFileName] = useState('polus-verification.txt');

    const navigate = useNavigate();
    const copy = useCopyText();

    const { data: merchant } = useGetMerchantByIdQuery({
        merchant_id: merchantId,
    });

    const [verifyDomain, { isLoading }] = useVerifyDomainMutation();

    const handleButtonClick = async () => {
        try {
            await verifyDomain({
                merchant_id: merchantId,
                method: type === 'dns' ? 'dns' : 'response',
                path: type === 'file' ? fileName : undefined,
            }).unwrap();
            notify({ title: 'Success response', status: 'success' });
            navigate(`/merchants/${merchantId}/merchant`);
        } catch (error) {
            notify({ title: 'Error response', status: 'error' });
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
                            1. Add TXT record to your website's DNS records.
                            Paste the following verification token into the
                            value:
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="Verification token"
                                overlay={false}
                                value={
                                    copy.copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code ??
                                          'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy.copy(
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
                            2. Wait for DNS records to update
                        </p>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            3. Once the TXT record is set, click
                            <span className="form__point-text form__point-text--bald">
                                &nbsp;Verify
                            </span>
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
                                children={<p>Verify</p>}
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
                            1. Add the following meta tag to the HTML code of
                            your website's homepage:
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="Meta tag"
                                overlay={false}
                                value={
                                    copy.copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code
                                        ? `<meta name="poluspay" content="${merchant.domain_confirmation_code}" />`
                                        : 'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy.copy(
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
                            2. Once the meta tag is set, click
                            <span className="form__point-text form__point-text--bald">
                                &nbsp;Verify
                            </span>
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
                                children={<p>Verify</p>}
                                onClick={handleButtonClick}
                            />
                        </div>
                    </div>
                </>
            )}
            {type === 'file' && (
                <>
                    <div className="form__point">
                        <p className="form__point-text">
                            1. Create TXT file with the following name:
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="File name"
                                overlay={false}
                                value={copy.copied ? 'Copied!' : fileName}
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() => copy.copy(fileName)}
                                    />
                                }
                                onInput={() => {}}
                            />
                        </div>
                    </div>
                    <div className="form__point">
                        <p className="form__point-text">
                            2. Write the following verification token into this
                            file:
                        </p>
                        <div className="form__point-item">
                            <FormInput
                                readonly
                                label="Verification token"
                                overlay={false}
                                value={
                                    copy.copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code ??
                                          'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy.copy(
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
                            4. Once the file is uploaded, click
                            <span className="form__point-text form__point-text--bald">
                                &nbsp;Verify
                            </span>
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
                                children={<p>Verify</p>}
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
                                    copy.copied
                                        ? 'Copied!'
                                        : merchant?.domain_confirmation_code ??
                                          'loading...'
                                }
                                append={
                                    <IconCopy
                                        className="form__point-item-icon"
                                        onClick={() =>
                                            copy.copy(
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
                            4. Click
                            <span className="form__point-text form__point-text--bald">
                                &nbsp;Verify
                            </span>
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
                                children={<p>Verify</p>}
                                onClick={handleButtonClick}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
