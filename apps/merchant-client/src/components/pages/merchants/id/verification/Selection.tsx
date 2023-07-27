import type { DomainVerification } from '../../../../../pages/merchants/id/verification/Domain';

import { ReactComponent as IconArrow } from '../../../../../assets/icons/arrow.svg';

import './Selection.scoped.scss';

interface DomainSelectionProps {
    onSelect: (type: DomainVerification) => void;
}

interface DomainSelectionOption {
    id: number;
    type: DomainVerification;
    title: string;
    description: string;
}

export const MerchantDomainSelection: React.FC<DomainSelectionProps> = ({
    onSelect,
}) => {
    const options: DomainSelectionOption[] = [
        {
            id: 1,
            type: 'dns',
            title: 'DNS record',
            description: "Add a TXT type record to your website's DNS records",
        },
        {
            id: 2,
            type: 'html',
            title: 'HTML tag',
            description:
                "Add meta tag to the HTML source code of your website's homepage",
        },
        {
            id: 3,
            type: 'file',
            title: 'File',
            description:
                'Upload a small text file containing a verification token to your server',
        },
        {
            id: 4,
            type: 'server',
            title: 'Server response',
            description: 'Information sent by a web server in response to a request, confirming the processing of the request',
        },
    ];

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
    );
};
