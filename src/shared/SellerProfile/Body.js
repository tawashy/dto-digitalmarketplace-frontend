import React from 'react';

const Row = ({ title, children, show }) => {
  if (!show) {
    return null;
  }

    return (
        <span>
            <hr/>
            <br/>
            <div className="row seller-profile__row">
              <div className="col-sm-3"><b>{title}</b></div>
              <div className="col-sm-8 col-sm-push-1">{children}</div>
            </div>
            <br/>
        </span>
    )
}

const Body = (props) => {
  const {
    evaluated,
    provides,
    case_studies = {},
      contact_name,
      contact_phone,
      contact_email,
    representative,
    email,
    phone,
    website,
    linkedin,
    abn,
    address,
    interstate,
    documents,
    CaseStudyLink,
    documentsUrl
  } = props;
    var documentTitle = {
            "financial":"Financial Statement",
            "liability":"Public Liability Insurance",
            "workers":"Workers Compensation Insurance"
    }
  return (
    <article className="seller-profile">
      <Row title="Evaluated for" show={evaluated}>
        <div className="seller-profile__evaluated-badges">
          {/*Object.keys(evaluated).map((service, i) => (
            <span key={i}>{service}</span>
          ))*/}
        </div>
      </Row>

      <Row title="Provides" show={provides}>
        <div className="seller-profile__provides-badges">
          {provides && Object.keys(provides).map((service, i) => (
            <span key={i}>{service}</span>
          ))}
        </div>
      </Row>

      <Row title="Case studies" show={Object.keys(case_studies).length}>
        <ul className="list-vertical">
        {case_studies && Object.keys(case_studies).map((study, i) => {
          const { title, service, client } = case_studies[study];
          return (
            <li key={i}>
              <article>
                {/*
                  CaseStudyLink is a configurable prop.
                  Since it will point to different areas in different flows. 
                */}
                <h3><CaseStudyLink id={study}>{title}</CaseStudyLink></h3>
                <div className="meta">
                  <span>{service}</span>
                </div>
                <p>{client}</p>
              </article>
            </li>
          )
        })}
        </ul>
      </Row>
        <Row title="For opportunities" show={contact_name}>
        <p>
            <b>Contact</b><br/>
            <span>{contact_name}</span>
        </p>
        <p>
            <b>Phone</b><br/>
            <span>{contact_phone}</span>
        </p>
        <p>
            <b>Email</b><br/>
            <a href={`mailto:${contact_email}`}>{contact_email}</a>
        </p>
        </Row>
      <Row title="Company Details" show={true}>
        <b>Business Representative</b><br/>
          <p>
              <span>{representative}</span><br/>
              { email && <span><a href={`mailto:${email}`}>{email}</a><br/></span>}
              { phone && <span>{phone}<br/></span>}
          </p>
        <p></p>

        <b>Website</b><br/>
        <p><a href={website} rel="external" target="_blank">{website}</a></p>

          { linkedin &&<span><b>Linkedin Profile</b><br/>
           <p><a href={linkedin} rel="external">{linkedin}</a></p></span> }

        <b>Main Address</b><br/>
        <p>
          <span>{address && address.address_line}{address && address.addressLine}</span><br/>
          <span>{address && address.suburb}</span><br/>
          <span>{address && address.state} {address && address.postal_code}</span>
        </p>
          { interstate && <p><b>This seller is able work interstate</b></p>}
        <b>ABN</b><br/>
        <p>{abn}</p>
      </Row>
      <Row title="Documents" show={documents && Object.keys(documents).length}>
          {documents && Object.keys(documents).map((key, val) =>
              <p key={val}>

                  <a href={`${documentsUrl}${documents[key]}`}>{documentTitle[key]}</a><br/>
              </p>
          )}
      </Row>
    </article>
  )
};

Body.propTypes = {
  evaluated: React.PropTypes.object,
  provides: React.PropTypes.object,
  documents: React.PropTypes.object,
  case_studies: React.PropTypes.object,
  representative: React.PropTypes.string,
  email: React.PropTypes.string,
  phone: React.PropTypes.string,
  website: React.PropTypes.string,
  linkedin: React.PropTypes.string,
  abn: React.PropTypes.string,
  interstate: React.PropTypes.bool,
  address: React.PropTypes.shape({
    address_line: React.PropTypes.string,
    suburb: React.PropTypes.string,
    state: React.PropTypes.string,
    postalCode: React.PropTypes.string
  }),
  CaseStudyLink: React.PropTypes.func,
  documentsUrl: React.PropTypes.string,
  contact_email: React.PropTypes.string,
  contact_phone: React.PropTypes.string,
  contact_name: React.PropTypes.string,
};

export default Body;