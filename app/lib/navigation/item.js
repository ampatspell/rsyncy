import Ember from 'ember';

const {
  computed: { reads }
} = Ember;

export default Ember.Object.extend({

  route: reads('navigation.route'),
  model: reads('navigation.model'),

  _action(item, ...args) {
    return item.action.call(item, ...args);
  },

  transitionTo(...args) {
    return this.get('route').transitionTo(...args);
  }

});
