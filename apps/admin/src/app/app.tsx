
import styles from './app.module.scss';
import {PInput} from "@poluspay-frontend/ui";
import axios from "axios";
import {IPayment, IPaymentMerchant} from "@poluspay-frontend/api";
import {useEffect, useState} from "react";
import {isValidUUID} from "../../../../tools/date/isValidUUID";
import {getParameterByName} from "../../../../tools/getParameterByName";

const getPaymentInfo = async (id: string) =>
   axios.post<IPayment>(import.meta.env.VITE_API_URL + 'public' + '/' + 'payment.take', {
    payment_id: id
  })


const getMerchantInfo = async (id: string) =>
   axios.post<IPaymentMerchant>(import.meta.env.VITE_API_URL + 'public' + '/' + 'merchant.take', {
    merchant_id: id});


const search = async (id: string): Promise<IPaymentMerchant | IPayment> => {
  const r = await Promise.allSettled([getPaymentInfo(id), getMerchantInfo(id)]);
  if (r[0].status === 'fulfilled')
    return r[0].value.data;
   else if (r[1].status === 'fulfilled')
    return r[1].value.data;
   else
   return Promise.reject('Not found');

}



export function App() {
  const [id, setId] = useState<string>();
  const [data, setData] = useState<IPaymentMerchant | IPayment>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const idFromUrl = getParameterByName('id');
    if (idFromUrl && isValidUUID(idFromUrl))
      setId(idFromUrl);

    if (id && isValidUUID(id)) {
      setLoading(true);
      setData(undefined);
      setError(undefined);
      search(id).then(setData).catch(setError).finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className='center'>
      {/*TODO: make generic for PInput*/}
      {/*@ts-ignore*/}
      <PInput align='center' value={id} onInput={setId} />
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && 'logo' in data && <img style={{width: '25%', height: '25%'}} src={data.logo} alt="logo" />}
      {data &&
        <div className='key-value-table'>{
          Object.keys(data).map((k) => <div className='key-value-row' key={k}><div className="key">{k}</div><div className="value">{String(data[k as keyof typeof data])}</div></div>)}
      </div>
      }
    </div>);

}
