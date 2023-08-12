import {useEffect, useRef} from 'react';
import {Token} from '../store/api/types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {tokenPairPriceThunk} from '../store/features/tokenPairPrice/tokenPairPriceThunk';
import {setSmartLineStatus, SmartLineStatus} from "../store/features/smartLine/smartLineSlice";

export const useTokenPairPrice = (
    userToken: Token | undefined,
    merchantToken: Token | undefined,
    amountOut: string
) => {
    const { assetName, amount, isLoading } = useAppSelector(
        (state) => state.tokenPairPrice
    );

  useEffect(() => {
    if (isLoading) {
        document.body.style.cursor = 'wait';

      dispatch(setSmartLineStatus(SmartLineStatus.LOADING))
    } else {
        document.body.style.cursor = 'default';
        dispatch(setSmartLineStatus(SmartLineStatus.DEFAULT))
    }
  }, [isLoading]);
    const dispatch = useAppDispatch();
    const abort = useRef(() => {});

    useEffect(() => {
        if (!userToken || !merchantToken || !amountOut) return;
        if (isLoading) abort.current();
        abort.current = dispatch(
            tokenPairPriceThunk({ amountOut, userToken, merchantToken })
        ).abort;
    }, [userToken, merchantToken, amountOut]);

    return { amount, isLoading, assetName };
};
