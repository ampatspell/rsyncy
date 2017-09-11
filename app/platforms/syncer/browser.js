import Ember from 'ember';
import Syncer from './-base';

const {
  RSVP: { Promise },
  run: { later }
} = Ember;

export default Syncer.extend({

  __later() {
    return new Promise(resolve => later(() => resolve(), 1000));
  },

  __watch() {
  },

  __unwatch() {
  },

  __syncAll() {
    return this.__later().then(() => `Sync took 1s`);
  },

  __syncChanges() {
    return this.__later().then(() => `Sync took 1s`);
  },

  __stopSync() {
  },

});
