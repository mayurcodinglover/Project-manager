import {useState} from "react";
import type {User} from "./types"
import { createUser } from "./api";

interface UserFormProps {
    onCreated:(user:User)=>void;
}

export function UserForm({onCreated}:UserFormProps){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [submitting,setSubmitting]=useState(false);

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        if(!name.trim() || !email.trim()) return;
        setSubmitting(true);
        try {
            const newUser=await createUser({name,email});
            onCreated(newUser);
            setName("");
            setEmail("");
        } catch (error) {
             console.error(error);
      alert("Failed to create user — email may already be in use");
        }
        finally{
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
      <button type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add User"}</button>
    </form>
    )
}