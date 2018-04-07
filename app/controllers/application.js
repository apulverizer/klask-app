import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  session: inject(),
  actions: {
    signIn: function(provider) {
      var self = this;
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        // query for the user by id
        return self.get('store').query('user', {
          orderBy: 'uid',
          equalTo: data.currentUser.uid
        })
      })
      .then(function(users){
        // check if user already exists
        // if not, then create a new user
        if (users.get('length') < 1){
          let newUser = self.get('store').createRecord('user', {
            arenasjoined: null,
            nickname: null,
            email: self.get('session.currentUser.email'),
            name: self.get('session.currentUser.displayName'),
            photourl: self.get('session.currentUser.photoURL'),
            uid: self.get('session.currentUser.uid')
          });
          return newUser.save();
        }
        // no need to add user, return resolved promise
        return Promise.resolve();
      })
      .then(function(){
        // route to arenas screen after sign in
        self.transitionToRoute('arenas');
      });
    }
  }
});
