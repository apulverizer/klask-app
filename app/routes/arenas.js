import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
  session: inject(),
  cookies: inject(),
  beforeModel() {
    if (!this.get('session.currentUser')){
      this.transitionTo('/');
    }
  },
  model: function() {
    // var parentThis=this;
    return this.get('store').query('user', {
      orderBy: 'uid',
      equalTo: this.get('session.currentUser.uid')
    }).then((users) => {
      var arenaIds = users.objectAt(0).get('arenasjoined') || [];
      var joinedArenas = A();
      for (let [, aid] of arenaIds.entries()) {
        this.get('store').query('arena', {
          orderBy: 'aid',
          equalTo: aid
        }).then((arenas) => {
          joinedArenas.pushObject(arenas.objectAt(0));
        });
      }
      return joinedArenas;
    });
  }
});
