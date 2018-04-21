import Component from '@ember/component';
import { inject } from '@ember/service'
import { computed } from '@ember/object';

export default Component.extend({
  users: null,
  session: inject(),
  router: inject(),
  store: inject(),
  actions: {
    signOut: function() {
      this.get('session').close();
      this.get('store').unloadAll();
      localStorage.removeItem('arenaId');
      this.get('router').transitionTo('/');
    },
    viewProfile: function() {
      this.get('router').transitionTo('profile', {queryParams: {userId: undefined}});
    },
    changeArena: function() {
      this.get('router').transitionTo('arenas');
    }
  }
});
