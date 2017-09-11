import Ember from 'ember';

const {
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({

  model() {
    return hash({
      groups: this.get('store').findAll('group')
    });
  }

});
