import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({

  name: attr('string'),
  projects: hasMany('project', { async: true, dependent: 'destroy', inverse: 'group' })

});
