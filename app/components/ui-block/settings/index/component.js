import Ember from 'ember';
import environment from 'rsyncy/config/environment';

const {
  inject: { service },
  computed
} = Ember;

const {
  rsyncy: { version }
} = environment;

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':settings-index' ],

  platform: service(),

  changeset: computed('platform.path', function() {
    let path = this.get('platform.path');
    return {
      version,
      path
    };
  }).readOnly(),

});
