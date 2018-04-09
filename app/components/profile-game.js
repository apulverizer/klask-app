import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  classNameBindings: ['isWin:win'],
  classNames: ['mdl-list__item mdl-list__item--two-line mdl-js-ripple-effect', 'profile-game'],
  session: inject(),
  game: null,
  allusers: null,
  userid: null,
  opponent: computed('userid','allusers', 'game.{player1id,player2id}', function(){
    return this.get('allusers').filter((item, index, self) => ((item.get('uid') === this.get('game.player1id')) || item.get('uid') === this.get('game.player2id')) && item.get('uid') != this.get('userid'))[0];
  }),
  isWin: computed('userid','game{player1id,player2id}', function(){
    let player1score = this.get('game').get('player1score');
    let player2score = this.get('game').get('player2score');
    let player1id = this.get('game').get('player1id');
    let isPlayer1 = this.get('userid') == player1id;
    return (isPlayer1 && (player1score > player2score)) || (!isPlayer1 && (player2score > player1score));
  }),
  formattedDate: computed('game.datetime', 'game', function(){
    let d = moment(this.get('game.datetime')*1000);
    return d.format('dddd, MMM Do • h:mm a');
  }),
  actions: {
    deleteGame: function(){
      let game=this.get('game');
      game.destroyRecord();
      game.save();
    }
  }
});
