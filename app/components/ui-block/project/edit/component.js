import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      return this.get('model').save().then(project => {
        return this.attrs.saved && this.attrs.saved(project);
      });
    },
    delete() {
      return this.get('model').delete().then(() => {
        return this.attrs.deleted && this.attrs.deleted();
      });
    }
  }
});
