import { ReactComponent as LogoPolus } from '../../../../assets/logos/poluspay.svg';

import './Footer.scoped.scss';

interface FormFooterProps {
    hasLegal?: boolean;
}

export const FormFooter: React.FC<FormFooterProps> = ({ hasLegal = true }) => {
    return (
        <div className="footer">
            {hasLegal && (
                <div className="footer__legal">
                    <p className="footer__legal-text">
                        By making a payment, you agree to the&nbsp;
                        <a
                            className="footer__legal-text--highlight"
                            href="https://poluspay.com/terms-of-use"
                            target="_blank"
                        >
                            Terms&nbsp;of&nbsp;Use
                        </a>
                        <br />
                        &nbsp;and&nbsp;
                        <a
                            className="footer__legal-text--highlight"
                            href="https://poluspay.com/privacy-policy"
                            target="_blank"
                        >
                            Privacy&nbsp;Policy
                        </a>
                    </p>
                </div>
            )}
            <a
                className="footer__ownership"
                href="https://poluspay.com/"
                target="_blank"
            >
                <p className="footer__ownership-text">Powered by</p>
                <LogoPolus className="footer__ownership-icon" />
            </a>
        </div>
    );
};
