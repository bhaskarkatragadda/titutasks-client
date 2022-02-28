import { useRef, useState, useEffect } from "react";
import axios from '../../api/axios';
const REGISTER_URL = '/register';
const Register = () => {
  const errRef = useRef();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    setErrMsg('');
}, [user, pwd])

useEffect(() => {
  userRef.current.focus();
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         await axios.post(REGISTER_URL,
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        setSuccess(true);
        setUser('');
        setPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Already registered');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
    }
}
  return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
                <a href="#">Sign In</a>
            </p>
        </section>
    ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/* <Link to="/">Sign In</Link> */}
                        </span>
                    </p>
    </section>
        )}
        </>
  )
}

export default Register