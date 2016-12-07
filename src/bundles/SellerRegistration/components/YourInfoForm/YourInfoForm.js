import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { required } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';

class YourInfoForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
  }

  render() {
    const { action, csrf_token, model, form, title, buttonText, children, onSubmit } = this.props;
    return (
      <Layout>
        <header>
          <h1 tabIndex="-1">{title}</h1>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>
          <Form model={model}
            action={action}
            method="post"
            id="yourinfo"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}
            <Textfield
                model={`${model}.contact_name`}
                name="contact_name"
                id="contact_name"
                htmlFor="contact_name"
                label="Primary contact"
                description="This person may be contacted by government buyers and receive new opportunities by email."
                validators={{ required }}
                messages={{
                    required: 'Primary contact is required',
                }}
            />

            <Textfield
                model={`${model}.contact_phone`}
                name="contact_phone"
                id="contact_phone"
                htmlFor="contact_phone"
                label="Phone"
                validators={{ required }}
                messages={{
                    required: 'Primary contact phone is required',
                }}
            />

            <Textfield
                model={`${model}.contact_email`}
                name="contact_email"
                id="contact_email"
                htmlFor="contact_email"
                label="Email"
                validators={{ required }}
                messages={{
                    required: 'Primary contact email is required',
                }}
            />

            <Textfield
              model={`${model}.representative`}
              name="representative"
              id="representative"
              htmlFor="representative"
              label="Authorised Representative"
              description="This person must be authorised to enter into contracts on behalf of the business. It can be the same person as your primary contact."
              validators={{ required }}
              messages={{
                required: 'Authorised representative is required',
              }}
            />

            <Textfield
              model={`${model}.phone`}
              name="phone"
              id="phone"
              htmlFor="phone"
              label="Phone"
              validators={{ required }}
              messages={{
                required: 'Authorised representative\'s phone number is required',
              }}
            />

            <Textfield
              model={`${model}.email`}
              name="email"
              id="email"
              htmlFor="email"
              label="Email"
              validators={{ required }}
              messages={{
                required: 'Authorised representative\'s email is required',
              }}
            />



            {children}

            <input type="submit" value={buttonText} role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

YourInfoForm.defaultProps = {
  buttonText: 'Save and continue',
  title: 'Add your contact details'
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'yourInfoForm')
  }
}

export {
  Textfield,
  mapStateToProps,
  YourInfoForm as Form
}

export default connect(mapStateToProps)(YourInfoForm);
