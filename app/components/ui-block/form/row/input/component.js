import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':form-row-input' ],

  updated: false,

  actions: {
    update(value) {
      let { changeset, property } = this.getProperties('changeset', 'property');
      changeset.set(property, value);
      this.set('updated', true);
    }
  }

});
