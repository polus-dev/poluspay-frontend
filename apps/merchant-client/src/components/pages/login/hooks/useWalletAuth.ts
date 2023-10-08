import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { useWeb3Modal } from '@web3modal/react';
import { notify } from '@poluspay-frontend/ui';
import { walletAuthThunk } from '../../../../../src/store/api/endpoints/auth/walletAuthThunk';
import { useAppDispatch, useAppSelector } from '../../../../../src/store/hooks';

export const useWalletAuth = () => {
    const dispatch = useAppDispatch();
    const isAuthLoading = useAppSelector((state) => state.auth.loading);
    const success = useAppSelector((state) => state.auth.success);
    const [buttonText, setButtonText] = useState('Connect Wallet');
    const navigate = useNavigate();

    const { address, isConnected, isConnecting } = useAccount();
    const { open, isOpen } = useWeb3Modal();

    useEffect(() => {
        if (success) navigate('/');
    }, [success]);

    useEffect(() => {
        if (isOpen) {
            setButtonText('Connecting...');
        } else if (isConnected) {
            setButtonText('Sign auth message');
        } else {
            setButtonText('Connect Wallet');
        }
    }, [isOpen, isConnecting]);

    const connectWallet = useCallback(async () => {
        try {
            if (!address) {
                open();

                return undefined;
            }
            setButtonText('Signing...');

            await dispatch(walletAuthThunk(address)).unwrap();

            navigate('/');
        } catch (error) {
            if (address) {
                setButtonText('Sign auth message');
            } else {
                setButtonText('Connect Wallet');
            }

            notify({
                title: 'Email auth error',
                status: 'error',
                description: (error as any).message,
            });
        }
    }, [address, open, dispatch]);

    return { connectWallet, isAuthLoading, buttonText };
};
