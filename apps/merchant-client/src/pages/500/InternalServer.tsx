import { PButton } from '@poluspay-frontend/ui'
import './InternalServer.scoped.scss'

export const InternalServerErrorPage: React.FC = () => {
    return (
        <div className="error-page">
            <div className="error-page__inner">
                <img
                    className="error-page__inner-image"
                    src="/images/500.png"
                    alt="Error image"
                />
                <div className="error-page__inner-content">
                    <h5 className="error-page__inner-content-title">
                        500
                    </h5>
                    <h6 className="error-page__inner-content-subtitle">
                        Internal Server Error
                    </h6>
                    {/*<p className="error-page__inner-content-description">*/}
                    {/*    Request ID: 2fedd721-794e-49c5-b92e-b3ecc6b1a6cc*/}
                    {/*</p>*/}
                    <div className="error-page__inner-content-button">
                        <PButton
                            wide
                            size="lg"
                            to="/"
                            children={
                                <p>Go home</p>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
