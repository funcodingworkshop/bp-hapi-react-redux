import { createBemClassFactory } from './bem';

describe('utils createBemClassFactory', () => {
  const mebFunc = createBemClassFactory('test-block');

  it('createBemClassFactory block only', () => {
    expect(mebFunc()).toBe('test-block');
  });

  it('createBemClassFactory block and element', () => {
    expect(mebFunc('test-element')).toBe('test-block__test-element');
  });

  it('createBemClassFactory block, element and modificator', () => {
    expect(mebFunc('test-element', 'test-mod')).toBe('test-block__test-element test-block__test-element_test-mod');
  });
});
