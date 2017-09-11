import Ember from 'ember';

export default Ember.Controller.extend({

  checked: true,

  actions: {
    showProject(project) {
      this.transitionToRoute('projects.project', project);
    },
    showGroup(group) {
      this.transitionToRoute('groups.group', group);
    },
    updateProjectWatch(project, watch) {
      project.set('watch', watch);
      project.save();
    },
    syncProject(project) {
      Ember.Logger.info('sync project', project+'');
      project.set('isSyncing', true);
      Ember.run.later(() => project.set('isSyncing', false), 2000);
    }
  }

})
