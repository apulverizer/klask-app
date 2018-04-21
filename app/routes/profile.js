import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject } from '@ember/service';

export default Route.extend({
  session: inject(),
  queryParams: {
    userId: {
      refreshModel: true
    }
  },
  beforeModel() {
    if (!this.get('session.currentUser')){
      this.transitionTo('/');
    }
  },
  model(params) {
    return RSVP.hash({
      user: this.get('store').query('user', {
        orderBy: 'uid',
        equalTo: params.userId || this.get('session.currentUser.uid')
      }).then(function(users){
        return users.objectAt(0);
      }),
      users: this.get('store').findAll('user'),
      games: this.get('store').findAll('game'),
      arenas: this.get('store').findAll('arena'),
      isCurrentUser: (params.userId === undefined) || (params.userId === this.get('session.currentUser.uid'))
    });
  }
});
