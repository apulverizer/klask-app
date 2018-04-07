import Component from '@ember/component';

export default Component.extend({
    user: null,
    win: null,
    score: 0,
    actions: {
        submitScore(){
            console.log(this.get('score'));
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
