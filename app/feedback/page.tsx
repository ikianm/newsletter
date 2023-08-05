'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Image from 'next/image';
import emailContext from '@/Context/emailContext';
import './page.css';

export default function page(): JSX.Element {
    const router = useRouter();
    const emailCtx = useContext(emailContext);
    return (
        <div className='main-page'>
            <div className='wrapper'>
                <Image
                    src='/images/icon-success.svg'
                    alt='icon-success'
                    width={60}
                    height={60}
                />
                <h2>Thanks for subscribing!</h2>
                <p>A confirmation email has been sent to <span>{emailCtx.email}</span>. Please open it and click the button inside to confirm your subscribtion.</p>
                <button onClick={() => router.replace('/')}>Dismiss message</button>
            </div>
        </div>
    )
}
