import _ from 'lodash';

export const flow = fns => _.flow(fns);
export const throttle = fn => _.throttle(fn, 2000, { trailing: false });