import {
  countryDefaults,
  formatMoney,
  paymentMethodsFor,
  TAX_REGIME_PRESETS,
} from '@nodedr-restaurant/types';

describe('country defaults', () => {
  it('Bangladesh: taka, Dhaka time, VAT added on top, mobile wallets at checkout', () => {
    const bd = countryDefaults('BD');
    expect(bd.currency).toBe('BDT');
    expect(bd.timezone).toBe('Asia/Dhaka');
    expect(TAX_REGIME_PRESETS[bd.taxRegime]).toMatchObject({
      taxLabel: 'VAT',
      taxIdLabel: 'BIN',
      defaultMode: 'EXCLUSIVE',
    });
    expect(paymentMethodsFor('bd')).toEqual(
      expect.arrayContaining(['CASH', 'BKASH', 'NAGAD', 'ROCKET']),
    );
    expect(paymentMethodsFor('BD')).not.toContain('UPI');
  });

  it('offers UPI only in India', () => {
    expect(paymentMethodsFor('IN')).toContain('UPI');
    expect(paymentMethodsFor('US')).not.toContain('UPI');
    expect(paymentMethodsFor('FR')).toEqual(['CASH', 'CARD', 'OTHER']);
  });
});

describe('formatMoney', () => {
  it('uses lakh grouping for taka', () => {
    expect(formatMoney(1234567.5, 'BDT')).toBe('৳12,34,567.50');
    expect(formatMoney('450', 'BDT')).toBe('৳450');
  });
  it('falls back to the currency code', () => {
    expect(formatMoney(10, 'AED')).toBe('AED 10');
  });
});
