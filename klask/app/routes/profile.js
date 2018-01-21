import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  model: function() {
    return this.store.query('user', {
      orderBy: "uid",
      equalTo: this.get('session.currentUser.uid')
    })[0];
  }
});
