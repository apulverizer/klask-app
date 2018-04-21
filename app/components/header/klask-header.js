import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  session: inject(),
  router: inject(),
  store: inject(),
  title: null,
  username: null,
  showBackButton: false,
  showMyProfileButton: false,
  showEditButton: false,
  showSwapButton: false,
  showSignOutButton: false,
  userid: computed('session', function(){
    return this.get('session.currentUser.uid');
  }),
  user: computed('users', function(){
    let userid = this.get('userid');
    let user = this.get('users').filterBy('uid', userid)[0];
    return user;
  }),
  actions: {
    goBack(){
      history.back();
    },
    signOut: function() {
      this.get('session').close();
      this.get('store').unloadAll();
      localStorage.removeItem('arenaId');
      this.get('router').transitionTo('/');
    },
    changeArena: function() {
      this.get('router').transitionTo('arenas');
    }
  }
});
