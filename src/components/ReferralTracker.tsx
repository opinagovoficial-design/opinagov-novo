'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReferralTracker() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  useEffect(() => {
    if (refCode) {
      document.cookie = `opinagov_ref=${refCode}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
    }
  }, [refCode]);

  return null;
}
