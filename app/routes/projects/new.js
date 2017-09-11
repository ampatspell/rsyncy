import Ember from 'ember';

export default Ember.Route.extend({

  navigation: {
    title: 'Add New Project',
    left: {
      icon: 'chevron-left',
      action() {
        this.transitionTo('new');
      }
    }
  },

  model() {
    return this.loadViewModel('project');
  }

});
