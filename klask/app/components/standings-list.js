import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'ul',
  classNames: ['demo-list-two mdl-list'],
  store: inject(),

  init() {
    this._super(...arguments);
    this.get('store').findAll('user').then((users) => {
      this.set('users', users);
    });
  },
});
