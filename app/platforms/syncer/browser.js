import Ember from 'ember';
import Syncer from './-base';

export default Syncer.extend({

  __watch() {
  },

  __unwatch() {
  },

  __syncAll() {
    return new Promise(resolve => {
      Ember.run.later(() => resolve(), 1000);
    });
  },

  __syncChanges(changes) {
  }

});
