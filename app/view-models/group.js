import Edit from './-edit';
import Ember from 'ember';

const {
  RSVP: { resolve },
  computed
} = Ember;

export default Edit.extend({

  modelName: 'group',
  changesetName: 'group-changeset',
  changesetDefaults: { name: 'New Group' },

});
