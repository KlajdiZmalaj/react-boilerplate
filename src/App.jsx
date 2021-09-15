import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';


//routes import
// import {Home} from 'routes';

import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { messages as enMessages } from 'locales/en/messages.js';
import { messages as itMessages } from 'locales/it/messages.js';

const messages = {
  en: enMessages,
  it: itMessages,
};

const App = ({
  language,
}) => {
  useEffect(() => {
    i18n.load(language, messages[language || 'en']);
    i18n.activate(language);
  }, [language]);

  useEffect(() => {

  }, []);

  return (
    <I18nProvider
      i18n={i18n}
      language={language}
      forceRenderOnLocaleChange={false}
    >
      <HashRouter>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact render={() => <div>home</div>} />

          <Route render={() => <div>Page not found</div>} />
        </Switch>
        {/* <Footer /> */}
      </HashRouter>
    </I18nProvider>
  );
};


const mapStateToProps = ({ }) => null;

export default connect(null, {})(App);
