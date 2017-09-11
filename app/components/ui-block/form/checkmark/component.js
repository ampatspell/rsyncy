import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':form-checkmark', 'checked:checked:unchecked' ],

  checked: false,

  click() {
    let value = this.get('checked');
    this.attrs.update && this.attrs.update(!value);
    return false;
  }

});
