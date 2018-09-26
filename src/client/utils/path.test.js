import { parseUrlFromTemplate } from './path';

describe('path', () => {
  it('parseUrlFromTemplate correctly', () => {
    const res = parseUrlFromTemplate('/api/products/{productId}', { productId: '5b2623b41890960001c80489' });
    expect(res).toBe('/api/products/5b2623b41890960001c80489');
  });
});
