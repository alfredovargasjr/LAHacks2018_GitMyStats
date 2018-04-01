import React from "react";
import { Jumbotron, Button, Grid } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

class Redirect extends React.Component {
	render() {
		return (
			<Grid>
				<Jumbotron>
					<h1>Thanks</h1>
					<p>
                        Thank you for your comments and feedback
					</p>
					<p>
						<LinkContainer to="/">
							<Button bsStyle="primary">Go Back</Button>
						</LinkContainer>
					</p>
				</Jumbotron>
			</Grid>
		);
	}
}
export default Redirect;
