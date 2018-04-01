import React from "react";
import { FormGroup, Checkbox, FormControl, Button } from "react-bootstrap";

class Feedback extends React.Component {
    state = {
    	text: { value: "", validation: null },
    	honeyPot: "",
    	isAnon: false,
    	email: "",
    	submitted: false
    }

    onSubmitButton() {
    	if (this.state.text.value.length > 0 && this.state.honeyPot === "") {
    		fetch("https://api.kennydo.com/feedback", {
    			method: "POST",
    			headers: {
    				"Accept": "application/json",
    				"Content-Type": "application/json"
    			},
    			body: JSON.stringify({
    				text: this.state.text
    			})
    		});
    		this.setState({ submitted: true });
    	}
    }

    render() {
    	if (this.state.submitted) {
    		return (
    			<p><b>Thank you for the submission.</b></p>
    		);
    	}
    	return (
    		<div>
    			<p><b>Or Send an Anonymous Comment</b></p>
    			<form target="frame" action="/redirect" onSubmit={() => this.onSubmitButton()}>
    				<FormGroup controlId="text" validationState={this.state.text.validation}>
    					{/* <Checkbox onChange={(e) => this.setState({ isAnon: e.target.checked, email: "" })}>
                        Anonymous
                    </Checkbox>
                    {
                        !this.state.isAnon &&
                            <FormControl type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>

                    } */}
    					<textarea value={this.state.text.value} onChange={(e) => this.setState({ text: { value: e.target.value, validation: e.target.value === "" ? "error" : "success" } })} className="form-control"></textarea>
    				</FormGroup>
					<div style={{ display: "none" }}>
    					<label>Keep this field blank</label>
						<input value={this.state.honeyPot.value} onChange={(e) => this.setState({ honeyPot: e.target.value })} type="text" />
    				</div>
    				<Button style={{ marginTop: "7px", float: "right" }} type="submit">Submit</Button>

    			</form>
    			<iframe style={{ display: "none" }} name="frame"></iframe>
    		</div>
    	);
    }
}

export default Feedback;
