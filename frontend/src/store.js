import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import translationsObject from 'langs/index'

export default function configureStore(initialState = {}) {
  const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(RootReducer);
    });
  }

  //thêm file ngôn ngữ vào store
  syncTranslationWithStore(store)
  store.dispatch(loadTranslations(translationsObject));
  store.dispatch(setLocale(window.config.LANG)); 
  return { store }
}