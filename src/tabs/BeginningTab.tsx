import coverImg from "../assets/cover_img.png";

export default function BeginningTab() {
  return (
    <section className="cover">
      <figure className="layer-frame">
        <span className="layer layer1"></span>
        <span className="layer layer2"></span>
        <span className="layer layer3"></span>
        <span className="layer layer4"></span>
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
