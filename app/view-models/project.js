import ViewModel from './-base';
import Ember from 'ember';

const {
  RSVP: { resolve, all },
  computed
} = Ember;

export default ViewModel.extend({

  groups: null,
  project: null,

  isNew: computed('project.isNew', function() {
    let project = this.get('project');
    if(!project) {
      return true;
    }
    return project.get('isNew');
  }).readOnly(),

  changeset: computed(function() {
    let project = this.get('project');
    return this.createViewModel('project-changeset', { name: 'Untitled' }).build(project);
  }).readOnly(),

  load() {
    return this.get('store').findAll('group').then(groups => this.set('groups', groups));
  },

  update(props) {
    let project = this.get('project');
    if(!project) {
      project = this.get('store').createRecord('project');
      this.set('project', project);
    }
    project.setProperties(props);

    return all([
      project.save(),
      this.get('groups').map(group => group.save())
    ]).then(([ project ]) => project);
  },

  save() {
    let changeset = this.get('changeset');
    return changeset.serialize().then(props => this.update(props));
  },

  delete() {
    let project = this.get('project');
    if(!project) {
      return resolve();
    }
    return project.destroyRecord();
  }

});
