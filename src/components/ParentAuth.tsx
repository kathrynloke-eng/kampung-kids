"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function ParentAuth() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const result = mode === "signIn"
      ? await authClient.signIn.email({ email, password })
      : await authClient.signUp.email({ email, password, name: name || "Parent" });
    setPending(false);
    if (result.error) setError(result.error.message || "Please check your details and try again.");
  }

  return (
    <section className="kid-panel mx-auto max-w-md space-y-5 p-6 text-slate-700">
      <div className="space-y-2 text-center">
        <span className="text-4xl" aria-hidden>🪁</span>
        <h1 className="font-display text-3xl text-teal-950">Grown-ups, let’s keep progress safe</h1>
        <p className="text-sm font-semibold leading-relaxed text-slate-600">
          Create an account to save your child’s learning journey securely across devices.
        </p>
      </div>
      <form className="space-y-3" onSubmit={submit}>
        {mode === "signUp" ? <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-2xl border-2 border-teal-100 px-4 py-3 font-semibold outline-none focus:border-teal-500" /> : null}
        <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-2xl border-2 border-teal-100 px-4 py-3 font-semibold outline-none focus:border-teal-500" />
        <input required minLength={8} type="password" autoComplete={mode === "signIn" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8 or more characters)" className="w-full rounded-2xl border-2 border-teal-100 px-4 py-3 font-semibold outline-none focus:border-teal-500" />
        {error ? <p role="alert" className="text-sm font-bold text-red-600">{error}</p> : null}
        <button disabled={pending} className="kid-btn kid-btn-primary w-full disabled:opacity-60">{pending ? "One moment…" : mode === "signIn" ? "Sign in" : "Create parent account"}</button>
      </form>
      <button type="button" onClick={() => { setMode(mode === "signIn" ? "signUp" : "signIn"); setError(""); }} className="w-full text-sm font-extrabold text-teal-700 underline underline-offset-4">
        {mode === "signIn" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </section>
  );
}
