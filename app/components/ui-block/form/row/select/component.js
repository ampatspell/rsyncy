import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':form-row-select' ],

  actions: {
    select(model) {
      let { changeset, property } = this.getProperties('changeset', 'property');
      changeset.set(property, model);
    }
  }

});
