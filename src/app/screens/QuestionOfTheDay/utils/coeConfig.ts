import {ComponentType} from 'react';
import {SvgProps} from 'react-native-svg';

import {
  CoreBanking,
  InvestmentWealth,
  Lending,
  LightBulbIdea,
  Payment,
  Trading,
} from '../../../constant/icons';
import colors from '../../../constant/colors';

export type CoeVisualConfig = {
  Icon: ComponentType<SvgProps>;
  background: string;
  icon: string;
  accent: string;
};

// Keyed by the CoE name as returned by the API (lowercased, trimmed).
const COE_CONFIG: Record<string, CoeVisualConfig> = {
  trading: {
    Icon: Trading,
    background: colors.TRADING,
    icon: colors.TRADING_ICON,
    accent: colors.TRADING_ACCENT,
  },
  payment: {
    Icon: Payment,
    background: colors.PAYMENT,
    icon: colors.PAYMENT_ICON,
    accent: colors.PAYMENT_ACCENT,
  },
  'core banking': {
    Icon: CoreBanking,
    background: colors.CORE_BANKING,
    icon: colors.CORE_BANKING_ICON,
    accent: colors.CORE_BANKING_ACCENT,
  },
  'investment & wealth management': {
    Icon: InvestmentWealth,
    background: colors.INVESTMENT_WEALTH_MANAGEMENT,
    icon: colors.INVESTMENT_WEALTH_MANAGEMENT_ICON,
    accent: colors.INVESTMENT_WEALTH_MANAGEMENT_ACCENT,
  },
  'investment and wealth management': {
    Icon: InvestmentWealth,
    background: colors.INVESTMENT_WEALTH_MANAGEMENT,
    icon: colors.INVESTMENT_WEALTH_MANAGEMENT_ICON,
    accent: colors.INVESTMENT_WEALTH_MANAGEMENT_ACCENT,
  },
  lending: {
    Icon: Lending,
    background: colors.LENDING,
    icon: colors.LENDING_ICON,
    accent: colors.LENDING_ACCENT,
  },
};

const DEFAULT_COE_CONFIG: CoeVisualConfig = {
  Icon: LightBulbIdea,
  background: colors.TERTIARY_LIGHT,
  icon: colors.TERTIARY_TEXT,
  accent: colors.TERTIARY,
};

export const getCoeVisualConfig = (coe?: string | null): CoeVisualConfig => {
  if (!coe) {
    return DEFAULT_COE_CONFIG;
  }
  return COE_CONFIG[coe.trim().toLowerCase()] ?? DEFAULT_COE_CONFIG;
};
