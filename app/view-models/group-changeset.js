import Changeset from './-changeset';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
});

export default Changeset.extend(Validations, {

  name: null,

  properties: [ 'name' ]

});
