import Ember from 'ember';
import { Model, settings, inverse } from './-base';

const {
  RSVP: { all }
} = Ember;

export default Model.extend({

  name: settings('name'),

  projects: inverse('projects', 'groupId'),

  willDelete() {
    return all(this.get('projects').map(project => project.delete()));
  },

});
