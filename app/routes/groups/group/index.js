import Ember from 'ember';

const {
  computed: { reads }
} = Ember;

export default Ember.Route.extend({

  navigation: {
    title: reads('model.group.name'),
    left: {
      icon: 'chevron-left',
      action() {
        this.transitionTo('groups');
      }
    },
    right: {
      icon: 'pencil',
      action() {
        this.transitionTo('groups.group.edit', this.get('model.group'));
      }
    }
  },

  model() {
    let group = this.modelFor('groups.group');
    return this.loadViewModel('group', { group });
  }

});
