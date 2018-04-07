import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  user: null,
  tagName: 'li',
  userRanked: null,
  displayStat: 'Win %',
  classNames: ['mdl-list__item mdl-list__item--two-line mdl-js-ripple-effect'],
  store: inject(),
  session: inject(),
  actions: {
    viewProfile() {
      console.log("Not Implemented");
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
