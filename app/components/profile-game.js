import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  session: inject(),
  game: null,
  allusers: null,
  opponent: computed('allusers', 'game.player1id', function(){
    return this.get('allusers').filter((item, index, self) => ((item.get('uid') === this.get('game.player1id')) || item.get('uid') === this.get('game.player2id')) && item.get('uid') != this.get('session.currentUser.uid'))[0];
  })
});
