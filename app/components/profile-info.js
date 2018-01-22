import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',
  classNames: ['mdl-list__item', 'mdl-list__item--two-line'],
  name: null,
  nickname: null,
  rank: null,
  image: null
});
