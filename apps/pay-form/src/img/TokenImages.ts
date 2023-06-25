import bnb from './bnb.svg';
import btc from './btc.svg';
import dai from './dai.svg';
import busd from './busd.svg';
import matic from './matic.svg';
import usdc from './usdc.svg';
import usdt from './usdt.svg';
import weth from './weth.svg';
import ltc from './litecoin.svg';
import doge from './Dogecoin.svg';
import aave from './aave.svg';
import ape from './ape.svg';
import bch from './bitcoin-cash.svg';
import bitdao from './bitdao.svg';
import btt from './bittorrent.svg';
import chz from './chiliZ.png';
import crv from './crv.svg';
import egld from './elrond.png';
import eos from './eos.svg';
import etc from './etc.svg';
import fil from './filecoin.svg';
import flow from './flow.svg';
import gala from './gala.svg';
import grt from './grt.svg';
import gusd from './gusd.svg';
import ht from './HuobiToken.svg';
import inj from './inj.svg';
import kava from './kava.svg';
import ldo from './ldo.svg';
import leo from './leo.svg';
import link from './link.svg';
import mana from './mana.svg';
import mkr from './mkr.svg';
import near from './near.svg';
import okb from './okb.svg';
import paxg from './paxg.svg';
import polkadot from './polkadot.svg';
import qnt from './qnt.svg';
import rndr from './rndr.png';
import rpl from './rpl.svg';
import sand from './sand.svg';
import tusd from './tusd.svg';
import uni from './uni.svg';
import usdd from './usdd.svg';
import shib from './shib.svg';
import zec from './zec.svg';
import snx from './snx.svg';
import { Asset_t } from '../store/api/endpoints/types';

export type TokenImagesType = {
  [key in Asset_t]: string;
};

export const TokenImages: Readonly<TokenImagesType> = {
  bnb,
  busd,
  dai,
  matic,
  usdc,
  usdt,
  btc,
  eth: weth,
  wbtc: btc,
  weth,
  wmatic: matic,
  ltc,
  doge,
  aave,
  ape,
  bch,
  bit: bitdao,
  btt,
  chz,
  crv,
  egld,
  eos,
  etc,
  fil,
  flow,
  gala,
  grt,
  gusd,
  ht,
  inj,
  kava,
  ldo,
  leo,
  link,
  mana,
  mkr,
  near,
  okb,
  paxg,
  polkadot,
  qnt,
  rndr,
  rpl,
  sand,
  tusd,
  uni,
  usdd,
  shib,
  zec,
  snx,
};
