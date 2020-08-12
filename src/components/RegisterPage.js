import React, { Component } from 'react';
var jwt = require('jwt-simple');
const API_KEY = process.env.REACT_APP_API_KEY;

class RegisterPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            password:'',
            confirmpassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
        
    };
    
    handleSubmit(event) {
        const {password, confirmpassword } = this.state;
        var payload = { 'password': this.state.password };
        var secret = API_KEY;
        // encode
        var token = jwt.encode(payload, secret);
        localStorage.setItem('User', token);
        if(password === confirmpassword){
            this.props.history.push('/LoginPage');
            console.log("success");
        }
        else{
           prompt("password doesnot match");
        }
        event.preventDefault();
    };

   
    render() { 
        //const {password, confirmpassword } = this.state;
        return ( 
            <div>
                <div className="card">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Register Page</h2> 
                        <label>Password</label> <br/>
                        <input 
                        type="password" 
                        placeholder="enter the password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        required/> <br/>
                        <label>Confirm Password</label> <br/>
                        <input 
                        type="password"  
                        name="confirmpassword" 
                        value={this.state.confirmpassword}
                        onChange={this.handleChange} 
                        required/> <br/>
                       
                        <button type="submit"> Register</button>
                    </form>
                </div>
            </div>
        );
};
}
 
export default RegisterPage;
