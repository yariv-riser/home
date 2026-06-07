
import Link from 'next/link';

export default function HeaderContactBtn({ deviceType }) {
  const btn =
    deviceType === 'mobile'
      ? <a
        href={`https://wa.me/+972504840588`}
        className={`btn cta`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`צרו איתנו קשר בוואטסאפ`}
      >
        בואו נדבר
      </a>
      :
      <Link className='btn cta' href="#contact-section">בואו נדבר</Link>

  return btn;
}