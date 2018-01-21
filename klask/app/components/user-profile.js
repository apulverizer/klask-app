import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';


export default Component.extend({
  session: inject(),
  user: null,
  store: inject(),
  userid: computed('session', function(){
    return this.get('session.currentUser.uid');
  }),
  rank: computed('user.uid', 'store', function(){
    let users = this.get('store').findAll('user');
    return 1;
  }),
  games: computed('userid', 'store', function(){
    return this.get('store').findAll('game');
  }),
  wins: computed('userid', 'store', function(){
    let wins = 0;
    this.get('store').findAll('game');
    return wins;
  }),
  losses: computed('user.uid', 'store', function(){
    this.get('store').findAll('game');
    return 2;
  }),
  winPercentage: computed('user.uid', 'store', function(){
    this.get('store').findAll('game');
    return 66.6;
  })
});
