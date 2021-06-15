import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { getStore } from './redux';

const store = getStore();

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
