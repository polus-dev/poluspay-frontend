export type * from './types';
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CODE_LENGTH = 6;

export const formatAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const httpsUrlRegex = /^https:\/\/.*/;
