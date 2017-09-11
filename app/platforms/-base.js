import Ember from 'ember';

const {
  getOwner
} = Ember;

export default Ember.Object.extend({

  name: null,

  syncer(project) {
    let name = this.get('name');
    let platform = this;
    return getOwner(this).factoryFor(`platform:syncer/${name}`).create({ platform, project });
  }

});
