
import { Link, useNavigate } from 'react-router-dom';

import { useCopyText } from '../../../hooks/useCopyText';

import { ReactComponent as IconCopy } from '../../../assets/icons/copy.svg';

import './MerchantItem.scoped.scss';
import { makeShortHash } from '../../../../../../tools';
import { useRandomId } from '@poluspay-frontend/hooks';
import {LogoStatus} from "@poluspay-frontend/api";

interface IMerchantProps {
    name: string;
    website: string | null;
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
            return makeShortHash(name, 18, 0);
        // return `${name.slice(0, 18)}...`;

        return window.innerWidth < 768 && name.length > 12
            ? /* `${name.slice(0, 8)}...` */ makeShortHash(name, 12, 0)
            : name;
    };

    const getShortId = () => {
        return window.innerWidth > 768
            ? makeShortHash(id, 6)
            : makeShortHash(id, 4);
    };

    const getShortDomain = () => {
        if (!website) return 'no website';
        return website.includes('https://')
            ? website.replace('https://', '')
            : website;
    };

    const navigateToWebsite = (event: React.MouseEvent): void => {
        event.preventDefault();
        if (website) window.open(website, '_blank');
    };

    const navigateToInvoice = (event: React.MouseEvent): void => {
        event.preventDefault();

        navigate(`/merchants/${id}/invoices`);
    };
    const randomId = useRandomId();

    return (
        <Link className="merchant-item" to={`/merchants/${id}/merchant`}>
            <div className="merchant-item__inner">
                <div className="merchant-item__name">
                    {avatarStatus === 'confirmed' && logo && (
                        <img
                            className="merchant-item__name-image"
                            alt="Merchant avatar"
                            src={logo}
                        />
                    )}
                    <p className="merchant-item__name-text">{getShortName()}</p>
                </div>
                <div className="merchant-item__nameweb">
                    <div className="merchant-item__nameweb__inner">
                        {avatarStatus === 'confirmed' && logo && (
                            <img
                                className="merchant-item__nameweb__inner-image"
                                alt="Merchant avatar"
                                src={`${logo}?id=${randomId}`}
                            />
                        )}
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
