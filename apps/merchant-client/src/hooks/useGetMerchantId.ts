import { useParams } from 'react-router-dom';
export const useGetMerchantIdFromParams = () => {
    // merchantId always exists in the route
    const { id: merchantId } = useParams<{ id: string }>();
    return merchantId!;
};
