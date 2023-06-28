import { useWeb3Modal } from '@web3modal/react';
import { walletAuthThunk } from 'apps/merchant-client/src/store/api/endpoints/auth/walletAuthThunk';
import {
    useAppDispatch,
    useAppSelector,
} from 'apps/merchant-client/src/store/hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const useWalletAuth = () => {
    const dispatch = useAppDispatch();
    const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);
    const navigate = useNavigate();

    const { address } = useAccount();

    const { open } = useWeb3Modal();

    const connectWallet = useCallback(async () => {
        try {
            await open();
            if (!address) return;
            await dispatch(walletAuthThunk(address)).unwrap();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }, [address, open, dispatch]);

    return { connectWallet, isAuthLoading };
};
