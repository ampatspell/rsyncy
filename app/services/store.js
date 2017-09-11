import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Service.extend({

  settings: service(),

  load() {
    return this.get('settings').load().then(() => {
    });
  }

});
