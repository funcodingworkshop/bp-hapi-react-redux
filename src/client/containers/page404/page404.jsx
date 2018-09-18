import React from 'react';
import { createBemClassFactory } from '../../utils/bem';

const cn = createBemClassFactory('sign-up');

export default function () {
  return (
    <div className={ cn() }>
      <h2>Page 404</h2>
    </div>
  );
}
