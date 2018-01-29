import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  session: inject(),
  getArenas(arenaName){
    return this.get('store').query('arena', {
      orderBy: 'arenaname',
      equalTo: arenaName
    });
  },
  actions:{
    selectExistingArena(arenaId) {
      console.log("message", arenaId);
      localStorage.setItem('arenaId', arenaId);
      this.transitionToRoute('standings');
    },
    joinNewArena(arenaName) {
      console.log(arenaName);
      var parentThis = this;
      this.getArenas(arenaName)
      .then(function(arenas){
        // if there is a matching arena
        if (arenas.get('length') === 1){
          // we need to add the user the list of joined arenas
          var arena = arenas.objectAt(0);
          let joinedUsers = arena.get('joinedusers') || [];
          if (joinedUsers.indexOf(parentThis.get('session.currentUser.uid')) === -1){
            joinedUsers.push(parentThis.get('session.currentUser.uid'));
            arena.set('joinedusers', joinedUsers);
            arena.save();
          }
          // get the current user
          let user = parentThis.get('store').query('user',{
            orderBy: 'uid',
            equalTo: parentThis.get('session.currentUser.uid')
          })
          // check if user is part of the arena already
          // if not, then append the arena id to the users profile.arenasjoined
          .then(function(users){
            let user = users.objectAt(0);
            let existingArenas = user.get('arenasjoined') || [];
            let arenaid = arenas.objectAt(0).get('aid');
            if (existingArenas.indexOf(arenaid) === -1){
              existingArenas.push(arenaid);
              user.set('arenasjoined', existingArenas);
              user.save();
              localStorage.setItem('arenaId', arenaid);
              // transistion to standings
              parentThis.transitionToRoute('standings');
            }
          });
        }
      });
    }
  }
});
