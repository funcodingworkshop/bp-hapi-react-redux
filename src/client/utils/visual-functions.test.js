import * as visual from './visual-functions';

describe('VISUAL FUNCTIONS', () => {
  describe('Testing normalizeDate function', () => {
    const unparsedDate = '2018-08-06T13:48:56.318Z';
    it('Should return 2018-08-06 13:48:56', () => {
      expect(visual.normalizeDate(unparsedDate)).toEqual('2018-08-06 13:48:56');
    });
  });
});
