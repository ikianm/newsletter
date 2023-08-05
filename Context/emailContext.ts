'use client'
import { createContext } from "react";

interface Email {
    email: string | null,
}


const emailContext = createContext<Email>({
    email: '',
});

export default emailContext;