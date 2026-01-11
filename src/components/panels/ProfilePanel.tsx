import profilePic from "../../assets/profile_pic.png";
import type { SidePage } from "../../app/types";

export default function ProfilePanel(props: { onOpenSide: (page: SidePage) => void }) {
  const { onOpenSide } = props;

  return (
    <aside className="panel panel__profile">
      <section className="profile">
        <figure className="layer-frame avatar" role="img" aria-label="Profile avatar">
          <span className="layer layer1"></span>
          <span className="layer layer2"></span>
          <span className="layer layer3"></span>
          <span className="layer layer4"></span>
          <img src={profilePic} alt="Profile" />
        </figure>

        <dl className="details">
          <div className="kv">
            <dt>Name</dt>
            <dd>Yanlin Yu / Rachel</dd>
          </div>
          <div className="kv">
            <dt>Occupation</dt>
            <dd>Web Developer</dd>
          </div>
          <div className="kv">
            <dt>Availability</dt>
            <dd>
              <button className="badge badge-hire" type="button" onClick={() => onOpenSide("hire")}>
                Open for hire
              </button>
            </dd>
          </div>
          <div className="kv action">
            <dt>Social</dt>
            <dd>
              <button type="button" onClick={() => onOpenSide("contact")}>
                Open connection<span className="icon icon-bluetooth"/>
              </button>
            </dd>
          </div>
        </dl>
      </section>

      <footer className="motto">
        <h3>MOTTO:</h3>
        <p className="muted">Saepe omnis neque numquam recusandae laborantium.</p>
      </footer>
    </aside>
  );
}