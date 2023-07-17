import { useNavigate } from 'react-router';

import { PButton } from '@poluspay-frontend/ui';

import './NotFound.scoped.scss';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <img
                className="error-page__image"
                src="/images/404.png"
                alt="404"
            />
            <div className="error-page__text">
                <h6 className="error-page__text-title">
                    This page does not exist
                </h6>
                <p className="error-page__text-description">
                    Perhaps you wanted to go to another page
                </p>
            </div>
            <div className="error-page__button">
                <PButton
                    wide
                    size="lg"
                    children={<p>Go back</p>}
                    onClick={() => navigate(-1)}
                />
            </div>
        </div>
    );
};
