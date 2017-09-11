import Ember from 'ember';

const {
  computed: { reads }
} = Ember;

export default Ember.Route.extend({

  navigation: {
    title: reads('model.target.name'),
    left: {
      icon: 'chevron-left',
      action() {
        this.transitionTo('groups');
      }
    },
    right: {
      icon: 'pencil',
      action() {
        this.transitionTo('projects.project.edit', this.get('model.target'));
      }
    }
  },

  model() {
    let target = this.modelFor('projects.project');
    return this.loadViewModel('project', { target });
  }

});
