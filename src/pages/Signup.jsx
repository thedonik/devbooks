import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImg from "../assets/images/register-img.svg";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../utils/axios";

import "./signup.scss";

const USER_REGEX = /^[A-z][A-z0-9-_]{4,24}$/;
const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[@.]).{4,24}$/;
const PWD_REGEX = /^(?=.*[0-9]).{4,9}$/;
const REGISTER_URL = "/user/register";

export default function Signup() {
  const navigate = useNavigate();

  const userfirstRef = useRef();
  const userlastRef = useRef();
  const errRef = useRef();
  const emailRef = useRef();

  const [userfirst, setUserfirst] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userlast, setUserlast] = useState("");
  const [validNamelast, setValidNamelast] = useState(false);
  const [userlastFocus, setUserlastFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailName, setEmailName] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [tel, setTel] = useState("");
  const [validTel, setValidTel] = useState(false);
  const [telFocus, setTelFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userfirstRef.current.focus();
  }, []);

  useEffect(() => {
    userlastRef.current.focus();
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(userfirst));
  }, [userfirst]);

  useEffect(() => {
    setValidNamelast(USER_REGEX.test(userlast));
  }, [userlast]);

  useEffect(() => {
    setEmailName(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidTel(PWD_REGEX.test(tel));
  }, [tel]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [userfirst, userlast, email, tel, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(userfirst);
    const v2 = USER_REGEX.test(userlast);
    const v3 = PWD_REGEX.test(tel);
    const v4 = PWD_REGEX.test(pwd);
    const v5 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          first_name: userfirst,
          last_name: userlast,
          phone: tel,
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.token);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUserfirst("");
      setUserlast("");
      setTel("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        navigate("/books")
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="register container d-flex align-items-center">
      <div className="register__left w-50">
        <img className="w-100 h-100" src={RegisterImg} alt="" />
      </div>
      <div className="register__right w-50">
        <>
          {success ? (
            navigate("/books")
          ) : (
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Register</h1>
              <form className="register-form" onSubmit={handleSubmit}>
                {/* FIRST NAME */}
                <label htmlFor="firstname">
                  Firstname:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !userfirst ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="firstname"
                  ref={userfirstRef}
                  autoComplete="off"
                  onChange={(e) => setUserfirst(e.target.value)}
                  value={userfirst}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && userfirst && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  lowercase letters.
                  <br />
                  number allowed.
                </p>

                {/* LAST NAME */}
                <label htmlFor="lastname">
                  Lastname:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validNamelast ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validNamelast || !userlast ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="lastname"
                  ref={userlastRef}
                  autoComplete="off"
                  onChange={(e) => setUserlast(e.target.value)}
                  value={userlast}
                  required
                  aria-invalid={validNamelast ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserlastFocus(true)}
                  onBlur={() => setUserlastFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userlastFocus && userlast && !validNamelast
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  lowercase letters.
                  <br />
                  numbers allowed.
                </p>

                <label htmlFor="email">
                  Email:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={emailName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={emailName || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={emailName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !emailName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Enter your email address
                  <br />
                  Letters, numbers allowed.
                </p>

                <label htmlFor="phoneNumber">
                  Phone:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validTel ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validTel || !tel ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  onChange={(e) => setTel(e.target.value)}
                  value={tel}
                  minLength="9"
                  maxLength="9"
                  required
                  aria-invalid={validTel ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setTelFocus(true)}
                  onBlur={() => setTelFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    telFocus && !validTel ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  must be 9 characters.
                </p>

                <label htmlFor="password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  minLength="4"
                  maxLength="8"
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  At least 4 characters.
                </p>

                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  minLength="4"
                  maxLength="8"
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>

                <button
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button>
              </form>
              <p>
                Already registered?
                <Link className="line mx-3" to="/signin">
                  Sign in
                </Link>
              </p>
            </section>
          )}
        </>
      </div>
    </div>
  );
}
