export default [
    {
        inputs: [
            {
                internalType: 'address[]',
                name: 'allowedInputs_',
                type: 'address[]',
            },
            {
                internalType: 'address',
                name: 'feesRecipient_',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'feePercentage_',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'tokenOut',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bytes16',
                name: 'uniqid',
                type: 'bytes16',
            },
        ],
        name: 'Action',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'input',
                type: 'address',
            },
        ],
        name: 'allowedInputs',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'calculateFee',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'input',
                type: 'address',
            },
        ],
        name: 'disableAllowedInput',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'input',
                type: 'address',
            },
        ],
        name: 'enableAllowedInput',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'feePercentage',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'router',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'bytes16',
                name: 'uniqid',
                type: 'bytes16',
            },
        ],
        name: 'swapEqualInOutToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'tokenOut',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
            },
            {
                internalType: 'bytes16',
                name: 'uniqid',
                type: 'bytes16',
            },
            {
                internalType: 'uint24',
                name: 'poolFee',
                type: 'uint24',
            },
        ],
        name: 'swapExactInputSingleHop',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'feesRecipient_',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'feePercentage_',
                type: 'uint256',
            },
        ],
        name: 'updateFeeConfiguration',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;
