const APPLE_URL = 'https://apps.apple.com/us/app/flamingua-a1-french-german/id6759222904'
const GOOGLE_URL = 'https://play.google.com/store/apps/details?id=com.flamingua.app'

interface StoreButtonsProps {
  size?: 'normal' | 'small'
}

export default function StoreButtons({ size = 'normal' }: StoreButtonsProps) {
  const h = size === 'small' ? 40 : 50

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      <a href={APPLE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
        <svg width={h * 3.1} height={h} viewBox="0 0 155 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="155" height="50" rx="8" fill="#000" />
          <text x="52" y="18" fill="#fff" fontSize="8" fontFamily="system-ui">Download on the</text>
          <text x="52" y="35" fill="#fff" fontSize="16" fontWeight="600" fontFamily="system-ui">App Store</text>
          <g transform="translate(14, 10)" fill="#fff">
            <path d="M15 0C11.4 0 9.2 2 9 5.2c2.2-.1 4.8-2.4 6-5.2zM18.8 6.8c-2.4 0-4.4 1.4-5.8 1.4s-3.2-1.3-5.4-1.3C4.2 6.9.8 10 .8 16c0 3.7 1.4 7.6 3.2 10.1 1.5 2.1 2.8 3.9 4.8 3.9s2.8-1.3 5.2-1.3 3.1 1.3 5.2 1.3 3.1-1.7 4.6-3.8c1-1.5 1.4-2.9 1.4-3-.1 0-2.8-1.1-2.8-4.3 0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.3-2-3.9-2z"/>
          </g>
        </svg>
      </a>
      <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
        <svg width={h * 3.1} height={h} viewBox="0 0 155 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="155" height="50" rx="8" fill="#000" />
          <text x="52" y="18" fill="#fff" fontSize="8" fontFamily="system-ui">GET IT ON</text>
          <text x="52" y="35" fill="#fff" fontSize="16" fontWeight="600" fontFamily="system-ui">Google Play</text>
          <g transform="translate(12, 8)">
            <path d="M4 2l14 12L4 32V2z" fill="#4285F4" />
            <path d="M4 2l18 15-4 3L4 2z" fill="#34A853" />
            <path d="M4 32l14-18 4 3L4 32z" fill="#EA4335" />
            <path d="M22 17l-4-3 4-3v6z" fill="#FBBC05" />
          </g>
        </svg>
      </a>
    </div>
  )
}
