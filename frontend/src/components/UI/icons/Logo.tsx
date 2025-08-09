const Logo = ({ className = '', id }: { className?: string; id: string }) => {
  return (
    <img
      src='/images/khazarkala.png'
      alt='لوگوی خزر کالا'
      className={`object-contain ${className}`}
      id={id}
    />
  );
};

export default Logo;
