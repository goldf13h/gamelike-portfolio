import rewardImg01 from "../../assets/reward_img01.png";
import rewardImg02 from "../../assets/reward_img02.png";

export default function QuestPanel() {
  return (
    <aside className="panel panel__quest">
      <section className="quest">
        <header>
          <h2 className="badge">Active Quest</h2>
          <p className="muted">The react skill-up line</p>
        </header>

        <dl className="details">
          <div className="kv">
            <dt>Quest name</dt>
            <dd>React website</dd>
          </div>
          <div>
            <dt>Goal</dt>
            <dd className="muted">
              Build this website. Implement a full react website with multiple routers, UI elements and tricky styling. Make it all work great!
            </dd>
          </div>
          <div>
            <dt>Rewards</dt>
            <dd>
              <ul className="rewards">
                <li className="reward">
                  <img src={rewardImg01} alt="Reward" />
                  <p className="value">+5</p>
                </li>

                <li className="reward">
                  <img src={rewardImg02} alt="Reward" />
                  <p className="value">+25</p>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      <footer className="settings">
        {/* Later: make these controlled inputs */}
        <label className="toggle btn">
          <span className="description">Sound effect</span>
          <input type="checkbox" defaultChecked />
          <span className="icon"></span>
        </label>
        <label className="toggle btn">
          <span className="description">Music</span>
          <input type="checkbox" />
          <span className="icon"></span>
        </label>
        <button className="toggle" type="button">
          <span>Visual settings</span>
          <span className="icon icon-gear" />
        </button>
      </footer>
    </aside>
  );
}