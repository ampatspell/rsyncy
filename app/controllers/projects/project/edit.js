import Ember from 'ember';
import ProjectEdit from '../-project-edit-mixin';

export default Ember.Controller.extend(ProjectEdit, {

  actions: {
    deleted() {
      this.transitionToRoute('groups');
    }
  }

});
