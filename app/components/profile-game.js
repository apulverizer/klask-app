import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  classNameBindings: ['isWin:win'],
  session: inject(),
  game: null,
  allusers: null,
  opponent: computed('allusers', 'game.player1id', 'game.player2id', function(){
    return this.get('allusers').filter((item, index, self) => ((item.get('uid') === this.get('game.player1id')) || item.get('uid') === this.get('game.player2id')) && item.get('uid') != this.get('session.currentUser.uid'))[0];
  }),
  isWin: computed('game.player1id', 'game.player2id', function(){
    let player1score = this.get('game').get('player1score');
    let player2score = this.get('game').get('player2score');
    let player1id = this.get('game').get('player1id');
    let isPlayer1 = this.get('session.currentUser.uid') == player1id;
    return (isPlayer1 && (player1score > player2score)) || (!isPlayer1 && (player2score > player1score));
  })
});
