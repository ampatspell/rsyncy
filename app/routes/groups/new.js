import Ember from 'ember';

export default Ember.Route.extend({

  navigation: {
    title: 'Add New Group',
    left: {
      icon: 'chevron-left',
      action() {
        this.transitionTo('new');
      }
    }
  },

  model() {
    return this.loadViewModel('group');
  }

});
