import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Controller.extend({

  watchers: service(),
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
      this.get('watchers').find(project).sync();
    }
  }

})
