import Ember from 'ember';

const {
  computed
} = Ember;

const Component = Ember.Component.extend({
  classNameBindings: [ ':ui-icon', ':fa', 'iconClassName', 'disabled:disabled', 'attrs.action:has-action' ],

  disabled: false,

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
  }

});

Component.reopenClass({
  positionalParams: [ 'name' ]
});

export default Component;
