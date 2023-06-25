import React, { useState } from "react"

import PButton from "../../../ui/PButton/PButton"
import PInput from "../../../ui/PInput/PInput"

import './Form.scoped.scss'

interface FormProps {
    changeStage: () => void
}

const MerchantForm: React.FC<FormProps> = ({
    changeStage
}) => {
    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')
    const [description, setDescription] = useState('')

    const handleTextareaInput = (event: React.FormEvent): void => {
        if (!event.target) return undefined

        const target = event.target as HTMLInputElement
        const value = target.value.trim()

        setDescription(value)
    }

    return (
        <div className="form">
            <div className="form__inner">
                <div className="form__item">
                    <p className="form__item-label">
                        Merchant name&nbsp;&nbsp;
                        <span className="form__item-label form__item-label--required">
                            *
                        </span>
                    </p>
                    <PInput
                        placeholder="Company name"
                        value={name}
                        onInput={(value) => setName(value.toString())}
                    />
                </div>
                <div className="form__item">
                    <p className="form__item-label">
                        Merchant's website
                    </p>
                    <PInput
                        placeholder="https://example.com"
                        value={website}
                        onInput={(value) => setWebsite(value.toString())}
                    />
                </div>
                <div className="form__item">
                    <p className="form__item-label">
                        Description
                    </p>
                    <textarea
                        className="form__item-textarea"
                        placeholder="Few words about merchant"
                        value={description}
                        onInput={(event) => handleTextareaInput(event)}
                    />
                </div>
            </div>
            <div className="form__button">
                <PButton
                    wide
                    classname="form__button"
                    disabled={name.length === 0}
                    children={
                        <p>Continue</p>
                    }
                    onClick={() => changeStage()}
                />
            </div>
            <div className="form__button form__button--desktop">
                <PButton
                    wide
                    size="lg"
                    classname="form__button form__button--desktop"
                    disabled={name.length === 0}
                    children={
                        <p>Continue</p>
                    }
                    onClick={() => changeStage()}
                />
            </div>
        </div>
    )
}

export default MerchantForm
