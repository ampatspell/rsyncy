import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':projects-project' ],

  click() {
    this.attrs.select && this.attrs.select();
  }

});
