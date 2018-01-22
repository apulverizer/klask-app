import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'ul',
  classNames: ['demo-list-two mdl-list'],
  store: inject(),
  
});
