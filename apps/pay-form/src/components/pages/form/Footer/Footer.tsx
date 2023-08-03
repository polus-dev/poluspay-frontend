import { ReactComponent as LogoPolus } from '../../../../assets/logos/poluspay.svg';

import './Footer.scoped.scss';

export const FormFooter: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer__legal">
                <p className="footer__legal-text">
                    By making a payment, you agree to the&nbsp;
                    <a
                        className="footer__legal-text--highlight"
                        href=""
                        target="_blank"
                    >
                        Terms&nbsp;of&nbsp;Use
                    </a>
                    <br />
                    &nbsp;and&nbsp;
                    <a
                        className="footer__legal-text--highlight"
                        href=""
                        target="_blank"
                    >
                        Privacy&nbsp;Policy
                    </a>
                </p>
            </div>
            <div className="footer__ownership">
                <p className="footer__ownership-text">Powered by</p>
                <LogoPolus className="footer__ownership-icon" />
            </div>
        </div>
    );
};
