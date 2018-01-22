import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  user: null,
  classNames: ['mdl-list__item mdl-list__item--two-line mdl-js-ripple-effect'],
  store: inject(),
  winPercentage: computed('user.name', function(){
    return 75;
  }),
  rank: computed('user.name', function(){
    return 1;
  })
});
