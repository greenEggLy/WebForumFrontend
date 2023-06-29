import {BrowserRouter} from "react-router-dom";

import {RootRouter} from "./RootRouter.tsx";
import {Provider} from "react-redux";
import {store} from './app/store';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<RootRouter/>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
