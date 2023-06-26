import { useState } from 'react';

import SettingsForm from '../../components/pages/settings/Form';
import SettingsGoogleAuth from '../../components/pages/settings/GoogleAuth';
import SettingsRemoval from '../../components/pages/settings/Removal';
import SettingsRemovalForm from '../../components/pages/settings/removal/RemovalForm';
import PLabel from '../../components/ui/PLabel/PLabel';

import './Settings.scoped.scss';

const SettingsPage: React.FC = () => {
    const [state, setState] = useState<'default' | '2fa' | 'removal'>(
        'default'
    );

    const [formNotification, setFormNotification] = useState(false);

    // replace with real data
    const hasEmailConnected = true;

    const handleForm = () => {
        setFormNotification(true);

        setTimeout(() => {
            setFormNotification(false);
        }, 3000);
    };

    const refreshPageData = () => {
        setState('default');
    };

    return (
        <>
            <div className="settings">
                <div className="settings__inner">
                    {state === 'default' && (
                        <>
                            <div className="settings__inner-form">
                                <SettingsForm onFinish={handleForm} />
                            </div>
                            {hasEmailConnected && (
                                <>
                                    <div className="settings__inner-auth">
                                        <SettingsGoogleAuth
                                            onButtonClick={(type) =>
                                                console.log(type)
                                            }
                                        />
                                    </div>
                                    <div className="settings__inner-removal">
                                        <SettingsRemoval
                                            onDelete={() => setState('removal')}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    {state === 'removal' && (
                        <>
                            <SettingsRemovalForm
                                onDelete={() => console.log('delete account')}
                                onCancel={refreshPageData}
                            />
                        </>
                    )}
                </div>
            </div>
            <PLabel
                visible={formNotification}
                status="success"
                title="Congratulations!"
                description="Email successfully added"
            />
        </>
    );
};

export default SettingsPage;
