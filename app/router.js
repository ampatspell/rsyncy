import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('new');
  this.route('groups', function() {
    this.route('new');
    this.route('group', { path: ':group_id' }, function() {
      this.route('edit');
    });
  });
  this.route('projects', function() {
    this.route('new');
    this.route('project', { path: ':project_id' }, function() {
      this.route('edit');
    });
  });
});

export default Router;
