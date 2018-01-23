import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      users: this.get('store').findAll('user'),
      games: this.get('store').findAll('game'),
      arenas: this.get('store').findAll('arena')
    });
  }
});
