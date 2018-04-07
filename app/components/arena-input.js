import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
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
