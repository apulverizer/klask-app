import Component from '@ember/component';
import { isEmpty } from '@ember/utils';

export default Component.extend({
    name: null,
    disabled: true,
    actions: {
        textChanged(text){
            this.set('name', text);
            this.set('disabled',isEmpty(this.get('name')));
        }
    }
});
