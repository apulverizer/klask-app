import DS from 'ember-data';

export default DS.Model.extend({
  arenaid: DS.attr('string'),
  datetime: DS.attr('number'),
  player1id: DS.attr('string'),
  player2id: DS.attr('string'),
  player1score: DS.attr('number'),
  player2score: DS.attr('number')
});
