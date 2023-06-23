import { Button, FormItem, Input, Link as LinkVk } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { VldBuilder, vlds } from 'validatorus-react'

import LogoSvg from '../../img/logo.svg'

import login1 from '../../img/login1.svg'
import login2 from '../../img/login2.svg'
import login3 from '../../img/login3.svg'
import login4 from '../../img/login4.svg'

interface MainProps {
    id: string,
    isDesktop: boolean,
    setLoginPage: Function,
    setAuth: Function,
    loginUser: Function,
    checkCode: Function
}

export const LoginPage: React.FC<MainProps> = (props: MainProps) => {
    const [firstRender, setFirstRender] = React.useState<boolean>(false)

    const [loginPageType, setLoginPageType] = React.useState<number>(1)

    const [timer, setTimer] = React.useState<string>('1:00')

    const inputEmail = new VldBuilder()
        .with(vlds.VEmail)
        .withFname('E-mail')

    const inputCode = new VldBuilder()
        .with(vlds.VLen, 6, 6)
        .withFname('Code')

    const history = useNavigate()

    function startTimer() {
        const timer = 60
        const eventTime = Number((Date.now() / 1000) + timer)
        const currentTime = Date.now() / 1000
        let diffTime = eventTime - currentTime - 1;
        const interval = 1000

        if (diffTime < 0) return

        const interv = setInterval(() => {
            const minutes = Math.floor(diffTime / 60)
            const seconds = Math.floor(diffTime % 60)
            if (diffTime <= 0) clearInterval(interv)
            setTimer(`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`)
            diffTime--;
        }, interval)
    }

    async function login() {
        if (window.gtag) window.gtag('event', 'reg_click_send-code')
        const data = await props.loginUser(inputEmail.value)
        if (data) {
            setLoginPageType(2)
            inputCode.reset(true, true)

            startTimer()
        }
    }

    async function sendCode() {
        const data = await props.checkCode(inputEmail.value, inputCode.value)
        if (!data) {
            return undefined
        }
        props.setLoginPage(false)
        props.setAuth(2)

        history('/merchants')

        return true
    }

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(true)
        }
    }, [])

    return (
        <div className="polus-login" id={props.id}>
            {props.isDesktop
                ? <div className="polus-login-block grey-block">
                    <div className="login-text-block">
                        <img src={LogoSvg} style={{ marginLeft: '10px' }} />
                        <div className="login-svg">
                            <div className="login-img">
                                <img src={login1} />
                            </div>

                            <span>
                                No KYC, ID card, Bank Account required, just register for free and start now
                            </span>
                        </div>
                        <div className="login-svg">
                            <div className="login-img">
                                <img src={login2} />
                            </div>
                            <span>
                                Payments receives to your own wallet, service didn't store any funds
                            </span>
                        </div>
                        <div className="login-svg">
                            <div className="login-img">
                                <img src={login3} />
                            </div>
                            <span>
                                Allows users to pay in multiple coins, merchant receive target-currency
                            </span>
                        </div>
                        <div className="login-svg">
                            <div className="login-img">
                                <img src={login4} />
                            </div>
                            <span>
                                No monthly fee, no withdrawal fee, only 0.5% loyal processing fee
                            </span>
                        </div>
                    </div>
                </div>
                : null}

            <div className="polus-login-block black-block" style={props.isDesktop ? {} : { width: '100%' }}>
                <h5 className="polus-h5">Register & Login</h5>

                {loginPageType === 1
                    ? <form className="login-form">
                        <FormItem top="E-mail" bottom={inputEmail.error.slice(10)}> {/* { NOTE: slice(10) - remove 'E-mail: '} */}
                            <Input
                                type="email"
                                placeholder='email@examle.com'
                                value={inputEmail.value.trim()}
                                onChange={e => inputEmail.change(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && inputEmail.iserr === 'valid' ? login() : null}
                                status={inputEmail.iserr}
                                name="email"
                            />
                        </FormItem>
                        <FormItem>
                            <Button
                                size="l"
                                stretched onClick={() => login()}
                                disabled={inputEmail.iserr !== 'valid'}>
                                Send code
                            </Button>
                        </FormItem>

                    </form>
                    : null}

                {loginPageType === 2
                    ? <div className="login-form">
                        <FormItem top="Code" bottom={
                            timer === '00:00'
                                ? <LinkVk onClick={() => {
                                    login()
                                    if (window.gtag) window.gtag('event', 'reg_click_resend-code')
                                }}>Resend code</LinkVk> : `Resend code ${timer}`
                        }>
                            <Input
                                type="text"
                                placeholder='XXXXXX'
                                value={inputCode.value.trim()}
                                onChange={e => inputCode.change(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && inputCode.iserr === 'valid' ? sendCode() : null}
                                status={inputCode.iserr}
                            />
                        </FormItem>
                        <FormItem>
                            <Button size="l" stretched onClick={() => {
                                sendCode()
                            }}>Login</Button>
                        </FormItem>

                    </div>
                    : null
                }
            </div>

        </div>
    )
}
