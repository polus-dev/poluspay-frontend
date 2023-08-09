import { FormCurrencyItem } from './CurrencyItem/CurrencyItem';

import './Currencies.scoped.scss';
import {AssetRepresentation} from "@poluspay-frontend/api";
import {getAssetUrl} from "../../../../../../../../tools";

interface FormCurrencyItemProps {
  active: boolean
  onClick: () => void
  name: string;
  image: string;
}

const Currency = (props: FormCurrencyItemProps) => {
  return (
    <div
      className="currencies__item"
      onClick={props.onClick}
    >
      <FormCurrencyItem name={props.name.toUpperCase()} image={props.image} active={props.active} />
    </div>
  )
}


interface FormCurrenciesProps {
  availableTokens: AssetRepresentation[]
  setUserToken: (token: AssetRepresentation) => void
  userToken: AssetRepresentation
  openModal: () => void
}
export const FormCurrencies= (props: FormCurrenciesProps) => {
    return (
        <div className="currencies">
          <Currency name={props.availableTokens[0].name} image={getAssetUrl(import.meta.env.VITE_ASSET_URL,props.availableTokens[0].name)} active={props.userToken === props.availableTokens[0]} onClick={() => props.setUserToken(props.availableTokens[0])}/>
          {props.availableTokens.slice(1, 5).map((token) => (
            <Currency name={token.name} image={getAssetUrl(import.meta.env.VITE_ASSET_URL, token.name)} key={token.contract} active={props.userToken === token} onClick={() => props.setUserToken(token)}/>
          )
          )}
          {props.availableTokens.length > 5 && (
            // <div className="currencies__item">
            //   <div className="currency currency--more">
            //     <div className="currency__inner">
            //       <p  className="currency__inner-text">More</p>
            //     </div>
            //   </div>
            // </div>

            <Currency name={"More"} image={""} active={false} onClick={props.openModal}/>
          )
          }
        </div>
    );
};
