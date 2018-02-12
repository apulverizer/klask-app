import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  actions: {
    signIn: function(provider) {
      var self = this;
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        // do something with data.currentUser
        let users = self.get('store').query('user', {
          orderBy: 'uid',
          equalTo: data.currentUser.uid
        }).then(function(users){
          // check if user already exists
          // if not, then create a new user
          if (users.get('length') < 1){
              let newUser = self.get('store').createRecord('user', {
                arenasjoined: null,
                nickname: null,
                email: data.currentUser.email,
                name: data.currentUser.displayName,
                photourl: data.currentUser.photoURL,
                uid: data.currentUser.uid
              });
              newUser.save().then(function(){
                self.transitionToRoute('arenas');
              }).catch(function(error){
                console.log(error);
              })
          }
          else {
            self.transitionToRoute('arenas');
          }
        });
      });
    }
  }
});
