import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'ul',
  classNames: ['demo-list-two mdl-list'],
  store: inject(),
  allusers: null,
  allgames: null,

  usersRanked: computed('allusers','allgames.@each.{player1score,player2score,player1id,player2id,arenaid}', function(){
    // calculate win/loss for each user somehow
    var games = this.get('allgames');
    var users = this.get('allusers');
    var uid = this.get('userid');
    // get current arena from local storage
    var currentArenaId = localStorage.getItem('arenaId');
    var userRanks = [];
    users.forEach(function(user){
      let areansjoined = user.get('arenasjoined') || [];
      // filter by current arena
      if (areansjoined.indexOf(currentArenaId) != -1){
        let userid = user.get('uid');
        let wins = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') === 6) || (item.get('player1id') == userid && item.get('player1score') === 6)).get('length');
        let losses = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') != 6) || (item.get('player1id') == userid && item.get('player1score') != 6)).get('length');
        let ratio = wins/(wins+losses);
        userRanks.push({
          user: user,
          ratio: ratio
        });
      }
    });
    let usersRanked = userRanks.sort(function(a,b) {return (a.ratio < b.ratio) ? 1 : ((b.ratio > a.ratio) ? -1 : 0);} ).map(a => a.user);
    return usersRanked;
  }),

});
