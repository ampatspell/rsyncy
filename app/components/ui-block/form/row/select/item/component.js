import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [ ':item', 'isSelected:selected' ],

  isSelected: computed('model', 'selected', function() {
    let { model, selected } = this.getProperties('model', 'selected');
    return model === selected;
  }).readOnly(),

  click() {
    this.attrs.select();
  }

});
