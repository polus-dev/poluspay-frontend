import { Button, Div, FormItem, FormLayoutGroup, Group, Input, Panel } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface MainProps {
    id: string,
    setActiveModal: Function,
    text: any
}

export const Error: React.FC<MainProps> = (props: MainProps) => {
    const [firstRender, setFirstRender] = React.useState<boolean>(false)

    const history = useNavigate()

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(true)
        }

        if (props.text === '' || !props.text) {
            // history('/merchants')
        }
    }, [])

    return (
        <Panel id={props.id}>

            <Group>

                <Div >
                    <div className="admin-header-block">
                        <h5 className="polus-h5" style={{ textAlign: 'center', width: '100%' }}>Error 500</h5>
                    </div>

                    <div style={{ textAlign: 'center', width: '100%' }}>
                        Request id <span style={{ userSelect: 'all' }}>{props.text}</span>
                    </div>

                </Div>
            </Group>
        </Panel>
    )
}
