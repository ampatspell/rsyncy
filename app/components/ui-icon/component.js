import Ember from 'ember';

const {
  computed
} = Ember;

const Component = Ember.Component.extend({
  classNameBindings: [ ':ui-icon', ':fa', 'iconClassName', 'spinClassName', 'disabled:disabled', 'attrs.action:has-action' ],

  disabled: false,
  spin: false,

  spinClassName: computed('spin', function() {
    let spin = this.get('spin');
    if(!spin) {
      return;
    }
    return 'fa-spin';
  }).readOnly(),

  iconClassName: computed('name', function() {
    let name = this.get('name');
    if(!name) {
      return;
    }
    return `fa-${name}`;
  }).readOnly(),

  click() {
    if(this.get('disabled')) {
      return;
    }
    this.attrs.action && this.attrs.action();
    return false;
  }

});

Component.reopenClass({
  positionalParams: [ 'name' ]
});

export default Component;
