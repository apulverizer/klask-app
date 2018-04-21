import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import getStandings from '../../utils/standings-calculator';

export default Component.extend({
  session: inject(),
  allusers: null,
  allgames: null,
  store: inject(),
  arenaid: localStorage.getItem('arenaId'),
  userid: computed('user', function(){
    if (this.get('user')){
      return this.get('user').get('uid');
    }
    return undefined;
  }),
  rank: computed('userid','allgames.@each.{player1score,player2score,player1id,player2id,arenaid}', function(){
    var games = this.get('allgames');
    var users = this.get('allusers');
    var uid = this.get('userid');
    // filter games by arena
    games = games.filter((item, index, self) => (item.get('arenaid') === this.get('arenaid')));
    var userRanks = getStandings(games, users, uid, this.get('arenaid'), 'Win %')
    for (var i = 0; i < userRanks.length; i++) {
        if (uid === userRanks[i].user.get('uid')) {
          return i+1;
        }
    }
    return 0;
  }),
  games: computed('userid','allgames.@each.{player1score,player2score,player1id,player2id,arenaid}', function(){
    let games = this.get('allgames');
    let g = games.filter((item, index, self) => item.get('arenaid') === this.get('arenaid') && (item.get('player2id') === this.get('userid') || item.get('player1id') === this.get('userid')));
    return g.sort(function(a, b){
      if(a.get('datetime') > b.get('datetime')) return -1;
      if(a.get('datetime') < b.get('datetime')) return 1;
      return 0;
    });
  }),
  wins: computed('games', function(){
    let player2wins = this.get('games').filter((item, index, self) => ((item.get('player2id') === this.get('userid')) && item.get('player2score') === 6));
    let player1wins = this.get('games').filter((item, index, self) => ((item.get('player1id') === this.get('userid')) && item.get('player1score') === 6));
    return player1wins.get('length') + player2wins.get('length');
  }),
  losses: computed('games', function(){
    let player2losses = this.get('games').filter((item, index, self) => ((item.get('player2id') === this.get('userid')) && item.get('player2score') != 6));
    let player1losses = this.get('games').filter((item, index, self) => ((item.get('player1id') === this.get('userid')) && item.get('player1score') != 6));
    return player2losses.get('length') + player1losses.get('length');
  }),
  winPercentage: computed('wins', 'losses', function(){
    let wins = this.get('wins');
    let losses = this.get('losses');
    return ((wins/(wins+losses))*100).toFixed(0) || 0;
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
