import React from 'react';
import { cn } from '@/src/lib/utils';

interface Props {
  type: string
    className?: string;
}

export const AuthForm: React.FC<Props> = ({ type, className }) => {
  return (
    <div className={cn('w-[500px]', className)}>
      <h1>{type}</h1>

    </div>
  );
};