import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  beforeModel() {
    if (!this.get('session.currentUser')){
      this.transitionTo('/');
    }
  },
  model() {
    return RSVP.hash({
      users: this.get('store').findAll('user'),
      games: this.get('store').findAll('game'),
      arenas: this.get('store').findAll('arena')
    });
  }
});
