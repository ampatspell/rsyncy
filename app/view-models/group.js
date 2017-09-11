import Edit from './-edit';

export default Edit.extend({

  storeName: 'groups',
  changesetName: 'group-changeset',
  changesetDefaults: { name: 'New Group' },

});
