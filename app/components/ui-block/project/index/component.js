import Ember from 'ember';

const {
  inject: { service },
  computed
} = Ember;

export default Ember.Component.extend({

  platform: service(),

  syncer: computed('model.target', function() {
    return this.get('platform').syncer(this.get('model.target'));
  }).readOnly(),

  actions: {
    sync() {
      this.get('syncer').sync();
    }
  }

});
