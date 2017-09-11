import Ember from 'ember';
import extend from 'rsyncy/util/extend';

const {
  on
} = Ember;

const extendItem = (owner, name, key, navigation) => {
  let props = navigation[key];
  if(!props) {
    return;
  }
  return extend(owner, 'lib:navigation/item', `${key}-${name}`, Item => Item.extend(props));
};

const createItem = (owner, name, key, props, navigation) => {
  let Item = extendItem(owner, name, key, props);
  if(!Item) {
    return;
  }
  return Item.create({ navigation });
};

const wrap = (owner, routeName, props) => {
  if(!props) {
    return;
  }

  let name = routeName.replace(/\./g, '-');

  let Navigation = extend(owner, 'lib:navigation/navigation', name, Navigation => Navigation.extend(props));

  let navigation = Navigation.create({ route: owner });

  navigation.setProperties({
    left:  createItem(owner, name, 'left', props, navigation),
    right: createItem(owner, name, 'right', props, navigation)
  });

  return navigation;
};

export default Ember.Mixin.create({

  _navigation() {
    if(!this.__navigation) {
      let { routeName, navigation } = this.getProperties('routeName', 'navigation');
      this.__navigation = wrap(this, routeName, navigation);
    }
    return this.__navigation;
  },

  _setNavigation(navigation) {
    this.controllerFor(this.get('navigation.owner') || 'application').set('navigation', navigation);
  },

  _setupNavigation: on('activate', function() {
    let navigation = this._navigation();
    if(!navigation) {
      return;
    }
    navigation.set('model', this.modelFor(this.routeName));
    this._setNavigation(navigation);
  }),

  _teardownNavigation: on('deactivate', function() {
    let navigation = this._navigation();
    if(!navigation) {
      return;
    }
    navigation.set('model', null);
    this._setNavigation(null);
  })

});
