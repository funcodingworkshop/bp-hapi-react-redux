import nock from 'nock';
import getConfig from '../config/config';

const config = getConfig();
const shortDelay = 200;

nock(config.services.sendCode.url)
  .persist()
  .post('')
  .delay(shortDelay)
  .reply((uri, request, cb) => {
    const parsedRequest = JSON.parse(request);
    console.log('mocks request', parsedRequest); // eslint-disable-line no-console
    if (parsedRequest.phone === '79161234561') {
      cb(null, [200, { ref: 'PC72703180000aur' }]);
    }
    cb(null, [400, 'error']);
  });

nock(config.services.verifyCode.url)
  .persist()
  .post('')
  .delay(shortDelay)
  .reply((uri, request, cb) => {
    const parsedRequest = JSON.parse(request);
    console.log('mocks request', parsedRequest); // eslint-disable-line no-console
    if (parsedRequest.password === '1234' && parsedRequest.reference === 'PC72703180000aur') {
      cb(null, [200, { phone: '79161234561' }]);
    }
    if (parsedRequest.password === '500') {
      cb(null, [500, 'server error']);
    }
    cb(null, [400, 'client error']);
  });
