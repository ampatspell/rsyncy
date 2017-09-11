import ViewModel from './-base';
import Ember from 'ember';

const {
  RSVP: { resolve },
  computed
} = Ember;

export default ViewModel.extend({

  group: null,  

  isNew: computed('group.isNew', function() {
    let group = this.get('group');
    if(!group) {
      return true;
    }
    return group.get('isNew');
  }).readOnly(),

  changeset: computed(function() {
    let group = this.get('group');
    return this.createViewModel('group-changeset', { name: 'Untitled' }).build(group);
  }).readOnly(),

  update(props) {
    let group = this.get('group');
    if(!group) {
      group = this.get('store').createRecord('group');
      this.set('group', group);
    }
    group.setProperties(props);
    return group.save();
  },

  save() {
    let changeset = this.get('changeset');
    return changeset.serialize().then(props => this.update(props));
  },

  delete() {
    let group = this.get('group');
    if(!group) {
      return resolve();
    }
    return group.destroyRecord();
  }

});
