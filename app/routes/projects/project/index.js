import Ember from 'ember';

const {
  computed: { reads }
} = Ember;

export default Ember.Route.extend({

  navigation: {
    title: reads('model.project.name'),
    left: {
      icon: 'chevron-left',
      action() {
        this.transitionTo('groups');
      }
    },
    right: {
      icon: 'pencil',
      action() {
        this.transitionTo('projects.project.edit', this.get('model.project'));
      }
    }
  },

  model() {
    let project = this.modelFor('projects.project');
    return this.loadViewModel('project', { project });
  }

});
