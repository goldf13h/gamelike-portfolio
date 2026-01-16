export default function HireScene(props: {onClose: () => void}) {
  const { onClose } = props;

  return (
    <div className="side-scene">
      <section className="open-for-hire">
        <header>
          <h2>Open for hire</h2>
          <p className="muted">I would love to hear about your projects!</p>
        </header>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <div className="fields">
            <div className="field">
              <label htmlFor="name">How should I call you?</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
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
              />
            </div>
            <div className="field">
              <label htmlFor="message">Transmitted data</label>
              <textarea
                name="message"
                id="message"
                placeholder="Hi, I write to you about ..."
              />
            </div>
          </div>
          <div className="actions">
            <button className="primary" type="submit">Send message [enter]</button>
            <button type="button" onClick={onClose} title="Close (Esc)">Discard [esc]</button>
          </div>
        </form>
      </section>
    </div>
  );
}