import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Helper.extend({

  watchers: service(),

  compute([ model ]) {
    return this.get('watchers').find(model);
  }

});
