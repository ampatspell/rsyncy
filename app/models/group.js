import { Model, settings, inverse } from './-base';

export default Model.extend({

  name: settings('name'),
  
  projects: inverse('projects', 'groupId')

});
