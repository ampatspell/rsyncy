import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':form-row-button', 'attrs.action::no-action', 'disabled:disabled' ],

  disabled: false,

  click() {
    if(this.get('disabled')) {
      return;
    }
    this.attrs.action && this.attrs.action();
  }

});
