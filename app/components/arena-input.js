import Component from '@ember/component';

export default Component.extend({
  actions: {
    selectNewArena: function(arena) {
      console.log(arena);
    }
  },
});
