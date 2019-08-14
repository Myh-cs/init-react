import React from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

const App = () => (
  <div>
    
    <FormattedMessage id="hello" tagName="h2" />
    <FormattedMessage id='hello'>
      {(txt) => (
        <input type="button" value={txt} />
      )}
    </FormattedMessage>
  </div>
)
App.prototype={
  intl:intlShape.isRequired
}

const mapStateToProps = () =>({
});

export default connect(mapStateToProps)(injectIntl(App));
