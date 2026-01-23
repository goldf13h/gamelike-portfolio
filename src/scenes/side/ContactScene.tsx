import { useState } from "react";

export default function ContactScene(props: {onClose: () => void}) {
  const { onClose } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL; 
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? "Request failed");
      }

      alert("Message sent successfully. Thank you!");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      alert(`Failed to send message: ${message ?? "Unknown error"}`);
      setStatus("error");
    }
  }

  return (
    <div className="side-scene">
      <section className="open-for-hire">
        <header>
          <h2>Connect with me</h2>
          <p className="muted">Wanna chat? Or just share something cool?</p>
        </header>

        <form 
          onSubmit={handleSubmit}>
          <div className="fields">
            <div className="field">
              <label htmlFor="name">How should I call you?</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Sending from</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.name@acme.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="message">Transmitted data</label>
              <textarea
                name="message"
                id="message"
                placeholder="Hi, I write to you about ..."
                value={message}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="actions">
            <button className="primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send message [enter]"}
            </button>
            <button type="button" onClick={onClose} title="Close (Esc)">Discard [esc]</button>
          </div>
          {status === "sent" && <p className="muted">Sent. Thanks!</p>}
          {status === "error" && <p className="muted">Error: {errorMsg}</p>}
        </form>
      </section>
    </div>
  );
}