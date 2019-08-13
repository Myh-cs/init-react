
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US.js';
import { connect } from 'react-redux';
addLocaleData([...zh, ...en]);

const Locale = ({ locale, localeMessage, children }) => {
  return (
    <IntlProvider key={locale} locale={locale} messages={localeMessage} >
      {children}
    </IntlProvider>
  )
}
const chooseLocale = (val) => {
  let _val = val || navigator.language.split('_')[0];
  switch (_val) {
    case 'en':
      return en_US;
    case 'zh':
      return zh_CN;
    default:
      return en_US;
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale.language,
  localeMessage: chooseLocale(state.locale.language)
});

export default connect(mapStateToProps)(Locale);