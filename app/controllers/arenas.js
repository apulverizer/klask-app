import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  session: inject(),
  actions:{
    selectExistingArena(arenaId) {
      console.log("message", arenaId);
      this.transitionToRoute('standings');
    },
    joinNewArena(arenaName) {
      console.log(arenaName);
      var parentThis = this;
      let arenas = this.get('store').query('arena', {
        orderBy: 'arenaname',
        equalTo: arenaName
      }).then(function(arenas){
        if (arenas.get('length') === 1){
          let user = parentThis.get('store').query('user',{
            orderBy: 'uid',
            equalTo: parentThis.get('session.currentUser.uid')
          }).then(function(users){
            let user = users.objectAt(0);
            let existingArenas = user.get('arenasjoined') || [];
            let arenaid = arenas.objectAt(0).get('aid');
            if (existingArenas.indexOf(arenaid) === -1){
              existingArenas.push(arenaid);
              user.set('arenasjoined', existingArenas);
              user.save();
            }
          });
        }
      });
    }
  }
});
