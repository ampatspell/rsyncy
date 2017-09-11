import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      let model = this.get('model');
      return model.save().then(group => {
        return this.attrs.saved && this.attrs.saved(group);
      });
    },
    delete() {
      return this.get('model').delete().then(() => {
        return this.attrs.deleted && this.attrs.deleted();
      });
    }
  }
});
