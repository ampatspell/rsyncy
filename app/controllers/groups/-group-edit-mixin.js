import Ember from 'ember';

export default Ember.Mixin.create({

  actions: {
    saved(group) {
      this.transitionToRoute('groups.group', group);
    }
  }

});
