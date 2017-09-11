import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({

  watchers: service(),

  model() {
    return this.get('watchers').load().then(() => undefined);
  }

});
