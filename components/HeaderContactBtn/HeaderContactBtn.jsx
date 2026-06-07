
import Link from 'next/link';

export default function HeaderContactBtn({ deviceType, isMenuOpen }) {
  const btn =
    deviceType === 'mobile'
      ? <a
        href={`https://wa.me/+972504840588`}
        className={`${isMenuOpen ? 'header-cta' : 'btn cta header-cta'}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`צרו איתנו קשר בוואטסאפ`}
      >
        בואו נדבר
      </a>
      : <Link
        href='/#contact-section'
        className={`${isMenuOpen ? 'header-cta' : 'btn cta header-cta'}`}
      >
        בואו נדבר
      </Link>

  return btn;
}