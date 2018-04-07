import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import getStandings from '../utils/standings';

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
    var arenaId = localStorage.getItem('arenaId');
    // calculate win/loss for each user somehow
    var games = this.get('allgames');
    games = games.filter((item, index, self) => (item.get('arenaid') === arenaId && item.get('datetime') >= this.get('minDate')));
    var users = this.get('allusers');
    var uid = this.get('userid');
    return getStandings(games, users, uid, arenaId, this.get('rankType'));
  }),

  actions: {
    changeDateFilter(){
      this.set('dateFilterIndex', (this.get('dateFilterIndex') + 1) % this.get('dateFilters').length);
    },
    changeRankType(){
      this.set('rankTypeIndex', (this.get('rankTypeIndex') + 1) % this.get('rankTypes').length);
    }
  }

});
