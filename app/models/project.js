import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({

  name: attr('string'),

  source: attr('string'),
  target: attr('string'),

  watch: attr('boolean'),

  group: belongsTo('group', { async: true, autoSave: true, inverse: 'projects' })

});
