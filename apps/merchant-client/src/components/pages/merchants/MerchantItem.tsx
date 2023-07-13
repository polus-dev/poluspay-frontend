import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCopyText } from '../../../hooks/useCopyText';

import './MerchantItem.scoped.scss';
import { ReactComponent as IconCopy } from '../../../assets/icons/copy.svg';
// remove the import below
import defaultLogo from '../../../images/connect-button.jpg';
import { LogoStatus } from '../../../store/api/endpoints/merchant/Merchant.interface';

// replace interface and props below with the correct ones
interface IMerchantProps {
    name: string;
    website: string;
    id: string;
    logo: string | null;
    avatarStatus: LogoStatus;
}

export const MerchantItem: React.FC<IMerchantProps> = ({
    name,
    website,
    id,
    logo,
    avatarStatus,
}) => {
    const navigate = useNavigate();
    const copy = useCopyText();

    const getShortName = () => {
        if (name.length > 20 && window.innerWidth > 768)
            return `${name.slice(0, 18)}...`;

        return window.innerWidth < 768 && name.length > 12
            ? `${name.slice(0, 8)}...`
            : name;
    };

    const getShortId = () => {
        return window.innerWidth > 768
            ? `${id.slice(0, 6)}...${id.slice(-6)}`
            : `${id.slice(0, 4)}...${id.slice(-4)}`;
    };

    const getShortDomain = () => {
        return website.includes('https://')
            ? website.replace('https://', '')
            : website;
    };

    const navigateToWebsite = (event: React.MouseEvent): void => {
        event.preventDefault();

        window.open(website, '_blank');
    };

    const navigateToInvoice = (event: React.MouseEvent): void => {
        event.preventDefault();

        navigate(`/merchants/${id}/invoices`);
    };

    return (
        <Link className="merchant-item" to={`/merchants/${id}/merchant`}>
            <div className="merchant-item__inner">
                <div className="merchant-item__name">
                    {/* check if avatar is set and
                    replace src with dynamic one */}
                    <img
                        className="merchant-item__name-image"
                        alt="Merchant avatar"
                        src={
                            avatarStatus === 'confirmed' && logo
                                ? logo
                                : defaultLogo
                        }
                    />
                    <p className="merchant-item__name-text">{getShortName()}</p>
                </div>
                <div className="merchant-item__nameweb">
                    <div className="merchant-item__nameweb__inner">
                        {/* check if avatar is set and
                        replace src with dynamic one */}
                        <img
                            className="merchant-item__nameweb__inner-image"
                            alt="Merchant avatar"
                            src={
                                avatarStatus === 'confirmed' && logo
                                    ? logo
                                    : defaultLogo
                            }
                        />
                        <p className="merchant-item__nameweb__inner-text">
                            {getShortName()}
                        </p>
                    </div>
                    <p
                        className="merchant-item__nameweb-text"
                        onClick={(event) => navigateToWebsite(event)}
                    >
                        {getShortDomain()}
                    </p>
                </div>
                <div className="merchant-item__website">
                    <p
                        className="merchant-item__nameweb-text"
                        onClick={(event) => navigateToWebsite(event)}
                    >
                        {getShortDomain()}
                    </p>
                </div>
                <div className="merchant-item__id">
                    <div className="merchant-item__id-inner">
                        <p
                            className="merchant-item__id-inner-text"
                            onClick={(event) => event.preventDefault()}
                        >
                            {copy.copied ? 'Copied!' : getShortId()}
                        </p>
                        <IconCopy
                            className="merchant-item__id-inner-icon"
                            onClick={(event) => copy.copy(id, event)}
                        />
                    </div>
                </div>
                <div className="merchant-item__button">
                    <div
                        className="merchant-item__button-item"
                        onClick={(event) => navigateToInvoice(event)}
                    >
                        Create&nbsp;invoice
                    </div>
                </div>
            </div>
        </Link>
    );
};
