import Ember from 'ember';
import NavigationRoute from 'rsyncy/mixins/navigation-route';
import ViewModels from 'rsyncy/mixins/view-models';

const {
  Resolver,
  Route
} = Ember;

Resolver.reopen({
  init() {
    this._super(...arguments);
    this.pluralizedTypes = {
      'lib': 'lib'
    };
  }
});

Route.reopen(
  NavigationRoute,
  ViewModels
);

export default {
  name: 'rsyncy:reopens',
  initialize() {}
};
