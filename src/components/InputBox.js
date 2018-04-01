import React from "react";

import {
    Form,
    FormGroup,
    FormControl,
    InputGroup
} from "react-bootstrap";

class InputBox extends React.Component
{

    render()
    {
        return (
            <Form>
                <InputGroup bsSize="large">
                    <FormControl
                        type="text"
                        value={this.props.username}
                        onChange={this.props.onChange} placeholder="Username" />
                </InputGroup>
            </Form >
        );    
    }
    
}

export default InputBox;