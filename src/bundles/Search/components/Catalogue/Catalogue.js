import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';
import isEmpty from 'lodash/isEmpty';
import {Link} from 'react-router-dom';

import Card         from '../../../../shared/Card';
import CheckboxList from '../../../../shared/CheckboxList';
import Icon         from '../../../../shared/Icon';
import LocalNav     from '../../../../shared/LocalNav';

import Pagination from '../Pagination';

import {actionCreators as actions} from '../../redux/modules/search';
import {actionCreators as paginationActions} from '../../redux/modules/pagination';

import './Catalogue.css';

export class Catalogue extends React.Component {

  render() {
    const {actions, search = {}, pagination = {}} = this.props;
    const cards = search.view === 'sellers' ? search.results : search[search.view];
    let nullCaseStudies = search['casestudies'] === null && search.view === 'casestudies';
    let returnOnSignInURL = buildNextURL(search);

    return (
      <section>
        <form onSubmit={e => e.preventDefault()}>
          <article className="row">
            <div className="col-xs-12 col-sm-4">
              <h1 styleName="heading">Seller catalogue</h1>
            </div>
            <div className="col-xs-12 col-sm-8" styleName="autocomplete">
              <article styleName="keyword-search">
                <article className="col-xs-10">
                  <label htmlFor="keyword" className="visually-hidden">
                    Search by company name, role you need or the outcome you are after
                  </label>
                  <Autocomplete
                    value={search.keyword || ''}
                    inputProps={{
                      name: 'keyword',
                      id: 'keyword',
                      placeholder: 'Search'
                    }}
                    items={search.results.slice(0, 10)}
                    getItemValue={({title}) => title}
                    onSelect={(value, item) => actions.updateKeyword(value)}
                    onChange={(e, value) => actions.updateKeyword(value)}
                    renderItem={(item, isHighlighted) => (
                      <div
                        styleName={isHighlighted ? 'autocompleteItemHighlighted' : 'autocompleteItem' }
                        key={item.abbr}
                        id={item.abbr}
                      >{item.title}</div>
                    )}
                    renderMenu={(items, value, style) => {
                      //return <span/>;
                      // renderMenu can't return null, internals of Autocomplete
                      // call clone on this result. Empty span will have to do.
                      if (!value || items.length === 0) {
                        return <span/>;
                      }

                      return (
                        <div styleName="autocompleteMenu"
                             style={{...style, position: 'absolute', display: 'none', left: 0, top: '53px'}}>
                          {items}
                        </div>
                      )
                    }}
                  />
                </article>
                <article className="col-xs-2">
                  <button type="submit" value="" style={{border: 'none', backgroundColor: '#18788d', color: '#fff'}}>
                    <Icon value="search" size={22}/>
                  </button>
                </article>
              </article>
            </div>
          </article>
          <article className="row">
            <section className="col-xs-12 col-sm-4">
              <h4 className="local-nav-heading">Filter your results</h4>
              <LocalNav navClassName="filter-navigation" text="Filter your results">
                { search.view !== "products" &&
                <div>
                  <a href="/services" styleName="learn-services-link">Learn more about these services</a>
                  <CheckboxList
                    id="role"
                    list={search.role}
                    onChange={actions.updateRole}
                  />
                  <hr/>
                </div>
                }
                <div styleName={search.view === 'products' ? 'product-type-checkbox' : 'typecheckbox'}>
                  <CheckboxList
                    id="type"
                    list={search.type}
                    onChange={actions.updateType}
                  />
                </div>
              </LocalNav>
            </section>
            <div className="col-xs-12 col-sm-8">
              {search.error ? (
                <article styleName={search.querying ? 'fadeOut' : 'fadeIn'}>
                  <h2>Something went wrong!</h2>
                  <p><Link to="/" onClick={(e) => {
                    e.preventDefault();
                    actions.resetQuery();
                  }}>Reset and try again</Link>.</p>
                </article>
              ) : (
                <div>
                  <article styleName="filters" className="row">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12">
                        <Link
                          to={{search: 'view=sellers'}}
                          onClick={(e) => {
                            e.preventDefault();

                            if (pagination.page !== 1) {
                              actions.updatePage(1);
                            }

                            actions.updateView('sellers');
                          }}
                          styleName={`${search.view === 'sellers' ? 'active-filter' : ''} filter`}>
                          <span>{pagination['sellers'].total}</span>Sellers
                        </Link>
                        <Link
                          to={{search: 'view=products'}}
                          onClick={(e) => {
                            e.preventDefault();

                            if (pagination.page !== 1) {
                              actions.updatePage(1);
                            }

                            actions.updateView('products');
                          }}
                          styleName={`${search.view === 'products' ? 'active-filter' : ''} filter`}>
                          <span>{pagination['products'].total}</span>Products
                        </Link>
                        <Link
                          to={{search: 'view=casestudies'}}
                          onClick={(e) => {
                            e.preventDefault();

                            if (pagination.page !== 1) {
                              actions.updatePage(1);
                            }

                            actions.updateView('casestudies');
                          }}
                          styleName={`${search.view === 'casestudies' ? 'active-filter' : ''} filter`}>
                          <span>{pagination['casestudies'].total}</span>Case Studies
                        </Link>
                      </div>
                    </div>
                    <hr/>
                  </article>
                  {(search.view === 'casestudies' && search.user_role === 'supplier') ? (
                    <div className="callout--info">
                      Only registered government buyers can view sellers’ case studies.
                    </div>
                  ) :
                    (search.view === 'casestudies' && search.user_role === null) ? (
                      <div styleName="case-study-signup">
                        <div>
                          <a href={returnOnSignInURL}>
                            Sign in
                          </a> with your buyer account to search seller case studies.
                        </div>
                        <div>
                          New to the Marketplace? <a href="/signup">Create your account.</a>
                        </div>
                      </div>
                    ) :
                    (isEmpty(cards) && pagination.casestudies.total === 0) ? (
                    <article styleName={search.querying ? 'fadeOut' : 'fadeIn'}>
                      <h2>No exact matches</h2>
                      <p>Try tweaking your search criteria for more results or <Link to="/" onClick={(e) => {
                        e.preventDefault();
                        actions.resetQuery();
                      }}>clear all and start again</Link>.</p>
                    </article>
                  ) :
                    (
                      <article>
                        {(search.view === 'casestudies' && search.user_role === null) ?
                          (<div styleName="case-study-signup">
                            <div>
                              <a href={returnOnSignInURL}>
                                Sign in
                              </a> with your buyer account to search seller case studies.
                            </div>
                            <div>
                              New to the Marketplace? <a href="/signup">Create your account.</a>
                            </div>
                          </div>) :

                          <div>
                            {(!nullCaseStudies && typeof cards !== 'undefined') &&
                            cards.map((result, i) => (
                              <Card
                                {...result}
                                view={search.view}
                                key={i}
                              />
                            ))
                            }
                          </div>
                        }
                      </article>)}

                  {!isEmpty(cards) &&
                  <div>
                    <hr/>
                    <Pagination
                      {...pagination[search.view]}
                      onClick={actions.updatePage}
                      onBack={actions.updatePage}
                      onNext={actions.updatePage}
                    />
                  </div> }
                </div>
              )}
            </div>
          </article>
        </form>
      </section>
    )
  }
};

const buildNextURL = ({role, type, keyword}) => {
  role = role || {};
  type = type || {};
  keyword = ((keyword === '' || typeof keyword === 'undefined' || keyword === null) ?
    '' : '&keyword=' + keyword.replace(/ /g, '&'));

  let baseNextURL = '/login?next=/search/sellers?view=casestudies';
  let roleString = '';
  let typeString = '';

  for(let i=0; i<Object.keys(role).length; i++) {
    if(Object.values(role)[i]) {
      roleString = roleString.concat('&role=',Object.keys(role)[i])
    }
  }

  for(let i=0; i<Object.keys(type).length; i++) {
    if(Object.values(type)[i]) {
      typeString = typeString.concat('&type=',Object.keys(type)[i])
    }
  }
  return baseNextURL.concat(roleString, typeString, keyword).replace(/&/g, '%26')
}

export const mapStateToProps = ({search, pagination}, ownProps) => {
  return {
    search,
    pagination
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...actions, ...paginationActions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
