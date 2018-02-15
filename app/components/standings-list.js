import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.dateFilters = ['All Time', 'Last 30 Days', 'Last 7 Days', 'Today'];
    this.rankTypes = ['Win %', 'Wins', 'Goal Dif', 'Points', 'Games'];
  },
  tagName: 'ul',
  classNames: ['demo-list-two mdl-list'],
  store: inject(),
  allusers: null,
  allgames: null,
  rankTypeIndex: 0,
  rankType: computed('rankTypeIndex', function(){
    return this.get('rankTypes').objectAt(this.get('rankTypeIndex'));
  }),
  dateFilterIndex: 0,
  dateFilter: computed('dateFilterIndex', function(){
    return this.get('dateFilters').objectAt(this.get('dateFilterIndex'));
  }),
  minDate: computed('dateFilter', 'allgames', 'allusers', function(){
    let dateFilter = this.get('dateFilter');
    if (dateFilter === 'All Time'){
      return 0;
    }
    else if (dateFilter === 'Last 30 Days'){
      let d = new Date();
      return d.setDate(d.getDate()-30)/1000;
    }
    else if (dateFilter === 'Last 7 Days'){
      let d = new Date();
      return d.setDate(d.getDate()-7)/1000;
    }
    else if (dateFilter === 'Today'){
      let d = new Date();
      return d.setHours(0,0,0,0)/1000;
    }
    else {
      return 0;
    }
  }),
  usersRanked: computed('allusers', 'rankType', 'dateFilter', 'allgames.@each.{player1score,player2score,player1id,player2id,arenaid}', function(){
    // get current arena from local storage
    var currentArenaId = localStorage.getItem('arenaId');
    // calculate win/loss for each user somehow
    var games = this.get('allgames');
    games = games.filter((item, index, self) => (item.get('arenaid') === currentArenaId && item.get('datetime') >= this.get('minDate')));
    var users = this.get('allusers');
    var uid = this.get('userid');
    var userRanks = [];
    users.forEach(function(user){
      let areansjoined = user.get('arenasjoined') || [];
      // filter by current arena
      if (areansjoined.indexOf(currentArenaId) != -1){
        let userid = user.get('uid');
        let name = user.get('name');
        let wins = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') === 6) || (item.get('player1id') == userid && item.get('player1score') === 6)).get('length');
        let losses = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') != 6) || (item.get('player1id') == userid && item.get('player1score') != 6)).get('length');
        let ratio = wins/(wins+losses) || 0;
        let player2scores = games.filter((item, index, self) => (item.get('player2id') === userid)).map(item => item.get('player2score')).reduce(function(a, b) { return a + b; }, 0);
        let player1scores = games.filter((item, index, self) => (item.get('player1id') === userid)).map(item => item.get('player1score')).reduce(function(a, b) { return a + b; }, 0);
        let goalsFor = player2scores + player1scores;
        let gaPlayer2scores = games.filter((item, index, self) => (item.get('player2id') === userid)).map(item => item.get('player1score')).reduce(function(a, b) { return a + b; }, 0);
        let gaPlayer1scores = games.filter((item, index, self) => (item.get('player1id') === userid)).map(item => item.get('player2score')).reduce(function(a, b) { return a + b; }, 0);
        let goalsAgainst = gaPlayer2scores + gaPlayer1scores;
        userRanks.push({
          user: user,
          ratio: ratio,
          wins: wins,
          losses: losses,
          goalsFor: goalsFor,
          goalsAgainst: goalsAgainst,
          goalDif: goalsFor - goalsAgainst,
          games: wins+losses,
        });
      }
    });
    // calculate points based on opponent win %
    userRanks.forEach(function(userRanked){
      userRanked.points = 0;
      games.forEach(function(game){
        if (userRanked.user.get('uid') === game.get('player1id') || userRanked.user.get('uid') === game.get('player2id')){
          if (userRanked.user.get('uid') === game.get('player1id')){
            if (game.get('player1score') > game.get('player2score')){
              userRanked.points += (0.5 + (1.5*userRanks.filter((item, index, self) => (item.user.get('uid') === game.get('player2id')))[0].ratio));
            }
          }
          else if (userRanked.user.get('uid') === game.get('player2id'))
          {
            if (game.get('player2score') > game.get('player1score')){
              userRanked.points += (0.5 + (1.5*userRanks.filter((item, index, self) => (item.user.get('uid') === game.get('player1id')))[0].ratio));
            }
          }
        }
      });
    });
    var usersRanked = userRanks.sort(this.sortByPercentage);
    if (this.get('rankType') === 'Win %'){
      usersRanked = userRanks.sort(this.sortByPercentage);
    }
    else if (this.get('rankType') === 'Wins'){
      usersRanked = userRanks.sort(this.sortByWins);
    }
    else if (this.get('rankType') === 'Goal Dif'){
      usersRanked = userRanks.sort(this.sortByGoalDif);
    }
    else if (this.get('rankType') === 'Points'){
      usersRanked = userRanks.sort(this.sortByPoints);
    }
    else if (this.get('rankType') === 'Games'){
      usersRanked = userRanks.sort(this.sortByGames);
    }
    // add rank to object
    for (var i = 0; i < usersRanked.length; i++) {
        usersRanked[i].rank = i+1;
        usersRanked[i].ratio = (usersRanked[i].ratio *100).toFixed(0);
        usersRanked[i].points = (usersRanked[i].points).toFixed(1);
    }
    return usersRanked;
  }),
  sortByPercentage: function(a, b){
    if (a.ratio > b.ratio) {
      return -1;
    }
    if (a.ratio < b.ratio) {
      return 1;
    }
    if (a.wins > b.wins){
      return -1;
    }
    if (b.wins > a.wins){
      return 1;
    }
    return 0;
  },
  sortByWins: function(a, b){
    if (a.wins > b.wins){
      return -1;
    }
    if (b.wins > a.wins){
      return 1;
    }
    if (a.ratio > b.ratio) {
      return -1;
    }
    if (a.ratio < b.ratio) {
      return 1;
    }
    return 0;
  },
  sortByGoalDif: function(a, b){
    if (a.goalDif > b.goalDif){
      return -1;
    }
    if (b.goalDif > a.goalDif){
      return 1;
    }
    if (a.ratio > b.ratio) {
      return -1;
    }
    if (a.ratio < b.ratio) {
      return 1;
    }
    return 0;
  },
  sortByPoints: function(a, b){
    if (a.points > b.points){
      return -1;
    }
    if (b.points > a.points){
      return 1;
    }
    if (a.ratio > b.ratio) {
      return -1;
    }
    if (a.ratio < b.ratio) {
      return 1;
    }
    return 0;
  },
  sortByGames: function(a, b){
    if (a.games > b.games){
      return -1;
    }
    if (b.games > a.games){
      return 1;
    }
    if (a.ratio > b.ratio) {
      return -1;
    }
    if (a.ratio < b.ratio) {
      return 1;
    }
    return 0;
  },

  actions: {
    changeDateFilter(){
      this.set('dateFilterIndex', (this.get('dateFilterIndex') + 1) % this.get('dateFilters').length);
    },
    changeRankType(){
      this.set('rankTypeIndex', (this.get('rankTypeIndex') + 1) % this.get('rankTypes').length);
    }
  }

});
