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
      localStorage.setItem('arenaId', arenaId);
      this.transitionToRoute('standings');
    },
    joinNewArena(arenaName) {
      var arenaid = null;
      this.getArenas(arenaName)
      .then((arenas) => {
        // if there is a matching arena
        if (arenas.get('length') === 1){
          // we need to add the user the list of joined arenas
          var arena = arenas.objectAt(0);
          arenaid = arena.get('aid');
          let joinedUsers = arena.get('joinedusers') || [];
          if (joinedUsers.indexOf(this.get('session.currentUser.uid')) === -1){
            joinedUsers.push(this.get('session.currentUser.uid'));
            arena.set('joinedusers', joinedUsers);
            return arena.save();
          }
          return Promise.resolve();
        }
        return Promise.reject("Invalid Arena");
      })
      .then(() => {
        // get the current user
        return this.get('store').query('user',{
          orderBy: 'uid',
          equalTo: this.get('session.currentUser.uid')
        })
      })
      .then((users) => {
        // check if user is part of the arena already
        // if not, then append the arena id to the users profile.arenasjoined
        let user = users.objectAt(0);
        let existingArenas = user.get('arenasjoined') || [];
        if (existingArenas.indexOf(arenaid) === -1){
          existingArenas.push(arenaid);
          user.set('arenasjoined', existingArenas);
          // update the user
          return user.save();
        }
        // already part of arena so it's fine
        return Promise.resolve();
      })
      .then(() => {
        // set the arena id in local storage
        localStorage.setItem('arenaId', arenaid);
        // transistion to standings
        this.transitionToRoute('standings');
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
    }
  }
});
