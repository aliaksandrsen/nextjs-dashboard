'use client';

import { formatDateToLocal } from '@/app/lib/utils';

export default function FormattedDate({ date }: { date: string }) {
  return <p>{formatDateToLocal(date)}</p>;
}
