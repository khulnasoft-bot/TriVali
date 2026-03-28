import { beforeAll } from 'vitest';
import { SynchronousPromise } from 'synchronous-promise';
import * as trivali from './src/index.ts';

beforeAll(() => {
  if (global.TRIVALI_USE_SYNC) {
    const { Schema } = trivali;
    const { validateSync } = Schema.prototype;

    Schema.prototype.validate = function (value, options = {}) {
      return new SynchronousPromise((resolve, reject) => {
        let result;
        try {
          result = validateSync.call(this, value, options);
        } catch (err) {
          reject(err);
        }

        resolve(result);
      });
    };
  }
});