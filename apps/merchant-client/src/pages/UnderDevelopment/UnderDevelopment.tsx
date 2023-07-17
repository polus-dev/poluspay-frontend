import { useNavigate } from 'react-router';

import { PButton } from '@poluspay-frontend/ui';

import './UnderDevelopment.scoped.scss';

export const UnderDevelopmentPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <img
                className="error-page__image"
                src="/images/under-development.png"
                alt="Under development"
            />
            <div className="error-page__text">
                <h6 className="error-page__text-title">
                    This page is currently under development
                </h6>
                <p className="error-page__text-description">
                    As this page becomes available, you can find out about it in
                    the update digest on the home page
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
