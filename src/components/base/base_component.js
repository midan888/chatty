import { Component } from 'react';

class BaseComponent extends Component {

    constructor(props){
        super(props);
    }

    /**
     * Form error messages
     * @param field
     * @returns {*}
     */
    getErrorMessage(field) {

        if (this.state.errorMessages == null) {
            return '';
        }

        for (var i=0; i<this.state.errorMessages.length; i++) {
            if (this.state.errorMessages[i].field == field) {
                return this.state.errorMessages[i].message;
            }
        }
    }
}

export default BaseComponent;
