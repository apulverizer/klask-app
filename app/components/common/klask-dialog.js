import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    submitText: "Submit",
    cancelText: "Cancel",
    mainText: undefined,
    subText: undefined,
    showSubmitButton: true,
    showCancelButton: true,
    showSubText: true
});
