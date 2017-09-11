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
        this.transitionTo('groups.group.edit', this.get('model.target'));
      }
    }
  },

  model() {
    let target = this.modelFor('groups.group');
    return this.loadViewModel('group', { target });
  }

});
