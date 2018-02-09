import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    signIn: function(provider) {
      var parent_this = this;
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        // do something with data.currentUser
        parent_this.transitionToRoute('arenas');
      });
    }
  }
});
