import type { SvgIconType } from '../../../types/IconType';

const Address: SvgIconType = ({ id, fill = '#484D57', ...props }) => {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g fill={fill}>
        <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' />
        <circle cx='12' cy='9' r='2.5' fill='white' />
      </g>
    </svg>
  );
};

export default Address;
