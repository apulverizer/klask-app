import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  session: inject(),
  actions: {
    signIn: function(provider) {
      var self = this;
      this.get('session').open('firebase', { provider: provider}).then((data) => {
        // query for the user by id
        return self.get('store').query('user', {
          orderBy: 'uid',
          equalTo: data.currentUser.uid
        })
      })
      .then((users) => {
        // check if user already exists
        // if not, then create a new user
        if (users.get('length') < 1){
          let newUser = this.get('store').createRecord('user', {
            arenasjoined: null,
            nickname: null,
            email: this.get('session.currentUser.email'),
            name: this.get('session.currentUser.displayName'),
            photourl: this.get('session.currentUser.photoURL'),
            uid: this.get('session.currentUser.uid')
          });
          return newUser.save();
        }
        // no need to add user, return resolved promise
        return Promise.resolve();
      })
      .then(() => {
        // route to arenas screen after sign in
        this.transitionToRoute('arenas');
      });
    }
  }
});
