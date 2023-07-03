import { useState } from "react"

import { PButton, PInput } from "@poluspay-frontend/ui"
import { ReactComponent as IconCopy } from '../../../../assets/icons/copy.svg'

import './Brand.scoped.scss'

export const MerchantBrandPage: React.FC = () => {
    const id = '90ca217e-e429-4cbd-bf53-52b44e351e59'

    const [copied, setCopied] = useState(false)

    const copy = async () => {
        if (copied) return undefined

        navigator.clipboard.writeText(id)

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <div className="brand">
            <div className="brand__header">
                <h4 className="brand__header-title">
                    Indicate and confirm the brand
                </h4>
                <p className="brand__header-description">
                    Contact our manager for further action
                </p>
            </div>
            <div className="brand__divider" />
            <div className="brand__manager">
                <img
                    className="brand__manager-image"
                    src=""
                    alt="Manager's photo"
                />
                <p className="brand__manager-name">
                    Sergey
                </p>
            </div>
            <div className="brand__form">
                <div className="brand__form-item">
                    <p className="brand__form-item-label">
                        Copy and provide this ID to our manager:
                    </p>
                    <PInput
                        readonly
                        overlay={false}
                        value={copied ? 'Copied!' : id}
                        append={
                            <IconCopy
                                className="brand__form-item-icon"
                                onClick={copy}
                            />
                        }
                        onInput={() => {}}
                    />
                </div>
            </div>
            <div className="brand__button">
                <PButton
                    wide
                    href="https://t.me/polus_sergey/"
                    target="_blank"
                    children={
                        <p>Contact</p>
                    }
                />
            </div>
        </div>
    )
}
