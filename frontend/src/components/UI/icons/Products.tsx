import type { SvgIconType } from '../../../types/IconType';

const Products: SvgIconType = ({ id, fill, ...props }) => {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 64 64'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <defs>
        <style>
          {`
            .cls-products-1 { fill: #4B2E14; }
            .cls-products-2 { fill: #FFF5B8; }
            .cls-products-3 { fill: #FFD700; }
            .cls-products-4 { fill: #B38F00; }
          `}
        </style>
      </defs>
      <g id='Layer_2' data-name='Layer 2'>
        <g id='ShoppingBag'>
          <rect
            className='cls-products-2'
            x='14'
            y='20'
            width='36'
            height='36'
            rx='4'
          />
          <path
            className='cls-products-1'
            d='M50,18H14a2,2,0,0,0-2,2V54a6,6,0,0,0,6,6H46a6,6,0,0,0,6-6V20A2,2,0,0,0,50,18ZM48,54a2,2,0,0,1-2,2H18a2,2,0,0,1-2-2V22H48Z'
          />
          <path
            className='cls-products-3'
            d='M24 20a8 8 0 0116 0h-2a6 6 0 00-12 0z'
          />
          <circle className='cls-products-4' cx='22' cy='28' r='2' />
          <circle className='cls-products-4' cx='42' cy='28' r='2' />
          <rect
            className='cls-products-3'
            x='20'
            y='32'
            width='24'
            height='2'
            rx='1'
          />
          <rect
            className='cls-products-3'
            x='20'
            y='38'
            width='24'
            height='2'
            rx='1'
          />
        </g>
      </g>
    </svg>
  );
};

export default Products;
