import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  beforeModel() {
    // make sure signed in
    if (!this.get('session.currentUser')){
      this.transitionTo('/');
    }
    // make sure there is an arena
    else if (!localStorage.getItem('arenaId')){
      this.transitionTo('arenas');
    }
  },
  model() {
    return RSVP.hash({
      users: this.get('store').findAll('user'),
      games: this.get('store').query('game', {
        orderBy: 'arenaid',
        equalTo: localStorage.getItem('arenaId')
      }),
      arenas: this.get('store').findAll('arena')
    });
  }
});
