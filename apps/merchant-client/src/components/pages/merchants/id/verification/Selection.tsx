import type { DomainVerification } from '../../../../../pages/merchants/id/verification/Domain'

import { ReactComponent as IconArrow } from '../../../../../assets/icons/arrow.svg'

import './Selection.scoped.scss'

interface DomainSelectionProps {
    onSelect: (type: DomainVerification) => void
}

interface DomainSelectionOption {
    id: number
    type: DomainVerification
    title: string
    description: string
}

export const MerchantDomainSelection: React.FC<DomainSelectionProps> = ({
    onSelect
}) => {
    const options: DomainSelectionOption[] = [{
        id: 1,
        type: 'dns',
        title: 'DNS record',
        description: 'Some description'
    }, {
        id: 2,
        type: 'html',
        title: 'HTML tag',
        description: 'Some description'
    }, {
        id: 3,
        type: 'file',
        title: 'File',
        description: 'Some description'
    }, {
        id: 4,
        type: 'server',
        title: 'Server response',
        description: 'Some description'
    }]

    return (
        <div className="selection">
            <h6 className="selection__title">
                Choose option to continue verification
            </h6>
            <div className="selection__container">
                {options.map((el) => (
                    <div
                        className="selection__container-item"
                        key={el.id}
                        onClick={() => onSelect(el.type)}
                    >
                        <div className="selection__container-item__header">
                            <h6 className="selection__container-item__header-title">
                                {el.title}
                            </h6>
                            <IconArrow className="selection__container-item__header-icon" />
                        </div>
                        <div className="selection__container-item__description">
                            <p className="selection__container-item__description-text">
                                {el.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
