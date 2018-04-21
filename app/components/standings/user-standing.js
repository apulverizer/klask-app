import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  user: null,
  tagName: 'li',
  userRanked: null,
  router: inject(),
  displayStat: 'Win %',
  classNames: ['mdl-list__item mdl-list__item--two-line mdl-js-ripple-effect'],
  store: inject(),
  session: inject(),
  actions: {
    viewProfile() {
      this.get('router').transitionTo('profile', {queryParams: {userId: this.get('userRanked.user.uid')}});
    },
    showLoseDialog() {
      this.toggleProperty('loseDialog');
    },
    showWinDialog() {
      this.toggleProperty('winDialog');
    },
    closeLoseDialog() {
      this.toggleProperty('loseDialog');
    },
    closeWinDialog() {
      this.toggleProperty('winDialog');
    }
  }
});
