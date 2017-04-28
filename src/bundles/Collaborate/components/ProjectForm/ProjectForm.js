import React from 'react';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';


import { required, validLinks, validEmail } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import StatefulError from '../../../../shared/form/StatefulError';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';

import formProps    from '../../../../shared/reduxModules/formPropsSelector';

class ProjectForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    model: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]).isRequired,

    formErrors: React.PropTypes.object,
    returnLink: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    mode: React.PropTypes.oneOf(['add', 'edit']),
    csrf_token: React.PropTypes.string,
    serverRender: React.PropTypes.bool
  }

  render() {
    let { 
      action,
      csrf_token,
      model,
      returnLink = null,
      mode,
      form,
      buttonText,
      children,
      onSubmit,
      onSubmitFailed
    } = this.props;

    if (!buttonText) {
      buttonText = mode === 'edit' ? 'Save Changes' : 'Publish Project';
    }

    return (
      <Layout>
        <header>

                <h1 tabIndex="-1" ref="header" aria-describedby="header-description">{mode === 'edit' ? 'Edit' : 'Add'} project</h1>

        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model} />
          <Form model={model}
            action={action}
            method="post"
            id="Project__create"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
          >

            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            <Textfield
              model={`${model}.title`}
              name="title"
              id="title"
              htmlFor="title"
              label="Give your project a title"
              validators={{ required }}
              messages={{
                required: 'Title is required',
              }}
            />

            <Textfield
              model={`${model}.client`}
              name="client"
              id="client"
              htmlFor="client"
              label="Which council was involved?"
              validators={{ required }}
              messages={{
                required: 'Council is required',
              }} />

            <Textfield
              model={`${model}.timeframe`}
              name="timeframe"
              id="timeframe"
              htmlFor="timeframe"
              label="What was the time frame?"
              description="For example, January 2016 — June 2016."
              validators={{ required }}
              messages={{
                required: 'Timeframe is required',
              }}
            />

            <Textfield
                model={`${model}.roles`}
                name="roles"
                id="roles"
                htmlFor="roles"
                label="What role did your business play?"
                description="For example, ran whole project, engaged in discovery activities or responsible for delivery."
                validators={{ required }}
                messages={{
                    required: 'You must specify the your business\' role',
                }} />

            <fieldset>
              <legend>Project stage?</legend>


              <StatefulError
                  model={`${model}.stage`}
                  id="discovery"
                  messages={{
                      required: 'You must provide project stage'
                  }}
              />
              <Control.radio
                model={`${model}.stage`}
                name="stage"
                id="discovery"
                value="Discovery"
                validators={{
                    required
                }}/>
              <label htmlFor="discovery">Discovery

              </label>
              <Control.radio
                  model={`${model}.stage`}
                  name="stage"
                  id="pilot"
                  value="Pilot"
                  validators={{
                      required
                  }}/>
              <label htmlFor="pilot">Alpha/Pilot

              </label>
              
              <Control.radio
                  model={`${model}.stage`}
                  name="stage"
                  id="live"
                  value="Live"
                  validators={{
                      required
                  }}/>
              <label htmlFor="live">Live/Operational

              </label>
            </fieldset>

            <fieldset>
              <legend>Council service?</legend>


              <StatefulError
                  model={`${model}.service`}
                  id="animal"
                  messages={{
                      required: 'You must provide project service'
                  }}
              />
              <Control.radio
                  model={`${model}.service`}
                  name="service"
                  id="animal"
                  value="Animal Management"
                  validators={{
                      required
                  }}/>
              <label htmlFor="animal">Animal Management

              </label>

                <Control.radio
                    model={`${model}.service`}
                    name="service"
                    id="planning"
                    value="Planning"
                    validators={{
                        required
                    }}/>
                <label htmlFor="planning">Planning

                </label>

                <Control.radio
                model={`${model}.service`}
                name="service"
                id="community"
                value="Community Services"
                validators={{
                    required
                }}/>
                <label htmlFor="community">Community Services

                </label>

                <Control.radio
                    model={`${model}.service`}
                    name="service"
                    id="roads"
                    value="Roads and parking"
                    validators={{
                        required
                    }}/>
                <label htmlFor="roads">Roads and parking

                </label>

            </fieldset>
            
            <Textarea
              model={`${model}.opportunity`}
              name="opportunity"
              id="opportunity"
              controlProps={{ limit: 200 }}
              label="Outline the Aims"
              description="Describe the project goal and any relevant background information."
              messages={{
                required: 'You must outline the aims'
              }}
              validators={{ required }}
            />

            <Textarea
              model={`${model}.approach`}
              name="approach"
              id="approach"
              controlProps={{ limit: 200 }}
              label="Describe how it ran"
              description="How did your capabilities and methods contribute to achieving the project goals?"
              messages={{
                required: 'You must outline how it ran'
              }}
              validators={{ required }}
            />

            <MultiInput
              id="outcome"
              model={`${model}.outcome`}
              name="outcome"
              htmlFor="outcome"
              label="What was the outcome?"
              controlProps={{ defaultRows: 2 }}
              description="List the key achievements of this project."
              messages={{ required: 'You must provide at least one outcome.' }}
              validators={{ required }}
            />

            <MultiInput
              id="project_links"
              model={`${model}.project_links`}
              name="project_links"
              htmlFor="project_links"
              label="Project links (optional)"
              controlProps={{ defaultRows: 2 }}
              description="Link to any supporting material for your project. This can include a project on your website, project video or the live project. Links must begin with http"
              messages={{ validLinks: 'Links must begin with \'http\'' }}
              validators={{ validLinks }}
            />

            <h3>Referee</h3>

            <Textfield
              model={`${model}.referee_name`}
              name="refereeName"
              id="refereeName"
              htmlFor="refereeName"
              label="Referee's name"
              description="The full name of the best person to contact about your experience."
              validators={{ required }}
              messages={{ required: 'Please provide a referee name.'}}
          />
            
            <Textfield
                model={`${model}.referee_position`}
                name="refereePosition"
                id="refereePosition"
                htmlFor="refereePosition"
                label="Referee's position"
                description="At the time of the project."
                validators={{ required }}
                messages={{ required: 'Please provide a referee position.'}}
            />

            <Textfield
                model={`${model}.referee_email`}
                name="refereeEmail"
                id="refereeEmail"
                htmlFor="refereeEmail"
                label="Referee's email"
                validators={{ required, validEmail }}
                messages={{
                  required: 'Please provide a referee email address.',
                  validEmail: 'Referee email address must be valid'
                }}
            />

            <div>
              <StatefulError
                model={`${model}.referee_contact`}
                id="refereeContact"
                messages={{
                  required: 'Please acknowledge the referee can be contacted.'
                }}
              />
              <Control.checkbox
                model={`${model}.referee_contact`}
                id="refereeContact" 
                name="refereeContact"
                validators={{ required }}
              />
              <label htmlFor="refereeContact">I confirm the above information is correct and will be publicly available on the Digital Marketplace
              </label>
            </div>


            {children}

            <input type="submit" value={buttonText} />
          </Form>
          {returnLink}
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { Project = {} } = state;
    let formName = ownProps.formName;
  return {
    returnLink: Project.returnLink,
    ...formProps(state, formName || 'projectForm'),
    ...ownProps
  }
}

export {
  mapStateToProps,
  ProjectForm as Form
}

export default connect(mapStateToProps)(ProjectForm);