import Ember from 'ember';

const {
  inject: { service },
  computed
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [ ':ui-application', 'platformClassName' ],

  platform: service(),

  platformClassName: computed('platform.name', function() {
    let name = this.get('platform.name');
    return `platform-${name}`;
  }).readOnly()

});
