/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';

import {
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Div,
    Epic,
    Tabbar,
    TabbarItem,
    FormItem,
    Input,
    Button,
    Group,
    SimpleCell,
    CardGrid,
    Card,
    Textarea,
    Snackbar,
    Select,
    ScreenSpinner,
    SubnavigationBar,
    SubnavigationButton,
    PanelHeader,
} from '@vkontakte/vkui/old';
import {
    Link,
    Route,
    Routes,
    redirect,
    useLocation,
    useNavigate,
} from 'react-router-dom';

import {
    Icon24Dismiss,
    Icon28CancelCircleFillRed,
    Icon28CheckCircleFill,
    Icon28ChevronDownOutline,
    Icon28ChevronUpOutline,
    Icon28DoorArrowRightOutline,
    Icon28SettingsOutline,
    Icon28Users3Outline,
} from '@vkontakte/icons/old';
import { VldBuilder, vlds } from 'validatorus-react';
import { ChipsSelect } from '@vkontakte/vkui/old/dist/unstable';

import '@vkontakte/vkui/old/dist/vkui.css';
import './style.css';

import * as t from 'io-ts';
import {
    MerchantRepo,
    NewReposWithClient,
    PaymentRepo,
    UserRepo,
} from './backend/api';
import { BackendClient } from './backend/client';

import logo from './img/logo.svg';

import { Main } from './pages/main';
import { LoginPage } from './pages/login';
import { Merchant } from './pages/merchant';
import { Settings } from './pages/settings';
import { Invoices } from './pages/invoises';
import { responses } from './backend/scheme/responses';
import {
    ErrorApiResp,
    MerchantApiResp,
    NewApi,
    RespApi,
    WebhookResp,
} from './logic/api';
import { HeaderBlock } from './layout/header';
import { LogoutModal } from './components/modals/LogoutModal';
import { useCreateMerchantMutation } from './store/api/endpoints/merchant/Merchant';
import { useCreatePaymentMutation } from './store/api/endpoints/payment/Payment';
import {
    Blockchain_t,
    IAssets,
} from './store/api/endpoints/payment/Payment.interface';
import { useGetAssetsQuery } from './store/api/endpoints/asset/Asset';
import { useAppDispatch } from './store/hooks';
import { refreshAuthStore } from './store/features/user/userSlice.';
import { useGetMeQuery } from './store/api/endpoints/user/User';

function truncAddress(address: any): string {
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

const url = 'https://pay.polus.fi';

const client = new BackendClient({ url });

type Unpack<T> = T extends (infer U)[] ? U : T;
type WebhookInfo = Unpack<t.TypeOf<typeof responses.merchant.webhook_history>>;

export const App: React.FC = () => {
    const [activeModal, setActiveModal] = React.useState<any>(null);

    const [snackbar, setSnackbar] = React.useState<any>(null);

    const [popout, setPopout] = React.useState<any>(null);

    const [firstRender, setFirstRender] = React.useState<boolean>(false);

    const [loginPage, setLoginPage] = React.useState<boolean>(false);

    const [auth, setAuth] = React.useState<number>(0);

    const [api, setApi] = React.useState<{
        user: UserRepo;
        merch: MerchantRepo;
        pay: PaymentRepo;
    }>(NewReposWithClient(client));

    const [selectMerhant, setSelectMerhant] = React.useState<
        MerchantApiResp | undefined
    >(undefined);

    const [selectMerchantId, setSelectMerchantId] = React.useState<
        string | undefined
    >(undefined);

    const { data: me } = useGetMeQuery();

    const [webhookHistory, setWebhookHistory] = React.useState<
        WebhookResp[] | undefined
    >(undefined);

    const [webhookHistoryOne, setWebhookHistoryOne] = React.useState<
        WebhookResp | undefined
    >(undefined);

    const [walletOpen, setWalletOpen] = React.useState<boolean>(false);

    const [assets, setAssets] = React.useState<
        { label: string; value: any }[] | undefined
    >(undefined);

    const [errorText, setErrorText] = React.useState<any | undefined>(
        undefined
    );

    const [isDesktop, setIsDesktop] = React.useState<boolean>(
        window.innerWidth >= 1200
    );

    const location = useLocation();
    const dispatch = useAppDispatch();

    const history = useNavigate();

    const newApi = new NewApi();

    function openPop() {
        setPopout(<ScreenSpinner state="loading" />);
    }

    // NEW CODE START

    const { data: getAssetsData } = useGetAssetsQuery();
    const [blockchain, setBlockchain] = React.useState<
        { value: Blockchain_t; label: Blockchain_t }[]
    >([]);

    useEffect(() => {
        if (getAssetsData) {
            setAssets(
                Object.keys(getAssetsData).map((key) => {
                    return {
                        label: key,
                        value: key,
                    };
                })
            );
        }
    }, [getAssetsData]);

    const [createMerchantR] = useCreateMerchantMutation();
    const [createPayment] = useCreatePaymentMutation();

    // NEW CODE END
    function closePop(type: boolean) {
        if (type)
            setPopout(<ScreenSpinner state="done" aria-label="Success" />);
        else setPopout(<ScreenSpinner state="error" aria-label="Error" />);

        setTimeout(() => {
            setPopout(null);
        }, 1000);
    }

    const input = new VldBuilder()
        .with(vlds.VLen, 4, 128)
        .withFname('Merchant name');

    const inputAddress = new VldBuilder()
        .with(vlds.VHex)
        .with(vlds.VLen, 42, 42)
        .withFname('Withdrawal address');

    const inputLink = new VldBuilder()
        .with(vlds.VDomain)
        .withFname('Website link');

    const inputDesc = new VldBuilder()
        .with(vlds.VLen, 10, 256)
        .withFname('Description');

    const inputDel = new VldBuilder().with(vlds.VLen, 4, 128).withFname('Name');

    const inputCreateValue = new VldBuilder()
        .with(vlds.VNumber, 0, 100000)
        .withFname('Value');

    const inputCreatAsset = new VldBuilder()
        .with(vlds.VLen, 2, 5)
        .withFname('Asset');

    const [selectedBlockchain, setSelectedBlockchain] =
        React.useState(blockchain);

    const blockchainChipsProps = {
        value: selectedBlockchain,
        onChange: setSelectedBlockchain,
        options: blockchain,
        placeholder: 'Blockchain',
        creatable: true,
    };

    const inputCreateDesc = new VldBuilder()
        .with(vlds.VLen, 10, 128)
        .withFname('Description');

    const inputEvmAddress = new VldBuilder()
        .with(vlds.VHex)
        .with(vlds.VLen, 42, 42)
        .withFname('Withdrawal address');

    const inputTronAddress = new VldBuilder()
        .with(vlds.VLen, 34, 34)
        .withFname('Withdrawal address Tron');

    const inputBitcoinAddress = new VldBuilder()
        .with(vlds.VLen, 10, 35)
        .withFname('Withdrawal address Bitcoin');

    async function logOut() {
        setAuth(1);
        setLoginPage(true);
        history('/');

        newApi.logOut();

        // clearToken()
    }

    useEffect(() => {}, [assets]);

    function consoleLog(data: string, type: boolean = false) {
        setSnackbar(
            <Snackbar
                before={
                    type ? (
                        <Icon28CheckCircleFill />
                    ) : (
                        <Icon28CancelCircleFillRed />
                    )
                }
                onClose={() => setSnackbar(null)}
            >
                {data}
            </Snackbar>
        );
    }

    function onErrorApi(resp: RespApi | ErrorApiResp | undefined) {
        if (!resp) {
            // logOut()
            closePop(false);
            return false;
        }
        if (!resp || (resp as ErrorApiResp).code !== 200) {
            if ((resp as ErrorApiResp).code === 3004) {
                // webhook history
                return false;
            }
            if ((resp as ErrorApiResp).code === 1002) {
                logOut();

                closePop(false);
                return false;
            }
            if ((resp as ErrorApiResp).code === 500) {
                setErrorText((resp as ErrorApiResp).message);
                // window.location.replace(
                //   errorRedirectUrl({
                //     text: errorText,
                //     backRedirect: document.URL,
                //     errorCode: 500,
                //   })
                // );
                closePop(false);
                setActiveModal(null);

                return false;
            }
            if (resp) {
                const respA = resp as ErrorApiResp;
                if (respA.code) {
                    consoleLog(`#${respA.code} ${respA.message}`, false);
                } else {
                    return true;
                }
            } else {
                consoleLog('error undefined', false);
            }
            closePop(false);
            return false;
        }
        return true;
    }

    async function loginUser(email: string) {
        openPop();

        const resp = await newApi.sendEmailCode(email);

        if (!onErrorApi(resp)) return false;

        closePop(true);
        console.log(resp);

        return true;
    }

    async function checkCode(email: string, code: string): Promise<boolean> {
        openPop();

        const resp = await newApi.getTokens(email, code);

        if (!onErrorApi(resp)) return false;
        dispatch(refreshAuthStore(newApi));

        closePop(true);
        history('/merchants');

        return true;
    }

    async function gelMerchant() {
        if (selectMerhant) {
            const resp = await newApi.merchantDel(selectMerhant.id);
            // const resp = await api.merch.delete({ merchant_id: Number(selectMerhant.merchant_id) })
            // if (resp.status !== 'ok') {
            //     console.log('status not ok:', resp)
            //     consoleLog(resp.desc)
            //     if (resp.code === 1105) {
            //         logOut()
            //     }
            //     return false
            // }

            if (!onErrorApi(resp)) return false;

            console.log(resp);

            history('/merchants');
            setActiveModal(null);
            consoleLog('Merchant successfully deleted', true);
            // setActiveModal(null)
            return true;
        }
        return false;
    }

    async function createInvoice() {
        if (selectMerchantId) {
            const assets: Partial<IAssets> = {};
            selectedBlockchain.forEach((asset) => {
                let address: string;
                if (asset.value === 'tron') address = inputTronAddress.value;
                else if (
                    asset.value === 'bitcoin' ||
                    asset.value === 'dogecoin' ||
                    asset.value === 'litecoin'
                ) {
                    address = inputBitcoinAddress.value;
                } else {
                    address = inputEvmAddress.value;
                }

                assets[asset.value] = {
                    [inputCreatAsset.value]: {
                        amount: inputCreateValue.value,
                        address,
                    },
                };
            });

            // TODO: catch error
            try {
                await createPayment({
                    // @ts-ignore
                    merchant_id: selectMerchantId.id,
                    description: inputCreateDesc.value,
                    assets,
                }).unwrap();
                consoleLog('Successfully create invoice', true);
            } catch (e) {
                consoleLog('failed create invoice', false);
            }

            setActiveModal(null);

            return true;
        }
        return false;
    }

    async function getWebhookHistory(merchant_id: string) {
        const resp = await newApi.getWebhook(merchant_id);

        if (!onErrorApi(resp)) return false;

        console.log(resp);

        const respType = resp as WebhookResp[];

        setWebhookHistory(respType);
        return true;
    }

    useEffect(() => {
        window.addEventListener('resize', () =>
            setIsDesktop(window.innerWidth >= 1200)
        );
    }, [window.innerWidth]);

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(true);

            const au = newApi.checkAuth();

            if (au) {
                setAuth(2);
                if (location.pathname === '/') {
                    history('/merchants');
                }
            } else {
                logOut();
            }

            // checkAuth()
        }
    }, []);

    // useEffect(() => {
    //     if (api.user._client.jwt !== '') {
    //         getUser()
    //     }
    // }, [ api ])

    useEffect(() => {
        if (selectMerhant) {
            inputEvmAddress.change(
                selectMerhant.evm_withdraw_address === null
                    ? ''
                    : selectMerhant.evm_withdraw_address
            );
            inputTronAddress.change(
                selectMerhant.tron_withdraw_address === null
                    ? ''
                    : selectMerhant.tron_withdraw_address
            );

            console.log('changed', selectMerhant);
        }
    }, [selectMerhant, activeModal]);

    useEffect(() => {
        if (activeModal === null) {
            input.reset(true, true);
            inputAddress.reset(true, true);
            inputDesc.reset(true, true);
            inputLink.reset(true, true);
            inputDel.reset(true, true);
            inputCreateValue.reset(true, true);
            inputCreatAsset.change('USDC');
            inputCreateDesc.reset(true, true);

            inputEvmAddress.reset(true, true);
            inputTronAddress.reset(true, true);
        }
    }, [activeModal]);

    const modalRoot = (
        <ModalRoot activeModal={activeModal}>
            <ModalPage
                id={'create_merchant'}
                className="polus"
                onClose={() => setActiveModal(null)}
                dynamicContentHeight
                // settlingHeight={100}
                header={
                    <ModalPageHeader
                        after={
                            !isDesktop && (
                                <PanelHeaderButton
                                    onClick={() => setActiveModal(null)}
                                >
                                    <Icon24Dismiss />
                                </PanelHeaderButton>
                            )
                        }
                    >
                        New merchant
                    </ModalPageHeader>
                }
            >
                <Div>
                    <FormItem top="Merchant name" bottom={input.error}>
                        <Input
                            type="text"
                            placeholder="Company name"
                            value={input.value}
                            onChange={(e) => {
                                input.change(e.target.value);
                            }}
                            status={input.iserr}
                        />
                    </FormItem>
                    <FormItem
                        top="Merchant website domain"
                        bottom={inputLink.error}
                    >
                        <Input
                            type="text"
                            placeholder="example.com"
                            value={inputLink.value}
                            onChange={(e) => {
                                inputLink.change(e.target.value);
                            }}
                            status={inputLink.iserr}
                        />
                    </FormItem>
                    <FormItem
                        top="withdrawal address Ethereum, BNB Chain, Polygon"
                        bottom={inputAddress.error}
                    >
                        <Input
                            type="text"
                            placeholder="0x..."
                            value={inputAddress.value}
                            onChange={(e) => {
                                inputAddress.change(e.target.value);
                            }}
                            status={inputAddress.iserr}
                        />
                    </FormItem>
                    <FormItem
                        top="Withdrawal address Tron"
                        bottom={inputTronAddress.error}
                    >
                        <Input
                            type="text"
                            placeholder="Tr..."
                            value={inputTronAddress.value}
                            onChange={(e) => {
                                inputTronAddress.change(e.target.value);
                            }}
                            status={inputTronAddress.iserr}
                        />
                    </FormItem>

                    <FormItem top="Description" bottom={inputDesc.error}>
                        <Textarea
                            placeholder="Few words about merchant..."
                            value={inputDesc.value}
                            onChange={(e) => {
                                inputDesc.change(e.target.value);
                            }}
                            status={inputDesc.iserr}
                        ></Textarea>
                    </FormItem>
                    <FormItem>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* <Button
                                size="l"
                                stretched
                                mode="outline"
                                style={{ marginRight: '16px' }}
                                onClick={() => setActiveModal(null)}
                            >Cancel</Button> */}
                            <Button
                                size="l"
                                stretched
                                // disabled={!formCreateM}
                                disabled={
                                    !(
                                        inputAddress.iserr === 'valid' &&
                                        inputLink.iserr === 'valid' &&
                                        input.iserr === 'valid'
                                    )
                                }
                                onClick={() => {
                                    createMerchantR({
                                        name: input.value,
                                        evm_withdraw_address:
                                            inputAddress.value,
                                        description: inputDesc.value,
                                        domain: inputLink.value,
                                        tron_withdraw_address:
                                            inputTronAddress.value,
                                    })
                                        .unwrap()
                                        .then((res) => {
                                            // @ts-ignore
                                            history(`/merchant/${res.id}`);
                                            setActiveModal(null);
                                        });
                                }}
                            >
                                Create merchant
                            </Button>
                        </div>
                    </FormItem>
                </Div>
            </ModalPage>

            <ModalPage
                id={'delete_merchant'}
                className="polus"
                onClose={() => setActiveModal(null)}
                dynamicContentHeight
                // settlingHeight={100}
                header={
                    <ModalPageHeader
                        after={
                            !isDesktop && (
                                <PanelHeaderButton
                                    onClick={() => setActiveModal(null)}
                                >
                                    <Icon24Dismiss />
                                </PanelHeaderButton>
                            )
                        }
                    >
                        Delete {selectMerhant?.name}?
                    </ModalPageHeader>
                }
            >
                <Div>
                    <FormItem top="To confirm, please enter the name of merchant.">
                        <Input
                            type="text"
                            placeholder="Merchant name"
                            value={inputDel.value}
                            onChange={(e) => inputDel.change(e.target.value)}
                        />
                    </FormItem>

                    <FormItem>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* <Button
                                size="l"
                                stretched
                                mode="outline"
                                style={{ marginRight: '16px' }}
                                onClick={() => setActiveModal(null)}
                            >Cancel</Button> */}
                            <Button
                                size="l"
                                stretched
                                disabled={
                                    inputDel.value !== selectMerhant?.name
                                }
                                onClick={() => {
                                    gelMerchant();
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </FormItem>
                </Div>
            </ModalPage>

            <ModalPage
                id={'create_invoice'}
                className="polus"
                onClose={() => setActiveModal(null)}
                // settlingHeight={100}
                dynamicContentHeight
                header={
                    <ModalPageHeader
                        after={
                            !isDesktop && (
                                <PanelHeaderButton
                                    onClick={() => setActiveModal(null)}
                                >
                                    <Icon24Dismiss />
                                </PanelHeaderButton>
                            )
                        }
                    >
                        Create invoice
                    </ModalPageHeader>
                }
            >
                {selectMerhant ? (
                    <Div>
                        <FormItem
                            top="Amount invoice"
                            bottom={inputCreateValue.error}
                        >
                            <Input
                                type="number"
                                placeholder="100"
                                value={inputCreateValue.value}
                                onChange={(e) =>
                                    inputCreateValue.change(e.target.value)
                                }
                                status={inputCreateValue.iserr}
                            />
                        </FormItem>

                        <FormItem top="Asset">
                            {assets ? (
                                <Select
                                    options={assets}
                                    onChange={(e) => {
                                        if (getAssetsData) {
                                            setBlockchain(
                                                Object.keys(
                                                    getAssetsData[
                                                        e.target.value
                                                    ]
                                                ).map((key) => {
                                                    return {
                                                        value: key,
                                                        label: key,
                                                    };
                                                })
                                            );
                                            setSelectedBlockchain([]);
                                            inputCreatAsset.change(
                                                e.target.value
                                            );
                                        }
                                    }}
                                />
                            ) : null}
                        </FormItem>
                        <FormItem top="Blockchain">
                            {blockchain ? (
                                <ChipsSelect
                                    {...blockchainChipsProps}
                                ></ChipsSelect>
                            ) : null}
                        </FormItem>

                        <FormItem
                            top="Description"
                            bottom={inputCreateDesc.error}
                        >
                            <Textarea
                                placeholder="Few words about invoice..."
                                value={inputCreateDesc.value}
                                onChange={(e) => {
                                    inputCreateDesc.change(e.target.value);
                                }}
                                status={inputCreateDesc.iserr}
                            ></Textarea>
                        </FormItem>

                        {selectedBlockchain.find((v) => v.value === 'tron') && (
                            <FormItem
                                top="Address Tron"
                                bottom={inputTronAddress.error}
                            >
                                <Input
                                    type="text"
                                    placeholder="T..."
                                    value={inputTronAddress.value}
                                    onChange={(e) =>
                                        inputTronAddress.change(e.target.value)
                                    }
                                    status={inputTronAddress.iserr}
                                />
                            </FormItem>
                        )}

                        {selectedBlockchain.find(
                            (v) =>
                                v.value === 'bitcoin' ||
                                v.value === 'litecoin' ||
                                v.value === 'dogecoin'
                        ) && (
                            <FormItem
                                top={`wallet address`}
                                bottom={inputTronAddress.error}
                            >
                                <Input
                                    type="text"
                                    value={inputBitcoinAddress.value}
                                    onChange={(e) =>
                                        inputBitcoinAddress.change(
                                            e.target.value
                                        )
                                    }
                                    status={inputBitcoinAddress.iserr}
                                />
                            </FormItem>
                        )}

                        <FormItem>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* <Button
                                size="l"
                                stretched
                                mode="outline"
                                style={{ marginRight: '16px' }}
                                onClick={() => setActiveModal(null)}
                            >Cancel</Button> */}
                                <Button
                                    size="l"
                                    stretched
                                    disabled={
                                        !(
                                            inputCreateValue.iserr ===
                                                'valid' &&
                                            inputEvmAddress.iserr === 'valid' &&
                                            inputTronAddress.iserr ===
                                                'valid' &&
                                            (selectedBlockchain.includes({
                                                label: 'bitcoin',
                                                value: 'bitcoin',
                                            })
                                                ? inputBitcoinAddress.iserr ===
                                                  'valid'
                                                : true)
                                        )
                                    }
                                    onClick={() => {
                                        createInvoice();
                                    }}
                                >
                                    Create
                                </Button>
                            </div>
                        </FormItem>
                    </Div>
                ) : null}
            </ModalPage>

            <ModalPage
                id={'webhook_history'}
                className="polus"
                onClose={() => setActiveModal(null)}
                // settlingHeight={100}
                dynamicContentHeight
                header={
                    <ModalPageHeader
                        after={
                            !isDesktop && (
                                <PanelHeaderButton
                                    onClick={() => setActiveModal(null)}
                                >
                                    <Icon24Dismiss />
                                </PanelHeaderButton>
                            )
                        }
                    >
                        Webhook history
                    </ModalPageHeader>
                }
            >
                <Div>
                    {webhookHistory && webhookHistory.length > 0 ? (
                        <table className="polus-table polus-table-hover">
                            <thead>
                                <tr>
                                    <th>UUID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {webhookHistory.map((webhook, key) => (
                                    <tr
                                        key={key}
                                        onClick={() => {
                                            setWebhookHistoryOne(webhook);
                                            setActiveModal(
                                                'webhook_history_one'
                                            );
                                        }}
                                    >
                                        <td>
                                            {truncAddress(webhook.payment_id)}
                                        </td>
                                        <td>{webhook.created_at}</td>
                                        <td>
                                            <SubnavigationBar>
                                                <SubnavigationButton
                                                    disabled
                                                    className={
                                                        webhook.response_status_code ===
                                                        200
                                                            ? 'completed'
                                                            : 'expired'
                                                    }
                                                >
                                                    {
                                                        webhook.response_status_code
                                                    }
                                                </SubnavigationButton>
                                            </SubnavigationBar>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            You don't have any webhooks yet
                        </div>
                    )}
                </Div>
            </ModalPage>

            <ModalPage
                id={'webhook_history_one'}
                className="polus"
                onClose={() => setActiveModal('webhook_history')}
                // settlingHeight={100}
                dynamicContentHeight
                header={
                    <ModalPageHeader
                        after={
                            !isDesktop && (
                                <PanelHeaderButton
                                    onClick={() =>
                                        setActiveModal('webhook_history')
                                    }
                                >
                                    <Icon24Dismiss />
                                </PanelHeaderButton>
                            )
                        }
                    >
                        Webhook info
                    </ModalPageHeader>
                }
            >
                <Div className="polus-select">
                    {webhookHistoryOne ? (
                        <div>
                            <table className="polus-table ">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{webhookHistoryOne.id}</td>
                                        <td>{webhookHistoryOne.created_at}</td>
                                        <td>
                                            <SubnavigationBar>
                                                <SubnavigationButton
                                                    disabled
                                                    className={
                                                        webhookHistoryOne.response_status_code ===
                                                        200
                                                            ? 'completed'
                                                            : 'expired'
                                                    }
                                                >
                                                    {
                                                        webhookHistoryOne.response_status_code
                                                    }
                                                </SubnavigationButton>
                                            </SubnavigationBar>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <SimpleCell
                                after={webhookHistoryOne.endpoint}
                                disabled
                            >
                                Webhook Url
                            </SimpleCell>
                            {/* {webhookHistoryOne.error !== '' ? <SimpleCell after={webhookHistoryOne.error} disabled>
                            Error
                        </SimpleCell> : null } */}
                            <SimpleCell
                                after={webhookHistoryOne.payment_id}
                                disabled
                            >
                                Payment ID
                            </SimpleCell>

                            <CardGrid size="l">
                                <Card style={{ overflowY: 'scroll' }}>
                                    <Div
                                        style={{
                                            maxHeight: '300px',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <pre>
                                            {webhookHistoryOne.response_body}
                                        </pre>
                                    </Div>
                                </Card>
                            </CardGrid>
                        </div>
                    ) : (
                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            Error load webhook info
                        </div>
                    )}
                </Div>
            </ModalPage>
            <LogoutModal
                id="logout"
                onClose={() => setActiveModal(null)}
                logOut={logOut}
            />
        </ModalRoot>
    );

    return (
        <AppRoot>
            <SplitLayout
                className="polus"
                style={{ justifyContent: 'center' }}
                modal={modalRoot}
                popout={popout}
                // header={isDesktop
                //     && <PanelHeader separator={false} className="delab-header" />
                // }
                header={<HeaderBlock />}
            >
                {loginPage && auth !== 2 ? (
                    <LoginPage
                        id="login"
                        isDesktop={isDesktop}
                        setLoginPage={setLoginPage}
                        setAuth={setAuth}
                        loginUser={loginUser}
                        checkCode={checkCode}
                    />
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <SplitCol
                            animate={false}
                            spaced={isDesktop}
                            width={isDesktop ? '900px' : '100%'}
                            maxWidth={isDesktop ? '900px' : '100%'}
                        >
                            <Epic
                                activeStory={'main'}
                                tabbar={
                                    !isDesktop &&
                                    auth === 2 && (
                                        <Tabbar>
                                            <TabbarItem
                                                selected={
                                                    location.pathname ===
                                                    '/merchants'
                                                }
                                                text="Merchants"
                                                onClick={() =>
                                                    history('/merchants')
                                                }
                                            >
                                                <Icon28Users3Outline />
                                            </TabbarItem>

                                            <TabbarItem
                                                selected={
                                                    location.pathname ===
                                                    '/settings'
                                                }
                                                text="Settings"
                                                onClick={() =>
                                                    history('/settings')
                                                }
                                            >
                                                <Icon28SettingsOutline />
                                            </TabbarItem>

                                            <TabbarItem
                                                text="Log out"
                                                onClick={() => logOut()}
                                            >
                                                <Icon28DoorArrowRightOutline />
                                            </TabbarItem>
                                        </Tabbar>
                                    )
                                }
                            >
                                <div id="main">
                                    <PanelHeader
                                        className="header-full2"
                                        before={
                                            <img
                                                src={logo}
                                                style={{
                                                    height: '42px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    history('/merchants')
                                                }
                                            />
                                        }
                                    />
                                    <Routes>
                                        <Route
                                            path="/merchants"
                                            element={
                                                <View
                                                    activePanel={'main1'}
                                                    className="animate__animated animate__fadeIn"
                                                    id="view"
                                                >
                                                    <Main
                                                        id="main1"
                                                        setActiveModal={
                                                            setActiveModal
                                                        }
                                                        consoleLog={consoleLog}
                                                        logOut={logOut}
                                                        setSelectMerchantId={
                                                            setSelectMerchantId
                                                        }
                                                        isDesktop={isDesktop}
                                                        newApi={newApi}
                                                        onErrorApi={onErrorApi}
                                                    />
                                                </View>
                                            }
                                        />

                                        <Route
                                            path="/merchant/:idMerchant"
                                            element={
                                                <View
                                                    className="animate__animated animate__fadeInUp animate__faster"
                                                    activePanel={'merchant1'}
                                                    id="view"
                                                >
                                                    <Merchant
                                                        id="merchant1"
                                                        setActiveModal={
                                                            setActiveModal
                                                        }
                                                        consoleLog={consoleLog}
                                                        setSelectMerhant={
                                                            setSelectMerhant
                                                        }
                                                        logOut={logOut}
                                                        setSelectMerchantId={
                                                            setSelectMerchantId
                                                        }
                                                        isDesktop={isDesktop}
                                                        getWebhookHistory={
                                                            getWebhookHistory
                                                        }
                                                        newApi={newApi}
                                                        onErrorApi={onErrorApi}
                                                    />
                                                </View>
                                            }
                                        />

                                        <Route
                                            path="/settings"
                                            element={
                                                <View
                                                    activePanel={'settings1'}
                                                    id="view"
                                                >
                                                    <Settings
                                                        id="settings1"
                                                        setActiveModal={
                                                            setActiveModal
                                                        }
                                                    />
                                                </View>
                                            }
                                        />

                                        <Route
                                            path="/invoices"
                                            element={
                                                <View
                                                    activePanel={'invoices1'}
                                                    id="view"
                                                >
                                                    <Invoices
                                                        id="invoices1"
                                                        setActiveModal={
                                                            setActiveModal
                                                        }
                                                    />
                                                </View>
                                            }
                                        />

                                        <Route path="/500"></Route>
                                    </Routes>
                                </div>
                            </Epic>
                        </SplitCol>

                        {isDesktop ? (
                            <SplitCol
                                fixed
                                animate={false}
                                // style={{ paddingTop: '20px' }}
                                spaced={isDesktop}
                                width={isDesktop ? '350px' : '100%'}
                                maxWidth={isDesktop ? '350px' : '100%'}
                            >
                                <PanelHeader />

                                {/* <Div>
                                <img src={logo} style={{ marginBottom: '12px', height: '42px' }} />
                            </Div> */}

                                <Group>
                                    <CardGrid size="l">
                                        <Card>
                                            <SimpleCell
                                                onClick={() =>
                                                    setActiveModal('logout')
                                                }
                                                after={
                                                    <Icon28DoorArrowRightOutline />
                                                }
                                            >
                                                {me?.email}
                                            </SimpleCell>
                                        </Card>
                                    </CardGrid>

                                    <Div className="wallet1">
                                        <div
                                            className={
                                                walletOpen ? '' : 'closed'
                                            }
                                            onClick={() =>
                                                setWalletOpen(!walletOpen)
                                            }
                                        >
                                            <span>Polus Wallet</span>
                                            {!walletOpen ? (
                                                <Icon28ChevronDownOutline />
                                            ) : (
                                                <Icon28ChevronUpOutline />
                                            )}
                                        </div>
                                        <iframe
                                            src={
                                                import.meta.env
                                                    .VITE_REACT_APP_IFRAME_URL
                                            }
                                            width="100%"
                                            style={
                                                walletOpen
                                                    ? {}
                                                    : { display: 'none' }
                                            }
                                            height={'500px'}
                                        />
                                    </Div>
                                    <Div>
                                        {/* <Separator style={{ margin: '0 12px' }} /> */}

                                        <Link to="/merchants">
                                            <SimpleCell
                                                className={
                                                    location.pathname ===
                                                    '/merchants'
                                                        ? 'active-menu'
                                                        : ''
                                                }
                                            >
                                                Merchants
                                            </SimpleCell>
                                        </Link>
                                        <Link to="/settings">
                                            <SimpleCell
                                                className={
                                                    location.pathname ===
                                                    '/settings'
                                                        ? 'active-menu'
                                                        : ''
                                                }
                                            >
                                                Settings
                                            </SimpleCell>
                                        </Link>
                                    </Div>
                                </Group>
                            </SplitCol>
                        ) : null}
                    </div>
                )}
                {/* <BackButton /> */}
                {snackbar}
            </SplitLayout>
        </AppRoot>
    );
};
