import React from 'react';
import styles from './BrandLogo.module.css';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'navbar';
  isLightMode?: boolean;
  onClick?: () => void;
}

export function BrandLogo({
  className = '',
  size = 'navbar',
  isLightMode = false,
  onClick,
}: BrandLogoProps) {
  return (
    <div
      className={`${styles.logoWrap} ${styles[size]} ${className}`}
      onClick={onClick}
      title="WebKraftX"
      data-logo-rocket-origin="true"
    >
      <img
        src={isLightMode ? '/logo-header-dark.png' : '/logo-header.png'}
        alt="WebKraftX"
        className={styles.headerLogoImg}
        draggable={false}
      />
    </div>
  );
}

export function BrandWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`${styles.brandText} ${className}`}>
      WebKraft<span className={styles.brandX}>X</span>
    </span>
  );
}
