import Ember from 'ember';
import Syncer from './-base';

const {
  on,
  Logger: { info },
  RSVP: { resolve, reject }
} = Ember;

export default Syncer.extend({

  __watch() {
    return new Promise(resolve => {
      Ember.run.later(() => resolve(), 1000);
    });
  },

  __unwatch() {
    return new Promise(resolve => {
      Ember.run.later(() => resolve(), 1000);
    });
  },

  __syncAll() {
    return new Promise(resolve => {
      Ember.run.later(() => resolve(), 3000);
    });
  },

  __syncChanges(changes) {
    return new Promise(resolve => {
      Ember.run.later(() => resolve(), 1000);
    });
  }

});
