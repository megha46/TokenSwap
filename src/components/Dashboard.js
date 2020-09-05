import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../components/Auth';
import $ from 'jquery'

const API_KEY = process.env.REACT_APP_API_KEY;
var jwt = require('jwt-simple');// jwt token
//current height
var tabsFn = (function() {
  
    function init() {
      setHeight();
    }
    //jquery
    function setHeight() {
      var $tabPane = $('.tab-pane'),
          tabsHeight = $('.nav-tabs').height();
      
      $tabPane.css({
        height: tabsHeight
      });
    }
      
    $(init);
  })();


class Home extends Component {
   
    constructor(props) {

        super(props);
        this.state = { 
            copySuccess: '',//copy to clipboard msg state
            height: props.height,
            width: props.width,
            navigate: false,
            spassword:""
        }
        this.showseed = this.showseed.bind(this);
        this.handleseed = this.handleseed.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('LUser')
        this.setState({ navigate : true})
        Auth.signout();
    }

    //current height of the element
    componentWillMount(){
        console.log("WINDOW : ",window);
        this.setState({height: window.innerHeight + 'px', width:window.innerWidth+'px'});
    }

     //copying the text to clipboard
      copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
      };

        handleseed(event) {
            this.setState({
            [event.target.name] : event.target.value
            });
        };
        //authenticate 
        showseed(e) {
          const { spassword } = this.state;

          const mPassword = localStorage.getItem('User');
          var payload = { 'password': this.state.spassword };
          var secret = API_KEY;
            ;
          // encode
          const showseedtoken = jwt.encode(payload, secret);
          
          if( mPassword === showseedtoken) {
            sessionStorage.setItem('SUser', showseedtoken );
            alert("Here comes the seeed phrase");
          }
          else{
            alert("invalid password");
          }
         e.preventDefault();
        }
       
    render() { 
        const { navigate } = this.state;
       
        if( navigate ){
            return <Redirect  to="/LoginPage" push={true} />
        }
        return ( 
            <div >
                <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                    <a class="navbar-brand" href=""> Token Swap </a>
                    </div>
                    <ul class="nav navbar-nav">
                    <li class="active"><a href="#"> Buy Bitcoin </a></li>
                    <li><a href="#T"> Trading </a></li>
                    <li><a href="#I"> Investments </a></li>
                    <li><a href="#W"> Wallet </a></li>
                    <li><a href="#"><i class="fa fa-bell" aria-hidden="true"></i></a></li>
                    <li class="dropdown" >
                        <a  class="dropdown-toggle" data-toggle="dropdown" href="#">
                            Account <span class="caret"></span>
                        </a>
                        <ul style={{padding: 10 }}class="dropdown-menu">
                       
                            <li><a  data-toggle="modal" data-target="#exampleModalCenter" type="primary">
                            <i class="fa fa-user" ></i> Aliases </a></li>
                       
                            <li><a  data-toggle="modal" data-target="#exampleModalCenters" type="primary"><i class="fa fa-cog"></i> Settings </a></li>
                        
                            <li><a data-toggle="modal" data-target="#exampleModalCentersa" type="primary"><i class="fa fa-cog"></i> Switch Account </a></li>
                            <li><a onClick = { this.logout } ><i class="fa fa-sign-out"></i> Logout </a></li>
                        </ul>
                    </li>
                    </ul>
                </div>
                </nav>
                {/*
                <nav> <marquee direction="right" href="#"> Notifications :) </marquee> </nav>
                */}
                {/* Modal for Aliases, Modal is opened using id attr */}
                <div class="modal fade" id="exampleModalCenter" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Account name</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div >
                                <h3>Your Address</h3>
                                {
                                /* Logical shortcut for only displaying the 
                                    button if the copy command exists */
                                document.queryCommandSupported('copy') &&
                                <div>
                                    <textarea
                                    ref={(textarea) => this.textArea = textarea}
                                    value='3bjK34sniEkH43rkoskafrB4psnWr'
                                    />
                                    <i class="fa fa-copy" onClick={this.copyToClipboard}></i> 
                                    {this.state.copySuccess}
                                </div>
                                } <hr/>
                                <div>
                                    <a href="/">Create One</a>
                                </div> 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" dnata-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
                
                {/* Modal for Setting*/} 
                <div class="modal fade" id="exampleModalCenters"  tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document" >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Setting</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5">

                                            {/* Detting options */}
                                            <ul class="nav nav-tabs">
                                            <li class="active"><a href="#a" data-toggle="tab"><i style={{color: '#333'}}class="fa fa-address-card"></i>General</a></li>
                                            <li><a href="#b" data-toggle="tab"><i style={{color: '#333'}} class="fa fa-shield"> Security </i></a></li>
                                            <li><a href="#c" data-toggle="tab"><i style={{color: '#333'}} class="fa fa-server"></i> Network</a></li>
                                            <li><a href="#d" data-toggle="tab"><i style={{color: '#333'}} class="fa fa-info-circle"></i>Info</a></li>
                                            </ul>
                                            <div class="tab-content">

                                                {/*General tab content with id 'a' */}
                                                <div class="tab-pane active" id="a">
                                                    <h5> </h5>
                                                    <h5>Language &nbsp; &nbsp;<span class="badge pull-right">English<i class="fa fa-caret-down"></i></span></h5><hr/>
                                                    <h5>Current Height &nbsp; &nbsp;<span class="badge pull-right">{this.state.height}</span></h5>                                              
                                                </div>

                                                {/* Security tab content with id 'b' */}
                                                <div class="tab-pane" id="b">
                                                    <ul class="list-group pull-left" >
                                                    <li class="list-group-item">
                                                        {
                                                        document.queryCommandSupported('copy') &&
                                                        <div>
                                                            <h5>Seed Phrase &nbsp; &nbsp;
                                                                <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                            </h5>
                                                            <li class="list-group-item"><a  data-toggle="modal" data-target="#exampleModalCenterd">Show seed phrase</a></li>
                                                            
                                                            {this.state.copySuccess}
                                                        </div>
                                                        } 
                                                    </li>
                                                    <li class="list-group-item">
                                                    
                                                        {
                                                        document.queryCommandSupported('copy') &&
                                                        <div>
                                                            <h5> Encoded Seed Phrase &nbsp; &nbsp;
                                                                <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                            </h5>
                                                            <li class="list-group-item"><a  data-toggle="modal" data-target="#exampleModalCenterd">Show Encoded seed phrase</a></li>
                                                            {this.state.copySuccess}
                                                        </div>
                                                        } 
                                                    </li>
                                                    <li class="list-group-item">       
                                                        {
                                                        document.queryCommandSupported('copy') &&
                                                        <div>
                                                            <h5> Private key  &nbsp; &nbsp;
                                                                <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                            </h5>
                                                            <li class="list-group-item"><a  data-toggle="modal" data-target="#exampleModalCenterd">Show Private Key</a></li>
                                                            {this.state.copySuccess}
                                                        </div>
                                                        } 
                                                    </li>
                                                    <li class="list-group-item">  
                                                        {
                                                        document.queryCommandSupported('copy') &&
                                                        <div>
                                                            <h5>  Access Token  &nbsp; &nbsp;
                                                                <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                            </h5>
                                                            <li class="list-group-item"><a  data-toggle="modal" data-target="#exampleModalCenterd">Show </a></li>
                                                            {this.state.copySuccess}
                                                        </div>
                                                        } 
                                                    </li>
                                                    <li class="list-group-item">     
                                                        {
                                                        document.queryCommandSupported('copy') &&
                                                        <div>
                                                            <h5>  Refresh Token   &nbsp; &nbsp;
                                                                <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                            </h5>
                                                            <textarea
                                                                ref={(textarea) => this.textArea = textarea}
                                                                value="show"
                                                            > <button oclick="value"> show </button></textarea>
                                                            {this.state.copySuccess}
                                                        </div>
                                                        } 
                                                    </li>
                                                    </ul>
                                                </div>

                                                {/* Network tab content with id 'c' */}
                                                <div class="tab-pane" id="c">
                                                    <ul class="list-group pull-left">
                                                        <li class="list-group-item">
                                                            {
                                                            document.queryCommandSupported('copy') &&
                                                            <div>
                                                                <h5>Node address &nbsp; &nbsp;
                                                                    <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                                </h5>
                                                                <textarea
                                                                ref={(textarea) => this.textArea = textarea}
                                                                value='https://nodes.TokenSwap.exchange'
                                                                />
                                                                {this.state.copySuccess}
                                                            </div>
                                                                } 
                                                        </li>
                                                        <li class="list-group-item">
                                                            {
                                                                document.queryCommandSupported('copy') &&
                                                                <div>
                                                                    <h5>Matcher address &nbsp; &nbsp;
                                                                        <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                                    </h5>
                                                                    <textarea
                                                                    ref={(textarea) => this.textArea = textarea}
                                                                    value='https://TokenSwap..'
                                                                    />
                                                                    {this.state.copySuccess}
                                                                </div>
                                                            } 
                                                        </li>
                                                        <li class="list-group-item">
                                                            {
                                                                document.queryCommandSupported('copy') &&
                                                                <div>
                                                                    <h5>Data provider &nbsp; &nbsp;
                                                                        <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                                    </h5>
                                                                    <textarea
                                                                    ref={(textarea) => this.textArea = textarea}
                                                                    value='3bjK34sniEkH43rkoskafrB4psnWr'
                                                                    />
                                                                    {this.state.copySuccess}
                                                                </div>
                                                            } 
                                                        </li>
                                                        <li class="list-group-item">
                                                            {
                                                                document.queryCommandSupported('copy') &&
                                                                <div>
                                                                    <h5>Data service  &nbsp; &nbsp;
                                                                        <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                                    </h5>
                                                                    <textarea
                                                                    ref={(textarea) => this.textArea = textarea}
                                                                    value='https://TokenSwap.exchange'
                                                                    />
                                                                    {this.state.copySuccess}
                                                                </div>
                                                            } 
                                                        </li>
                                                        <li class="list-group-item">
                                                            {
                                                                document.queryCommandSupported('copy') &&
                                                                <div>
                                                                    <h5>Naming service&nbsp; &nbsp;
                                                                        <span class="badge pull-right"> <i class="fa fa-copy" onClick={this.copyToClipboard}></i> </span>
                                                                    </h5>
                                                                    <textarea
                                                                    ref={(textarea) => this.textArea = textarea}
                                                                    value='https://.......'
                                                                    />
                                                                    {this.state.copySuccess}
                                                                </div>
                                                            } 
                                                        </li>
                                                    </ul>
                                                </div>
                                                 {/* Info tab content with id 'd' */}
                                                <div class="tab-pane" id="d">
                                                    <h5> Version <span class="badge pull-right">tokenSwap version 1</span></h5><hr/>
                                                    <h5> Support <span class="badge pull-right">support</span></h5><hr/>
                                                    <h5> Legal <span class="badge pull-right"> Terms and Condition | Privacy Policy </span></h5>
                                                    <h5>  <span class="badge pull-right">TokenSwap</span> </h5>
                                                </div>
                                            </div>{/* class content closing tag */}
                                        </div>{/* class column closing tag*/}
                                    </div> {/*class row closing tag */}
                                </div>{/* modal container closing tag */}   
                            </div> {/* modal body closing tag */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

               {/* switch account modal */}
                <div class="modal fade" id="exampleModalCentersa" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                               
                                <h5 class="modal-title" id="exampleModalCenterTitle">
                                    <a href="/dashboard"><i class="fa fa-angle-left"></i> </a> Menu
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                               <i style={{'fontWeight': 1000}} class="fa fa-user-o"> Account name</i><a style={{'padding-left': '10px'}}>Active</a>
                               <p>3bjK34sniEkH43rkoskafrB4psnWr</p>
                            </div>
                            <div class="modal-footer">
                            <a href="/"><i class="fa fa-plus-circle"></i></a>  
                            <button type="button"  class="btn btn-primary"><a href="/"><i class="fa fa-plus"></i></a>Add Account </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Security show seed phrase */}
                <div class="modal fade" id="exampleModalCenterd" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                               
                                <h5 class="modal-title" id="exampleModalCenterTitle">
                                    <a href="/dashboard"><i class="fa fa-angle-left"></i> </a> private key
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.showseed}>
                                <input type="password" value={this.spassword} name='spassword' onChange={this.handleseed} placeholder="enter tokenSwap pswd"/>
                                <button  type="submit"> click ok</button>
                                </form>
                            </div>
                         
                            <div class="modal-footer">
                           
                            </div>
                        </div>
                    </div>
                </div>
      
            </div>    
                
        );
    }
}

export default Home;
