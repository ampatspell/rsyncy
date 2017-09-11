import Ember from 'ember';
import NavigationRoute from 'rsyncy-app/mixins/navigation-route';
import ViewModels from 'rsyncy-app/mixins/view-models';

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
  name: 'rsyncy-app:reopens',
  initialize() {}
};
