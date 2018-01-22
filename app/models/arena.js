import DS from 'ember-data';

export default DS.Model.extend({
  aid: DS.attr('string'),
  arenaname: DS.attr('string'),
  joinedusers: DS.attr()
});
