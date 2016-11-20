import React from 'react';

const Submit = ({submitUrl, onClick}) => (
    <div>
        <h1>I declare that:</h1>
        <ol>
            <li>To the best of my knowledge the answers submitted are correct.</li>
            <li>I understand that the information will be used to access my organisations ability to be invited to join
                the Digital Service Panel.
            </li>
            <li>I understand that the DTO may reject this application if there is a failure to answer all relevant
                questions fully or provide false or misleading information.
            </li>
            <li>There are no petitions, claims, actions, judgements or decisions which may adversly affect the companies
                performance.
            </li>
        </ol>
        <p>
            <a role="button" href={submitUrl}>Submit Application</a>
        </p>
    </div>
);

Submit.defaultProps = {
    onClick: () => {
    },
    submitUrl: '#'
}

Submit.propTypes = {
    submitUrl: React.PropTypes.string,
    onClick: React.PropTypes.func
};

export default Submit;