import { Icon28ChevronLeft } from '@vkontakte/icons/old';
import {
    Button,
    Div,
    Group,
    Panel,
    Link as LinkVk,
    FormItem,
    Input,
    IconButton,
    FormLayoutGroup,
    Textarea,
    Spinner,
    SubnavigationBar,
    SubnavigationButton,
    Counter,
} from '@vkontakte/vkui/old';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

import { VldBuilder, vlds } from 'validatorus-react';

import {
    GenKeyApiResp,
    MerchantApiResp,
    NewApi,
    OtherApiResp,
} from '../../logic/api';
import {
    useGetMerchantByIdQuery,
    useUpdateMerchantFieldsMutation,
} from '../../store/api/endpoints/merchant/Merchant';
import { useGetPaymentByMerchantIdQuery } from '../../store/api/endpoints/payment/Payment';
import { useGetAssetsQuery } from '../../store/api/endpoints/asset/Asset';
import {
    Asset_t,
    Blockchain_t,
} from '../../store/api/endpoints/payment/Payment.interface';
import { roundCryptoAmount } from '../../utils/roundCryptoAmount';
import { getExplorer } from '../../utils/getExplorer';

interface MainProps {
    id: string;
    setActiveModal: Function;
    consoleLog: Function;
    setSelectMerhant: Function;
    logOut: Function;
    setSelectMerchantId: Function;
    isDesktop: boolean;
    getWebhookHistory: Function;
    newApi: NewApi;
    onErrorApi: Function;
}

function truncAddress(address: any): string {
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export const Merchant: React.FC<MainProps> = (props: MainProps) => {
    const [firstRender, setFirstRender] = React.useState<boolean>(false);

    const [typePage, setTypePage] = React.useState<number>(0);
    const [apiKey, setApiKey] = React.useState<string>(
        '*******************************************'
    );

    const history = useNavigate();

    const { idMerchant } = useParams();

    /// NEW CODE START
    const limit = 10;
    const { data: assetsInfo } = useGetAssetsQuery();
    const [updateMerchantFields] = useUpdateMerchantFieldsMutation();

    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const { data: payments, isFetching: paymentsIsFetching } =
        useGetPaymentByMerchantIdQuery({
            merchant_id: idMerchant!,
            limit,
            offset,
        });

    const { data: merchant } = useGetMerchantByIdQuery({
        merchant_id: idMerchant!,
    });

    useEffect(() => {
        if (merchant) {
            setTypePage(merchant.is_domain_confirmed ? 1 : 0);
            props.setSelectMerhant(merchant);
            changeFormData(merchant);
        }
    }, [idMerchant, merchant]);

    /// NEW CODE END

    const input = new VldBuilder()
        .with(vlds.VLen, 4, 128)
        .withFname('Merchant name');

    const inputEvmAddress = new VldBuilder()
        .with(vlds.VHex)
        .with(vlds.VLen, 42, 42)
        .withFname('Withdrawal address');

    const inputTronAddress = new VldBuilder()
        .with(vlds.VLen, 34, 34)
        .withFname('Withdrawal address Tron');

    const inputBitcoinAddress = new VldBuilder()
        .with(vlds.VLen, 26, 35)
        .withFname('Withdrawal address Bitcoin');
    const inputLink = new VldBuilder()
        .with(vlds.VDomain)
        .withFname('Website link');

    const inputUrl1 = new VldBuilder()
        .with(vlds.VDomain)
        .withFname('URL notifications');

    const inputUrl2 = new VldBuilder()
        .with(vlds.VDomain)
        .withFname('URL redirect');

    const inputDesc = new VldBuilder()
        .with(vlds.VLen, 2, 256)
        .withFname('Description');

    const inputApi = new VldBuilder()
        .with(vlds.VLen, 10, 256)
        .withFname('API key');

    const successUrl = new VldBuilder()
        .with(vlds.VDomain)
        .withFname('Success url');

    const failUrl = new VldBuilder().with(vlds.VDomain).withFname('Fail url');

    function changeFormData(result: Omit<MerchantApiResp, 'code'>) {
        input.change(result.name);
        inputLink.change(result.domain);
        inputEvmAddress.change(result.evm_withdraw_address ?? '');
        inputTronAddress.change(result.tron_withdraw_address ?? '');
        inputDesc.change(result.description);
        // inputUrl1.change(result.webhook_url)
        // inputUrl2.change(result.redirect_url)
        // inputApi.change(result.api_key)
        //
        successUrl.change(result.success_redirect_url ?? '');
        failUrl.change(result.fail_redirect_url ?? '');

        inputUrl1.change(result.webhook_url ?? '');

        input.reset();
        inputLink.reset();
        inputEvmAddress.reset();
        // inputBitcoinAddress.reset()
        inputTronAddress.reset();
        inputDesc.reset();
        inputUrl1.reset();
        inputUrl2.reset();
        inputApi.reset();
        successUrl.reset();
        failUrl.reset();
    }

    async function checkDns() {
        const resp = await props.newApi.verifyDomain(idMerchant ?? '');

        if (!props.onErrorApi(resp)) return false;

        console.log(resp);

        const respType = resp as OtherApiResp;

        if (respType.code === 200) {
            setTypePage(1);
        }
        return true;
    }

    async function setWebHook() {
        const resp = await props.newApi.setWebhook(
            idMerchant ?? '',
            inputUrl1.value
        );

        if (!props.onErrorApi(resp)) return false;

        console.log(resp);

        props.consoleLog('Successfully merchant info save', true);

        props.consoleLog('Successfully set webhook', true);

        return true;
    }

    async function generatedAPIKey() {
        const resp = await props.newApi.genKey(idMerchant ?? '');

        if (!props.onErrorApi(resp)) return false;

        console.log(resp);

        const respType = resp as GenKeyApiResp;
        setApiKey(respType.signing_key);
        // changeFormData(resp.result)

        props.consoleLog('Successfully update API key', true);
        return true;
    }

    useEffect(() => {
        if (props.newApi.au && idMerchant && !firstRender) {
            setFirstRender(true);

            props.getWebhookHistory(idMerchant);
        }
    }, [props.newApi]);

    return (
        <Panel id={props.id}>
            <Div
                style={{ paddingTop: 0, boxSizing: 'border-box' }}
                className="mobile-header"
            >
                <div className="admin-header-block2">
                    <IconButton onClick={() => history('/merchants')}>
                        <Icon28ChevronLeft />
                    </IconButton>
                    <h5 className="polus-h5" style={{ marginLeft: '16px' }}>
                        Merchant
                    </h5>
                </div>
            </Div>
            {merchant ? (
                <div>
                    <Group>
                        <Div style={{ paddingTop: 0 }}>
                            <Div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                                className="div-header"
                            >
                                <h6 className="polus-h6">
                                    Merchant {merchant.name}
                                    <span style={{ userSelect: 'all' }}>
                                        {' '}
                                        {merchant.id}
                                    </span>
                                </h6>
                                {/* {typePage === 0 ? <span style={merchant.dns_confirmed ? {} : { color: '#FED85A' }}>
                                {merchant.dns_confirmed ? 'DNS confirm' : 'Unverified DNS'}
                            </span> : null } */}
                                {typePage === 1 ? (
                                    <Button
                                        size="l"
                                        onClick={() => {
                                            props.setSelectMerhant(merchant);
                                            props.setSelectMerchantId(merchant);
                                            props.setActiveModal(
                                                'create_invoice'
                                            );
                                        }}
                                        stretched={!props.isDesktop}
                                    >
                                        Create invoice
                                    </Button>
                                ) : (
                                    <Button
                                        target="_blank"
                                        size="l"
                                        href="https://www.youtube.com/watch?v=fINaN8Up_gA"
                                        mode="outline"
                                        className="outline-btn"
                                        stretched={!props.isDesktop}
                                    >
                                        Video guide
                                    </Button>
                                )}
                            </Div>

                            {typePage === 0 ? (
                                <div>
                                    <Div>
                                        <div>
                                            1. Add TXT Record code to DNS{' '}
                                            {merchant?.domain.replace(
                                                'https://',
                                                ''
                                            ) ?? merchant?.domain}
                                            :
                                        </div>
                                    </Div>
                                    <FormItem
                                        top="DNS TXT Record code"
                                        style={{ width: '50%' }}
                                    >
                                        <Input
                                            value={
                                                merchant?.domain_confirmation_code
                                            }
                                        />
                                    </FormItem>
                                    <Div>
                                        <div style={{ marginBottom: '16px' }}>
                                            2. Wait for DNS update.
                                        </div>
                                        <div style={{ marginBottom: '32px' }}>
                                            3. Click the button Confirm.
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                            className="div-header"
                                        >
                                            <Button
                                                size="l"
                                                onClick={() => checkDns()}
                                                stretched={!props.isDesktop}
                                            >
                                                Check DNS record
                                            </Button>
                                            <LinkVk
                                                style={{
                                                    color: 'var(--polus_red)',
                                                    marginTop: '16px',
                                                }}
                                                onClick={() =>
                                                    props.setActiveModal(
                                                        'delete_merchant'
                                                    )
                                                }
                                            >
                                                Delete merchant
                                            </LinkVk>
                                        </div>
                                    </Div>
                                </div>
                            ) : null}

                            {typePage === 1 ? (
                                <div>
                                    <FormLayoutGroup
                                        mode={
                                            props.isDesktop
                                                ? 'horizontal'
                                                : 'vertical'
                                        }
                                    >
                                        <FormItem
                                            top="Merchant name"
                                            bottom={input.error}
                                        >
                                            <Input
                                                type="text"
                                                placeholder={merchant?.name}
                                                value={input.value}
                                                onChange={(e) => {
                                                    input.change(
                                                        e.target.value
                                                    );
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
                                                placeholder={merchant?.domain}
                                                value={inputLink.value}
                                                // disabled
                                                onChange={undefined}
                                                status={inputLink.iserr}
                                            />
                                        </FormItem>
                                    </FormLayoutGroup>
                                    <FormItem
                                        top="withdrawal address Ethereum, BNB Chain, Polygon"
                                        bottom={inputEvmAddress.error}
                                    >
                                        <Input
                                            type="text"
                                            placeholder={
                                                merchant?.evm_withdraw_address ??
                                                ''
                                            }
                                            value={inputEvmAddress.value}
                                            onChange={(e) => {
                                                inputEvmAddress.change(
                                                    e.target.value
                                                );
                                            }}
                                            status={inputEvmAddress.iserr}
                                        />
                                    </FormItem>
                                    <FormItem
                                        top="Withdrawal address Tron"
                                        bottom={inputTronAddress.error}
                                    >
                                        <Input
                                            type="text"
                                            placeholder={
                                                merchant?.tron_withdraw_address ??
                                                ''
                                            }
                                            value={inputTronAddress.value}
                                            onChange={(e) => {
                                                inputTronAddress.change(
                                                    e.target.value
                                                );
                                            }}
                                            status={inputTronAddress.iserr}
                                        />
                                    </FormItem>
                                    {/*<FormItem*/}
                                    {/*    top="Withdrawal address Bitcoin"*/}
                                    {/*    bottom={inputBitcoinAddress.error}*/}
                                    {/*>*/}
                                    {/*  <Input*/}
                                    {/*      type="text"*/}
                                    {/*      placeholder={merchant?.tron_withdraw_address ?? ''}*/}
                                    {/*      value={inputTronAddress.value}*/}
                                    {/*      onChange={(e) => {*/}
                                    {/*        inputTronAddress.change(e.target.value);*/}
                                    {/*      }}*/}
                                    {/*      status={inputTronAddress.iserr}*/}
                                    {/*  />*/}
                                    {/*</FormItem>*/}
                                    <FormLayoutGroup>
                                        <FormItem
                                            top="Description"
                                            bottom={inputDesc.error}
                                        >
                                            <Textarea
                                                placeholder="Few words about merchant..."
                                                value={inputDesc.value}
                                                onChange={(e) => {
                                                    inputDesc.change(
                                                        e.target.value
                                                    );
                                                }}
                                                status={inputDesc.iserr}
                                            ></Textarea>
                                        </FormItem>
                                    </FormLayoutGroup>

                                    <FormItem
                                        top="Success url"
                                        bottom={successUrl.error}
                                    >
                                        <Input
                                            type="text"
                                            placeholder={
                                                merchant?.success_redirect_url ??
                                                ''
                                            }
                                            value={successUrl.value}
                                            onChange={(e) => {
                                                successUrl.change(
                                                    e.target.value
                                                );
                                            }}
                                            status={successUrl.iserr}
                                        />
                                    </FormItem>

                                    <FormItem
                                        top="Fail url"
                                        bottom={failUrl.error}
                                    >
                                        <Input
                                            type="text"
                                            placeholder={
                                                merchant?.fail_redirect_url ??
                                                ''
                                            }
                                            value={failUrl.value}
                                            onChange={(e) => {
                                                failUrl.change(e.target.value);
                                            }}
                                            status={failUrl.iserr}
                                        />
                                    </FormItem>

                                    <Div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <LinkVk
                                            style={{
                                                color: 'var(--polus_red)',
                                            }}
                                            onClick={() =>
                                                props.setActiveModal(
                                                    'delete_merchant'
                                                )
                                            }
                                        >
                                            Delete merchant
                                        </LinkVk>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'end',
                                            }}
                                        >
                                            {props.isDesktop ? (
                                                <Button
                                                    size="l"
                                                    mode="outline"
                                                    style={{
                                                        marginRight: '16px',
                                                    }}
                                                    onClick={() =>
                                                        history('/merchants')
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            ) : null}
                                            <Button
                                                size="l"
                                                onClick={() =>
                                                    updateMerchantFields({
                                                        name: input.value,
                                                        description:
                                                            inputDesc.value,
                                                        evm_withdraw_address:
                                                            inputEvmAddress.value,
                                                        tron_withdraw_address:
                                                            inputTronAddress.value,
                                                        success_redirect_url:
                                                            successUrl.value,
                                                        fail_redirect_url:
                                                            failUrl.value,
                                                        merchant_id:
                                                            merchant?.id,
                                                    })
                                                        .then(() => {
                                                            props.consoleLog(
                                                                'Successfully merchant info save',
                                                                true
                                                            );
                                                        })
                                                        .catch(() => {
                                                            props.consoleLog(
                                                                'wrong input data',
                                                                false
                                                            );
                                                        })
                                                }
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </Div>
                                </div>
                            ) : null}
                        </Div>
                    </Group>
                    {typePage === 1 ? (
                        <Div style={{ paddingTop: 0 }}>
                            <div className="admin-header-block">
                                <h5 className="polus-h5">API options</h5>
                            </div>
                        </Div>
                    ) : null}
                    {typePage === 1 ? (
                        <Group>
                            <Div>
                                <Div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                    className="div-header"
                                >
                                    <h6 className="polus-h6">WebHook</h6>
                                    <Button
                                        size="l"
                                        mode="outline"
                                        stretched={!props.isDesktop}
                                        onClick={() => {
                                            props.setSelectMerchantId(
                                                merchant?.id
                                            );
                                            props.getWebhookHistory(
                                                merchant?.id
                                            );
                                            props.setActiveModal(
                                                'webhook_history'
                                            );
                                        }}
                                    >
                                        WebHook history
                                    </Button>
                                </Div>

                                <FormLayoutGroup
                                    mode="horizontal"
                                    style={{ alignItems: 'center' }}
                                >
                                    <FormItem
                                        top={'URL WebHook'}
                                        bottom={inputUrl1.error}
                                        style={{ marginRight: '16px' }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder={`https://${merchant?.domain}/webhook`}
                                            value={inputUrl1.value}
                                            onChange={(e) => {
                                                inputUrl1.change(
                                                    e.target.value
                                                );
                                            }}
                                            status={inputUrl1.iserr}
                                        />
                                    </FormItem>
                                    <Button
                                        onClick={() => setWebHook()}
                                        size="m"
                                    >
                                        Save
                                    </Button>
                                </FormLayoutGroup>

                                <FormLayoutGroup
                                    mode="horizontal"
                                    style={{ alignItems: 'center' }}
                                >
                                    <FormItem
                                        top={`API key${
                                            apiKey !==
                                            '*******************************************'
                                                ? ' - Save the key, then it can only be regenerated'
                                                : ''
                                        }`}
                                        style={{ marginRight: '16px' }}
                                    >
                                        <Input type="text" value={apiKey} />
                                    </FormItem>

                                    <Button
                                        onClick={() => generatedAPIKey()}
                                        size="m"
                                    >
                                        Update
                                    </Button>
                                </FormLayoutGroup>
                            </Div>
                        </Group>
                    ) : null}
                    {typePage === 1 ? (
                        <Div style={{ paddingTop: 0 }}>
                            <div className="admin-header-block">
                                <h5 className="polus-h5">Invoices</h5>
                            </div>
                        </Div>
                    ) : null}
                    {typePage === 1 ? (
                        <Group>
                            <Div className="mobile-table-2">
                                {payments && payments.data.length > 0 ? (
                                    <table className="polus-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Amount</th>
                                                <th>Currency</th>
                                                <th>Hash</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.data.map(
                                                (invoice, key) => {
                                                    let asset;
                                                    let assetAmount;
                                                    // TODO: REFACTOR
                                                    if (
                                                        Object.keys(
                                                            invoice.assets
                                                        ).length
                                                    ) {
                                                        const assets =
                                                            invoice.assets;
                                                        const blockchain =
                                                            Object.keys(
                                                                assets
                                                            )[0] as Blockchain_t;
                                                        asset = Object.keys(
                                                            assets[blockchain]
                                                        )[0] as Asset_t;
                                                        assetAmount =
                                                            assets[blockchain][
                                                                asset
                                                            ].amount *
                                                            10 **
                                                                -assetsInfo[
                                                                    asset
                                                                ][blockchain]
                                                                    .decimals;
                                                        assetAmount =
                                                            roundCryptoAmount(
                                                                assetAmount.toString()
                                                            );
                                                    } else {
                                                        asset = assetAmount =
                                                            "asset didn't set";
                                                    }
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                <LinkVk
                                                                    href={`${
                                                                        import.meta
                                                                            .env
                                                                            .VITE_REACT_APP_PAYFORM_URL
                                                                    }?uuid=${
                                                                        invoice.id
                                                                    }`}
                                                                    target="_blank"
                                                                >
                                                                    {truncAddress(
                                                                        invoice.id
                                                                    )}
                                                                </LinkVk>
                                                            </td>
                                                            <td>
                                                                {assetAmount}
                                                            </td>
                                                            <td>{asset}</td>
                                                            <td>
                                                                {invoice.transaction ? (
                                                                    <LinkVk
                                                                        href={getExplorer(
                                                                            invoice
                                                                                .transaction
                                                                                .network
                                                                        )}
                                                                        target="_blank"
                                                                    >
                                                                        {truncAddress(
                                                                            invoice
                                                                                .transaction
                                                                                .hash
                                                                        )}
                                                                    </LinkVk>
                                                                ) : (
                                                                    '-'
                                                                )}
                                                            </td>
                                                            <td>
                                                                {formatDate(
                                                                    new Date(
                                                                        invoice.created_at
                                                                    )
                                                                )}
                                                            </td>
                                                            <td>
                                                                <SubnavigationBar>
                                                                    <SubnavigationButton
                                                                        disabled
                                                                        className={
                                                                            invoice.status
                                                                        }
                                                                    >
                                                                        {
                                                                            invoice.status
                                                                        }
                                                                    </SubnavigationButton>
                                                                </SubnavigationBar>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div
                                        style={{
                                            marginTop: '16px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        You don't have any invoices yet
                                    </div>
                                )}

                                {payments &&
                                payments.data.length > 0 &&
                                payments.totalCount > limit ? (
                                    <div
                                        style={{
                                            margin: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-evenly',
                                        }}
                                    >
                                        <Button
                                            onClick={() => {
                                                setPage(page - 1);
                                                setOffset(offset - limit);
                                            }}
                                            size="l"
                                            mode="outline"
                                            disabled={page <= 1}
                                        >
                                            Load prev invoices
                                        </Button>

                                        <Counter>{page}</Counter>

                                        <Button
                                            onClick={() => {
                                                setOffset(offset + limit);
                                                setPage(page + 1);
                                            }}
                                            disabled={
                                                paymentsIsFetching ||
                                                offset + limit >=
                                                    payments.totalCount
                                            }
                                            size="l"
                                            mode="outline"
                                        >
                                            {paymentsIsFetching ? (
                                                <Spinner size="medium" />
                                            ) : (
                                                'Load next invoices'
                                            )}
                                        </Button>
                                    </div>
                                ) : null}
                            </Div>
                        </Group>
                    ) : null}
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Spinner size="large" style={{ margin: '20px 0' }} />
                </div>
            )}
        </Panel>
    );
};
