import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';


export default Component.extend({
  session: inject(),
  allusers: null,
  allgames: null,
  store: inject(),
  user: computed('allusers', function(){
    let userid = this.get('userid');
    let user = this.get('allusers').filterBy('uid', userid)[0];
    return user;
  }),
  userid: computed('session', function(){
    return this.get('session.currentUser.uid');
  }),
  rank: computed('allgames.@each.{player1score,player2score,player1id,player2id,arenaid}', function(){
    // calculate win/loss for each user somehow
    var games = this.get('allgames');
    var users = this.get('allusers');
    var uid = this.get('userid');
    var userRanks = [];
    users.forEach(function(user){
      //g = games.filter((item, index, self) => item.get('player2id') === user.get('uid') || item.get('player1id') === user.get('player2id'));
      let userid = user.get('uid');
      let wins = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') === 6) || (item.get('player1id') == userid && item.get('player1score') === 6)).get('length');
      let losses = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') != 6) || (item.get('player1id') == userid && item.get('player1score') != 6)).get('length');
      let ratio = wins/(wins+losses);
      userRanks.push({
        userid: userid,
        ratio: ratio
      });
    });
    userRanks.sort(function(a,b) {return (a.ratio < b.ratio) ? 1 : ((b.ratio > a.ratio) ? -1 : 0);} );
    for (var i = 0; i < userRanks.length; i++) {
        if (uid === userRanks[i].userid) {
          return i+1;
        }
    }
    return 0;
  }),
  games: computed('allgames.@each.{player1score,player2score,player1id,player2id,arenaid}', 'userid', function(){
    let games = this.get('allgames');
    return games.filter((item, index, self) => item.get('player2id') === this.get('userid') || item.get('player1id') === this.get('userid'));
  }),
  wins: computed('games', function(){
    let games = this.get('games');
    return this.get('games').filter((item, index, self) => (item.get('player2id') === this.get('userid') && item.get('player2score') === 6) || (item.get('player1id') == item.get('userid') && item.get('player1score') === 6)).get('length');
  }),
  losses: computed('games', function(){
    let games = this.get('games');
    return this.get('games').filter((item, index, self) => (item.get('player2id') === this.get('userid') && item.get('player2score') != 6) || (item.get('player1id') == item.get('userid') && item.get('player1score') != 6)).get('length');
  }),
  winPercentage: computed('wins', 'losses', function(){
    let wins = this.get('wins');
    let losses = this.get('losses');
    return (wins/(wins+losses))*100;
  }),
  goalsFor: computed('games', function(){
    let player2scores = this.get('games').filter((item, index, self) => (item.get('player2id') === this.get('userid'))).map(item => item.get('player2score')).reduce(function(a, b) { return a + b; }, 0);
    let player1scores = this.get('games').filter((item, index, self) => (item.get('player1id') === this.get('userid'))).map(item => item.get('player1score')).reduce(function(a, b) { return a + b; }, 0);
    return player2scores + player1scores;
  }),
  goalsAgainst: computed('games', function(){
    let player2scores = this.get('games').filter((item, index, self) => (item.get('player2id') === this.get('userid'))).map(item => item.get('player1score')).reduce(function(a, b) { return a + b; }, 0);
    let player1scores = this.get('games').filter((item, index, self) => (item.get('player1id') === this.get('userid'))).map(item => item.get('player2score')).reduce(function(a, b) { return a + b; }, 0);
    return player2scores + player1scores;
  })
});
