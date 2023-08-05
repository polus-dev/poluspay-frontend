import { FormSelect } from '../../components/pages/form/Select/Select';
import { FormCurrencies } from '../../components/pages/form/Currencies/Currencies';
import { FormTimer } from '../../components/pages/form/Timer/Timer';

export const SelectSubPage = () => {
    return (
        <>
            <div className="form__select">
                <FormSelect
                    item={{ image: '', text: '' }}
                    onClick={() => console.log('open modal')}
                />
            </div>
            <div className="form__currencies">
                <FormCurrencies />
            </div>
            <div className="form__timer">
                {/*<FormTimer expiresAt={info.payment.expires_at} />*/}
            </div>
        </>
    );
};
