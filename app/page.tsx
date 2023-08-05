'use client';
import React, { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import ListInfo from "../components/ListInfo/ListInfo";
import "./page.css";

export default function NewsLetter() {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const submitEmailHandler = (e: FormEvent) => {
    e.preventDefault();
    if (emailRef.current) {
      const emailRgx: RegExp = new RegExp('^[A-Za-z0-9+_.-]+@(.+)$');
      const emailValue: string = emailRef.current.value;
      if (emailRgx.test(emailValue)) {
        setIsEmailValid(true);
        fetch('/api/email', {
          method: 'POST',
          body: JSON.stringify(emailValue),
        });
        return;
      } else {
        setIsEmailValid(false);
      }
    }
  };

  return (
    <div className="main-page">
      <div className='newsletter'>
        <div className='image-box'>
          <Image
            src='/images/illustration-sign-up-desktop.svg'
            alt='newsletter illustration'
            width={445}
            height={650}
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
