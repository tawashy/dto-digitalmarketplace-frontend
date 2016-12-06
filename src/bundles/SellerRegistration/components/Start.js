import React from 'react';

const Start = ({ signup, onClick }) => (
  <div>
    <h1>Joining the Marketplace</h1>
    <p>Before you can join the Marketplace we need to know more about your business.</p>
    <p>The information you share will be used to evaluate your business and build your seller profile.</p>
    <p>
      If your skills and experience meet the <a href="/evaluation-criteria">evaluation criteria</a> you’ll be able to 
      join our panel and be given a presence in the Marketplace. This means buyers can find you and you can respond to 
      opportunities.
    </p>
    <h2>You’ll need</h2>
    <ul>
      <li>Case studies</li>
      <li>References</li>
      <li>Financial viability statement</li>
      <li>Proof of worker’s compensation insurance and public liability insurance</li>
    </ul>
    <p>This application takes about <strong>30 minutes</strong> to complete.</p>
    <p>Your progress saves automatically, so you can continue later.</p>
    <p>
      <a role="button" href={signup} onClick={onClick}>Start Now </a>
    </p>
  </div>
);

Start.defaultProps = {
  onClick: () => {},
  signup: '#'
}

Start.propTypes = {
  signup: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Start;