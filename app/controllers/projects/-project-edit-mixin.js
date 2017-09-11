import Ember from 'ember';

export default Ember.Mixin.create({

  actions: {
    saved(project) {
      this.transitionToRoute('projects.project', project);
    }
  }

});
