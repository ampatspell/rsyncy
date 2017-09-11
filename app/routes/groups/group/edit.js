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
        this.transitionTo('groups.group', this.get('model.target'));
      }
    }
  },

  model() {
    let target = this.modelFor('groups.group');
    return this.loadViewModel('group', { target });
  }

});
