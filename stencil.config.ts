import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'workchat',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
