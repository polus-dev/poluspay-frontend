import { useRef } from 'react'
import { useParams } from 'react-router';

import { useCopyText } from '@poluspay-frontend/hooks';
import { exportComponentAsPNG } from 'react-component-export-image';

import { QRCodeSVG } from 'qrcode.react';
import { FormInput, PButton } from '@poluspay-frontend/ui'
import { ReactComponent as IconDownload } from '../../../../../assets/icons/download.svg'
import { ReactComponent as IconCopy } from '../../../../../assets/icons/copy.svg'

import './OfflineSales.scoped.scss'

export const MerchantOfflineSalesBlock: React.FC = () => {
    const { id: merchantId } = useParams<{ id: string }>();
    const url = `https://form.poluspay.com/offlinesales/${merchantId}`

    const svg = useRef<HTMLDivElement | null>(null)
    const copy = useCopyText()

    const handleDownload = () => {
        if (!svg) return undefined

        exportComponentAsPNG(svg, { fileName: 'poluspay-qrcode' })
    }

    return (
        <div className="offline">
            <h6 className="offline__title">
                Offline sales
            </h6>
            <div className="offline__inner">
                <div className="offline__inner-left">
                    <div
                        ref={svg}
                        className="offline__inner-left__qr"
                    >
                        <QRCodeSVG
                            id="offline-sales-qrcode"
                            className="offline__inner-left__qr-image"
                            value={url}
                        />
                        <img
                            className="offline__inner-left__qr-logo"
                            src="/images/polus-bg.png"
                            alt="Poluspay logo"
                        />
                    </div>
                    <div className="offline__inner-left-button">
                        <PButton
                            wide
                            children={
                                <>
                                    <IconDownload className="offline__inner-left-button-icon" />
                                    <p>
                                        Download
                                    </p>
                                </>
                            }
                            onClick={handleDownload}
                        />
                    </div>
                </div>
                <div className="offline__inner-right">
                    <div className="offline__inner-right-input">
                        <FormInput
                            readonly
                            label="Link to offline sales page"
                            overlay={false}
                            value={ copy.copied ? 'Copied!' : url }
                            append={
                                <IconCopy
                                    className="offline__inner-right-input-icon"
                                    onClick={() => copy.copy(url)}
                                />
                            }
                        />
                    </div>
                    <h6 className="offline__inner-right-title">
                        How to use
                    </h6>
                    <p className="offline__inner-right-point">
                        1. Download the QR code and place it in your store
                    </p>
                    <p className="offline__inner-right-point">
                        2. After scanning the QR code, the customer will be redirected to a page, which awaits for the payment creation. As soon as the seller creates the invoice, the customer will automatically be redirected to the payment form for the relevant invoice
                    </p>
                    <p className="offline__inner-right-point offline__inner-right-point--small">
                        Important: The system automatically redirects to the last created unpaid invoice. If you already have a pending invoice, create a new one before asking the customer to scan the QR code.
                    </p>
                </div>
            </div>
        </div>
    )
}
