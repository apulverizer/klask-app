import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(provider) {
      var parent_this = this;
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        // do something with data.currentUser
        parent_this.transitionTo('standings');
      });
    },
    signOut: function() {
      this.get('session').close();
      this.transitionTo('/');
    }
  }
});