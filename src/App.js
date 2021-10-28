import React, { useState } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
function App() {
const [name, SetName] =  useState('');
const [email, SetEmail] =  useState('');
const [image, SetImage] =  useState('');

  const responseSuccessGoogle = (response) => {
    axios({
      method: "post",
      url: "http://localhost:4000/api/v1/auth/google",
      data: { token: response.tokenId }
    }).then((res) => {
      SetName(res.data.name)
      SetEmail(res.data.email)
      SetImage(res.data.picture)
    })
  }

  const responseErrorGoogle = (response) => {
    console.log(response)
  }

  return (
    <>
      <GoogleLogin
        clientId="363562831100-8e8q0be94o646l6c6tkrbb4m9klnipkv.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <table>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>image</th>
        </tr>

        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{image!='' ? <img src={image} alt="alt" /> :""}</td>
        </tr>
      </table>

    </>

  );
}

export default App;
