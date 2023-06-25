import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PSwitch from '../../ui/PSwitch/PSwitch'
import { ReactComponent as Icon2FA } from '../../../assets/icons/2fa.svg'

import './GoogleAuth.scoped.scss'

const SettingsGoogleAuth: React.FC = () => {
    const navigator = useNavigate()
    // replace with actual data
    const [value, setValue] = useState(true)

    const navigate = () => {
        navigator('/settings/2fa')
    }

    return (
        <div className="auth">
            <div className="auth__inner">
                <h6 className="auth__inner-title">
                    Two-Factor Authentication
                </h6>
                <p className="auth__inner-description">
                    By implementing Google Authenticator,
                    Polus Payments aims to provide an
                    additional layerof security that
                    complements the existing email-based
                    authentication. With the app installed,
                    you will have access to a constantly
                    changing verification code on your mobile
                    devices, further securing your account.
                </p>
                <div
                    className="auth__inner-button"
                    onClick={navigate}
                >
                    <div className="auth__inner-button-content">
                        <Icon2FA className="auth__inner-button-content-icon" />
                        <p className="auth__inner-button-content-text">
                            Google Authenticator
                        </p>
                    </div>
                    <PSwitch
                        value={value}
                        onChange={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default SettingsGoogleAuth
