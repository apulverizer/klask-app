import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  session: inject(),
  title: null,
  username: null,
  showProfileButton: false,
  showEditButton: false,
  showSwapButton: false,
  userid: computed('session', function(){
    return this.get('session.currentUser.uid');
  }),
  user: computed('users', function(){
    let userid = this.get('userid');
    let user = this.get('users').filterBy('uid', userid)[0];
    return user;
  }),
});
