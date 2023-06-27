import { useWeb3Modal } from '@web3modal/react';
import { walletAuthThunk } from 'apps/merchant-client/src/store/api/endpoints/auth/walletAuthThunk';
import { useAppDispatch } from 'apps/merchant-client/src/store/hooks';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const useWalletAuth = () => {
    const [text, setText] = useState('Connect Wallet');

    const dispatch = useAppDispatch();

    const { address, isConnecting } = useAccount();

    const { open } = useWeb3Modal();

    useEffect(() => {
        if (isConnecting) setText('Connecting...');
    }, [isConnecting]);

    useEffect(() => {
        if (address) dispatch(walletAuthThunk(address));
    }, [address]);

    return { open, text };
};
