import Ember from 'ember';

export default Ember.Route.extend({

  navigation: {
    title: 'Settings',
    left: {
      icon: 'chevron-left',
      action() {
        this.transitionTo('groups');
      }
    },
    right: {
      icon: 'power-off',
      action() {
      }
    }
  }

});
