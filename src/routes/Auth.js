
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { authService, firebaseInstance } from 'fbase';
import { async } from '@firebase/util';

const Auth = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")



    const toggleAccount = () => setNewAccount((prev) => !prev)



    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;

        if (name === "email") {
            setEmail(value)
        }
        else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            let data;

            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password)
            } else {
                data = await signInWithEmailAndPassword(authService, email, password)

            }
            console.log(data)
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    const onSocialClick = async (event) => {
        const {
            target: { name }, } = event
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider()
        } else if (name === "github") {
            provider = new GithubAuthProvider()
        }
        const data = await signInWithPopup(authService, provider)
        console.log(data)
    }



    return (
        <div>
            <div className='loginBox'>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                    <input type="submit" value={newAccount ? "SignUp" : "LogIn"} />

                </form>
            </div>
            <div className='errorBox'>
                {error}
            </div>
            <div className='toggleBox'>
                <span onClick={toggleAccount}>
                    {newAccount ? "Sign In" : "Create Account"}
                </span>
            </div>
            <div className='loginBox-social'>
                <button onClick={onSocialClick} name="google">Google</button>
                <button onClick={onSocialClick} name="github">Github</button>

            </div>
        </div>

    );
};

export default Auth;