
import styles from './app.module.scss';
import {PInput} from "@poluspay-frontend/ui";
import axios from "axios";
import {IPayment, IPaymentMerchant} from "@poluspay-frontend/api";
import {useEffect, useState} from "react";
import {isValidUUID} from "../../../../tools/isValidUUID";
import {getParameterByName} from "../../../../tools/getParameterByName";
import {getAssetUrl} from "../../../../tools";

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
  }, []);

  useEffect(() => {
    if (id && isValidUUID(id)) {
      setLoading(true);
      setData(undefined);
      setError(undefined);
      search(id).then((e) => {
        setData(e)
        window.history.pushState({}, '', '?id=' + id);
      }).catch(setError).finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className='center'>
      {/*TODO: make generic for PInput*/}
      {/*@ts-ignore*/}
      <PInput align='center' value={id} onInput={setId} />
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data &&
        <div className='key-value-table'>
          {data && 'logo' in data && <div> <img style={{width: '25%', height: '25%'}} src={data.logo} alt="logo" /> </div>}
          {data && 'assets' in data && <div className="key-value-row"> <img style={{width: '5%', height: '5%', marginRight: '5%'}} src={getAssetUrl(import.meta.env.VITE_ASSET_URL, data.assets[0].name)} alt="logo" />  <div className="value">  {data.assets.map(e => e.network).join(', ')}  </div> </div> }
          {
          Object.keys(data).filter(k => k !== 'assets') .map((k) => <div className='key-value-row' key={k}><div className="key">{k}</div><div className="value">{String(data[k as keyof typeof data])}</div></div>)
          }
      </div>
      }
    </div>);

}
