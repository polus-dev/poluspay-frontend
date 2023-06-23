import { Icon56DiamondOutline, Icon56LaptopOutline, Icon56LinkCircleOutline, Icon56WalletOutline } from '@vkontakte/icons'
import { Button, Card, CardGrid, Div, FormItem, FormLayoutGroup, Group, Header, Input, Panel, PanelHeader, Title } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface MainProps {
    id: string,
    setActiveModal: Function
}

export const Settings: React.FC<MainProps> = (props: MainProps) => {
    const [ firstRender, setFirstRender ] = React.useState<boolean>(false)

    const history = useNavigate()

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(true)
        }
    }, [])

    return (
        <Panel id={props.id}>

            <Div style={{ paddingTop: 0 }}>
                <div className="admin-header-block">
                    <h5 className="polus-h5">Settings</h5>
                </div>

                <div>
                    <span>Coming soon...</span>
                    <FormLayoutGroup mode="horizontal">
                        <FormItem top="Name">
                            <Input type="text" placeholder='Your name' disabled />
                        </FormItem>

                        <FormItem top="E-mail">
                            <Input type="email" placeholder='email@example.com' disabled />
                        </FormItem>

                    </FormLayoutGroup>

                    <FormItem>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Button size="l" disabled>Save settings</Button>
                        </div>

                    </FormItem>
                </div>

            </Div>
        </Panel>
    )
}
