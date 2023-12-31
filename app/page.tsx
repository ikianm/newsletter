'use client';
import React, { FormEvent, useEffect, useRef, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ListInfo from "../components/ListInfo/ListInfo";
import Alert from "@/components/Alert/Alert";
import emailContext from "@/Context/emailContext";
import "./page.css";

export default function NewsLetter(): JSX.Element {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailCtx = useContext(emailContext);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => setShowAlert(false), 3000);
  }, [showAlert])

  const submitEmailHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (emailRef.current) {
      const emailRgx: RegExp = new RegExp('^[A-Za-z0-9+_.-]+@(.+)$');
      if (emailRgx.test(emailRef.current.value)) {
        setIsEmailValid(true);
        fetch('/api/email', {
          method: 'POST',
          body: JSON.stringify({ email: emailRef.current.value }),
        })
          .then(res => {
            if (!res.ok) {
              setShowAlert(true);
              return;
            }
            return res.json();
          })
          .then(data => {
            emailCtx.email = data.email;
            router.replace('/feedback');
          });

      } else {
        setIsEmailValid(false);
      }
    }
  };

  return (
    <div className="main-page">
      {showAlert ? <Alert /> : null}
      <div className='newsletter'>
        <div className='image-box'>
          <Image
            src='/images/illustration-sign-up-desktop.svg'
            alt='newsletter illustration'
            width={400}
            height={670}
            className="newsletter-img-desktop"
          />
          <Image
            src='/images/illustration-sign-up-mobile.svg'
            alt='newsletter illustration'
            width={300}
            height={200}
            className="newsletter-img-mobile"
          />
        </div>
        <div className='content-box'>
          <h1>Stay updated!</h1>
          <p>Join 60,000 product managers receiving monthly updated on:</p>
          <ul>
            <ListInfo
              text='Product discovery and building what matters'
            />
            <ListInfo
              text='Measuring to ensure updates are success'

            />
            <ListInfo
              text='And much more!'
            />
          </ul>
          <form className="form" onSubmit={submitEmailHandler}>
            {!isEmailValid ? <p className="error">valid email required</p> : null}
            <label htmlFor="email-input">Email Address</label>
            <input
              className={!isEmailValid ? 'invalid' : ''}
              placeholder="email@company.com"
              ref={emailRef}
            />
            <button type="submit">Subscribe to monthly newsletter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
