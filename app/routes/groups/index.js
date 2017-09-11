import Ember from 'ember';

export default Ember.Route.extend({

  navigation: {
    title: 'Projects',
    right: {
      icon: 'plus-square',
      action() {
        this.transitionTo('new');
      }
    }
  }

});
