import DS from 'ember-data';

export default DS.Model.extend({
  aid: DS.attr(),
  arenaname: DS.attr(),
  joinedusers: DS.attr()
});
