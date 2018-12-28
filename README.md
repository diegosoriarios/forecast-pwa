# React PWA
Esse projeto froi criado com [Create React App](https://github.com/facebook/create-react-app).
Create React App já tras tudo praticamente pronto para fazer um pwa.
- Service Worker
- Manifest

Mas o service worker não vem funcionando, para fazer funcionar só precisamos alterar nosso arquivo '/src/index.js' para:
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
```