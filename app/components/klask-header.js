import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  session: inject(),
  title: null,
  username: null,
  users: null,
  userid: computed('session', function(){
    return this.get('session.currentUser.uid');
  }),
  user: computed('allusers', function(){
    let userid = this.get('userid');
    let user = this.get('users').filterBy('uid', userid)[0];
    return user;
  }),
});
