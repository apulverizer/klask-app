import DS from 'ember-data';

export default DS.Model.extend({
  arenasjoined: DS.attr(),
  email: DS.attr(),
  name: DS.attr(),
  nickname: DS.attr(),
  photourl: DS.attr(),
  uid: DS.attr()
});
