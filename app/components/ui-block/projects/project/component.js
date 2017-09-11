import Ember from 'ember';

const {
  inject: { service },
  computed
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [ ':ui-block', ':projects-project' ],

  platform: service(),

  syncer: computed('project', function() {
    let project = this.get('project');
    if(!project) {
      return;
    }
    return this.get('platform').syncer(project);
  }).readOnly(),

  click() {
    this.attrs.select && this.attrs.select();
  },

  actions: {
    sync() {
      this.get('syncer').sync();
    }
  }

});
