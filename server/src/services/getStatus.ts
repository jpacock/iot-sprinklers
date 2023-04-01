import { getStatus as getRpiStatus } from '../rpi';

export const getStatus = () => {
  return getRpiStatus();
};
