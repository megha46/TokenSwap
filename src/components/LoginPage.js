import React, { Component } from 'react';
import Auth from '../components/Auth';

var jwt = require('jwt-simple');
 
class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            loginpassword:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    };
    
    handleSubmit(e) {
        const {loginpassword } = this.state;
       
        var payload = { 'password': this.state.loginpassword };
        var secret = ('abc');
        // encode
        var Logintoken = jwt.encode(payload, secret);
        localStorage.setItem('LUser', Logintoken);
        const GetPswd = localStorage.getItem('User');
        if( GetPswd === Logintoken) {
            Auth.authenticate();
            this.props.history.push('/Dashboard');
            console.log("login success");
        }
        else{
            prompt("invalid password");
        }
        e.preventDefault();
    };

    authenticateloginform(e) {
        const registeredpassword = localStorage.getItem('password');
        const { loginpassword } = this.state;
        if( registeredpassword === loginpassword){
            prompt("Successfull");
        }
        e.preventDefault();
    }

    render() { 
        const {password, confirmpassword } = this.state;
        return ( 
            <div>
                <div className="card">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Login Page</h2> 
                        <label>Login Password</label> <br/>
                        <input type="password" placeholder="enter the password" name="loginpassword" value={this.state.loginpassword} onChange={this.handleChange} required/> <br/>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
};
}
 
export default LoginPage;