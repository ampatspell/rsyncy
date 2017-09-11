import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':form-row-checkmark' ],

  actions: {
    update(value) {
      let { changeset, property } = this.getProperties('changeset', 'property');
      changeset.set(property, value);
    }
  }

});
