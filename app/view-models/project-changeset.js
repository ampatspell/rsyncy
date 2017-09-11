import Changeset from './-changeset';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  source: validator('presence', true),
  target: validator('presence', true),
  group: validator('presence', true)
});

export default Changeset.extend(Validations, {

  name: null,
  source: null,
  target: null,
  group: null,
  watch: true,

  properties: [ 'name', 'source', 'target', 'group', 'watch' ]

});
