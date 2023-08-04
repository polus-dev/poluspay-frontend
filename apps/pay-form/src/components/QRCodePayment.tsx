import {
  Card,
  CardGrid,
  Div,
  FormItem,
  IconButton,
  Input,
} from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { QRCode } from 'react-qr-svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon16CopyOutline } from '@vkontakte/icons';
import { useGetAssetsQuery } from '../store/api/endpoints/asset/Asset';
import { Blockchain_t } from '../store/api/endpoints/types';
import { useAppSelector } from '../store/hooks';
import { Payment } from '../store/api/endpoints/payment/Payment.interface';
import {getAssetUrl} from "../../../../tools";

interface AllType {
  id: string;
  log: Function;
  payment: Payment;
}

const getPaymentAssetInfo = (payment: Payment, blockchain: Blockchain_t) => {
  const assetName = payment.assets[0].name;
  const paymentInfo = payment.assets.find(e => e.network === blockchain)
  if (!paymentInfo) {
    throw new Error('Payment info is not defined');
  }
  return { assetName, paymentInfo };
};

interface PaymentState {
  amount: string | number;
  assetName: string;
  address: string;
}

export const QRCodePayment = (props: AllType) => {
  const { data: availableAssets, isLoading } = useGetAssetsQuery();
  const currentBlockchain = useAppSelector(
    (state) => state.connection.currentBlockchain
  );
  const [paymentInfoState, setPaymentInfoState] = useState<PaymentState>({
    address: '',
    amount: '-',
    assetName: 'usdt',
  });

  useEffect(() => {
    if (!currentBlockchain) {
      throw new Error('currentBlockchain is not defined');
    }

    if (availableAssets) {
      const {
        assetName,
        paymentInfo: { amount_decimals: amount , address },
      } = getPaymentAssetInfo(props.payment, currentBlockchain);

      setPaymentInfoState({ address, amount, assetName });
    }
  }, [availableAssets]);

  if (isLoading)
    return (
      <div style={{ margin: '1rem' }}>
        <CardGrid size="l">
          <Card>
            <Div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{ width: '100%', textAlign: 'center' }}
              >
                Loading...
              </span>
            </Div>
          </Card>
        </CardGrid>
      </div>
    );

  return (
    <div>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '16px',
          marginTop: '12px',
        }}
      >
        Send ${paymentInfoState.assetName.toUpperCase()}{' '}
        <img
          style={{ height: '25px' }}
          src={getAssetUrl(import.meta.env.VITE_ASSET_URL, paymentInfoState.assetName)}
        />
      </h2>
      <div
        style={{
          margin: '0 auto',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{
            width: 170,
            padding: '10px',
            borderRadius: '16px',
            background: '#fff',
          }}
          value={`${currentBlockchain}:${paymentInfoState.address}?value=${paymentInfoState.amount}`}
        />

        <div>
          <FormItem top="Amount">
            <Input
              value={paymentInfoState.amount}
              onChange={() => null}
              style={{
                marginBottom: '10px',
                marginTop: '10px',
                userSelect: 'all',
              }}
              after={
                <CopyToClipboard
                  text={paymentInfoState.amount.toString()}
                  onCopy={() => props.log('Copyed', true)}
                >
                  <IconButton
                    hoverMode="opacity"
                    aria-label="Copy"
                  >
                    <Icon16CopyOutline />
                  </IconButton>
                </CopyToClipboard>
              }
            />
          </FormItem>

          <FormItem top="Address">
            <Input
              value={paymentInfoState.address}
              onChange={() => null}
              style={{ marginBottom: '10px', userSelect: 'all' }}
              after={
                <CopyToClipboard
                  text={paymentInfoState.address}
                  onCopy={() => props.log('Copied', true)}
                >
                  <IconButton
                    hoverMode="opacity"
                    aria-label="Copy"
                  >
                    <Icon16CopyOutline />
                  </IconButton>
                </CopyToClipboard>
              }
            />
          </FormItem>
        </div>
      </div>
      <CardGrid size="l">
        <Card>
          <Div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // flexDirection: 'column'
            }}
          >
            <span style={{ width: '100%' }}>
              {`Check the amount you send in ${paymentInfoState.assetName.toUpperCase()} ${currentBlockchain?.toUpperCase()}, in case it will be
                different from ${paymentInfoState.amount}, funds may be lost`}
            </span>
          </Div>
        </Card>
      </CardGrid>
      <br />
    </div>
  );
};
