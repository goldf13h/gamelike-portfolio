import coverImg from "../assets/cover_img.png";

export default function BeginningTab() {
  return (
    <section id="beginning">
      <figure>
        <img src={coverImg} alt="Cover image" />
      </figure>
      <div className="tagline">
        <h1>
          Swimming through a vast network of interconnected devices and servers,
          spreading joy and whimsy to users across the globe
        </h1>
        <p className="muted">Artwork generated with midjourney</p>
      </div>
    </section>
  );
}
