import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    project() {
      this.transitionToRoute('projects.new');
    },
    group() {
      this.transitionToRoute('groups.new');
    }
  }

})
