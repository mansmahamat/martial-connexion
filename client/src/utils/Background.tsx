import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white  text-base m-0 transition-all">
      {children}
    </div>
  );
};

export default Background;
