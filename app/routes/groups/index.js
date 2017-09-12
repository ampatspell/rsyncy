import Ember from 'ember';

export default Ember.Route.extend({

  navigation: {
    title: 'Projects',
    left: {
      icon: 'cog',
      action() {
        this.transitionTo('settings');
      }
    },
    right: {
      icon: 'plus-square',
      action() {
        this.transitionTo('new');
      }
    }
  }

});
