/**
 * @description get url from urlTemplate
 *
 * @param {String} urlTemplate - Example: /api/products/{productId}
 * @param {Object} obj - Example: { productId: '5b2623b41890960001c80489'}
 * @returns {String} - Example: /api/products/5b2623b41890960001c80489
 */
export function parseUrlFromTemplate(urlTemplate, obj) {
  let urlRes = urlTemplate;
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    urlRes = urlRes.replace(`{${key}}`, val);
  });
  const hasBrackets = urlRes.includes('{');
  if (hasBrackets) {
    console.error('Not all brackets replaced in template', urlRes);
  }
  return urlRes;
}
