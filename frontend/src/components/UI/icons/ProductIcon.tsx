import type { SvgIconType } from '../../../types/IconType';

const Product: SvgIconType = ({ id, fill = '#484D57', ...props }) => {
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
        <path d='M2 7L12 2L22 7L12 12L2 7Z' />
        <path d='M2 7V17L12 22L22 17V7L12 12L2 7Z' />
      </g>
    </svg>
  );
};

export default Product;
