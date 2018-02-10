import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  afterModel: function(){
    if (this.get('session.currentUser')){
      this.transitionTo('standings');
    }
  }
});