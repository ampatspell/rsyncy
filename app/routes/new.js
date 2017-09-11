import Ember from 'ember';

export default Ember.Route.extend({

  navigation: {
    title: 'Create new…',
    left: {
      icon: 'chevron-left',
      action() {
        this.transitionTo('groups');
      }
    }
  }

});
