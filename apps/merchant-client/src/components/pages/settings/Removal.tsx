import { useNavigate } from 'react-router-dom'

import './Removal.scoped.scss'

const SettingsRemoval: React.FC = () => {
    const navigator = useNavigate()

    const navigate = () => {
        navigator('/settings/delete')
    }

    return (
        <div className="removal">
            <h6 className="removal__title">
                Account removal
            </h6>
            <div
                className="removal__action"
                onClick={navigate}
            >
                Delete account
            </div>
        </div>
    )
}

export default SettingsRemoval
