import React from 'react';
import { reduxForm } from 'redux-form';
import BaseComponent from '../base/base_component';
import { setNickname } from '../../actions/user_actions';

class NicknameForm extends BaseComponent {

    constructor() {
        super();

        this.state = {
            nickname: '',
            loading:false,
            errorMessages: []
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    render(){

        const {fields: {nickname}, handleSubmit} = this.props;

        return (
            <div className="row">
                <form className="form-horizontal" onSubmit={handleSubmit(this.onFormSubmit)}>
                    <div className={`form-group ${nickname.touched && nickname.error ? ' has-error' : ''}`}>
                        <label className="col-xs-2 control-label">Nickname</label>
                        <div className="col-xs-9">
                            <input
                                type="text"
                                placeholder="midan888"
                                className="form-control"
                                {...nickname}
                            />
                            <div className="text-help has-error">
                                {nickname.touched && nickname.error}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">Set your nickname</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    onFormSubmit(formData) {

        this.props.setNickname(formData.nickname).then(() => {
            this.props.onNickNameSet();
        });
    }
}

function validateForm(values) {

    const errors = {};

    if (!values.nickname) {
        errors.nickname = 'Enter a title';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        userData: state.user.data
    }
}

export default reduxForm({
    form: 'NicknameForm',
    fields: ['nickname'],
    validate:validateForm
}, mapStateToProps, { setNickname } )(NicknameForm);
