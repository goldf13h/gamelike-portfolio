export default function ImagePreviewModal(props: {
  entry: { title: string; date: string; images?: { src: string; alt: string }[] };
  onClose: () => void;
}) {
  const { entry, onClose } = props;
  const images = entry.images ?? [];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h3>
            Visual records: {entry.title} <span className="date">{entry.date}</span>
          </h3>
          <button type="button" onClick={onClose} aria-label="Close preview">
            Close [esc]
          </button>
        </header>

        {images.length === 0 ? (
          <p className="muted">No visual records available for this entry.</p>
        ) : (
          <div className="modal-grid">
            {images.map((img, i) => (
              <figure key={i}>
                <img src={img.src} alt={img.alt} />
                <figcaption className="muted">{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      {/* click outside to close */}
      <button type="button" className="modal-scrim" onClick={onClose} aria-label="Close overlay" />
    </div>
  );
}