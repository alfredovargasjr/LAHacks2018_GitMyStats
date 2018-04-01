import React from "react";

import NavBar from "./navigation/NavBar";
import Routes from "./navigation/Routes";

const App = () => (
	<div>

		<NavBar/>

		<div style={{marginTop: "75px"}} id="routeContainer">
			<Routes/>
		</div>
	</div>
);

export default App;
