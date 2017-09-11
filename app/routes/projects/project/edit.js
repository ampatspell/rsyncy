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
        this.transitionTo('projects.project', this.get('model.project'));
      }
    }
  },

  model() {
    let project = this.modelFor('projects.project');
    return this.loadViewModel('project', { project });
  }

});
