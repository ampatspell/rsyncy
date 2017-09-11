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
        this.transitionTo('groups.group', this.get('model.group'));
      }
    }
  },

  model() {
    let group = this.modelFor('groups.group');
    return this.loadViewModel('group', { group });
  }

});
