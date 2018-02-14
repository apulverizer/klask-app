import Component from '@ember/component';

export default Component.extend({
    tagName: 'div',
    classNames: ['fab'],
    classNameBindings: ['speedDialOpen'],
    speedDialOpen: false,
    loseDialog: false,
    winDialog: false,
    actions: {
        toggleSpeedDial() {
          this.toggleProperty('isSpeedDialOpen');
          this.toggleProperty('speedDialOpen');
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
