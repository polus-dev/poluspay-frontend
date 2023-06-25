import { PanelHeader } from '@vkontakte/vkui';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const HeaderBlock: React.FC = () => {
    const [firstRender, setFirstRender] = React.useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(true);
        }
    }, []);

    useEffect(() => {}, []);

    return (
        <PanelHeader
            separator={false}
            className="delab-header-full delab-header header-full"
            after={<div></div>}
        >
            <div
                className="delab-header-btn"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginLeft: '10px',
                }}
            ></div>
        </PanelHeader>
    );
};
