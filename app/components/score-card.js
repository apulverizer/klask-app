import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    opponent: null,
    win: null,
    score: 0,
    store: inject(),
    session: inject(),
    actions: {
        submitScore(){
            let player1score = 0;
            let player2score = 0;
            if (this.get('win')){
                player1score = 6;
                player2score = this.get('score');
            }
            else {
                player2score = 6;
                player1score = this.get('score');
            }
            let newGame = this.get('store').createRecord('game',{
                arenaid: localStorage.getItem('arenaId'),
                datetime: new Date().getTime()/1000,
                player1id: this.get('session.currentUser.uid'),
                player1score: player1score,
                player2id: this.get('opponent.uid'),
                player2score: player2score,
                gid: null,
            })
            newGame.set('gid', newGame.get('id'));
            newGame.save().catch(function(e){
                console.log(e)
            })
        },
        score0(){
            this.set('score', 0);
        },
        score1(){
            this.set('score', 1);
        },
        score2(){
            this.set('score', 2);
        },
        score3(){
            this.set('score', 3);
        },
        score4(){
            this.set('score', 4);
        },
        score5(){
            this.set('score', 5);
        }
      }
});
