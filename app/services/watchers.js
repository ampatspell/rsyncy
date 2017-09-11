import Ember from 'ember';

const {
  A,
  computed,
  getOwner,
  inject: { service }
} = Ember;

export default Ember.Service.extend({

  store: service(),

  projects: computed(function() {
    return this.get('store').peekAll('project');
  }).readOnly(),

  watchers: computed('projects.[]', function() {
    let watchers = this._watchers || A();
    let projects = this.get('projects');
    watchers.pushObjects(projects.map(project => {
      if(watchers.findBy('model', project)) {
        return;
      }
      return this.createWatcher(project);
    }).compact());
    return watchers;
  }).readOnly(),

  createWatcher(model) {
    let Watcher = getOwner(this).factoryFor('model:project-watcher');
    let watchers = this;
    return Watcher.create({ model, watchers });
  },

  find(model) {
    if(!model) {
      return;
    }
    return this.get('watchers').findBy('model', model);
  },

  load() {
    return this.get('store').findAll('project').then(() => this.get('watchers'));
  },

  _destroyWatcher(watcher) {
    this.get('watchers').removeObject(watcher);
    watcher.destroy();
  }

});
