export default function CreditScene(props: {onClose: () => void}) {
  const { onClose } = props;

  return (
    <div className="side-scene">
      <section className="open-for-hire">
        <header>
          <h2>Credits</h2>
          <p className="muted">Everything involved in this project</p>
        </header>
        <div id="credits">
          <table>
            <tr>
              <th>developed by</th>
              <td className="muted">your name here @handle</td>
            </tr>
            <tr>
              <th>designed by</th>
              <td className="muted">alex dimitrov @xavortm</td>
            </tr>
            <tr>
              <th>visual assets</th>
              <td className="muted">homepage view, achievements by midjourney
                <br /><br />cons from remixicons and fontawesome
                <br /><br />hexagons by @xavortm
              </td>
            </tr>
            <tr>
              <th>audio effects</th>
              <td className="muted">click, hover, typing and all other audio effects by mixkit.co</td>
            </tr>
            <tr>
              <th>music</th>
              <td className="muted">“tea Fragrance” by Adeline Yeo (HP), Never forget
                <br /><br />“pressure” by Eggy Toast, Shed Roof
                <br /><br />“We were kids” by HolinzaPATREON, never forget</td>
            </tr>
          </table>
        </div>
        <button className="fullscreen" type="button" onClick={onClose} title="Close (Esc)"></button>
      </section>
    </div>
  );
}