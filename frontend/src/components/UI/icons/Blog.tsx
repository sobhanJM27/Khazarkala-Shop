import type { SvgIconType } from '../../../types/IconType';

const Blog: SvgIconType = ({ id, fill, ...props }) => {
  return (
    <svg
      width='100%'
      height='100%'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 63.77 43.06'
      {...props}
    >
      <defs>
        <style>
          {`
            .cls-blog-7 {
              fill: none;
              stroke: #FFD700;
              stroke-miterlimit: 10;
              stroke-width: .68px;
            }
            .cls-blog-4 { fill: #FFD700; }       /* main-yellow-500 */
            .cls-blog-5 { fill: #FFF5B8; }       /* main-yellow-100 */
            .cls-blog-9 { fill: #B38F00; }       /* main-yellow-700 */
            .cls-blog-10 { fill: #4B2E14; }      /* main text color */
          `}
        </style>
        <clipPath id='clip-path' transform='translate(-.23 -10.58)'>
          <path fill='none' d='M0 0H64V64H0z' />
        </clipPath>
      </defs>
      <g id='Layer_2' data-name='Layer 2'>
        <g id='Layer_1-2' data-name='Layer 1'>
          <g clipPath='url(#clip-path)' id='Blog'>
            <path
              d='M48.31 13.76h-37a7.85 7.85 0 00-7.88 7.82V39a7.85 7.85 0 007.88 7.81h7.88A2.2 2.2 0 0121.38 49v3.89a.74.74 0 001.26.52l5.88-5.72a3.05 3.05 0 012.14-.87h17.65A7.84 7.84 0 0056.18 39V21.58a7.84 7.84 0 00-7.87-7.82z'
              transform='translate(-.23 -10.58)'
              opacity={0.25}
              fill='#B38F00'
            />
            <path
              className='cls-blog-4'
              d='M19.6 51.48a1.08 1.08 0 01-1.08-1.07v-3.89a1.86 1.86 0 00-1.86-1.84H8.78a8.19 8.19 0 01-8.21-8.15V19.08a8.19 8.19 0 018.21-8.16h37A8.19 8.19 0 0154 19.08v17.45a8.19 8.19 0 01-8.21 8.15H28.15a2.72 2.72 0 00-1.91.78l-5.88 5.71a1.1 1.1 0 01-.76.31z'
              transform='translate(-.23 -10.58)'
            />
            <path
              className='cls-blog-5'
              d='M45.79 11.26a7.85 7.85 0 017.88 7.82v17.45a7.85 7.85 0 01-7.88 7.81H28.15a3.06 3.06 0 00-2.15.87l-5.88 5.72a.74.74 0 01-1.26-.52v-3.89a2.2 2.2 0 00-2.2-2.18H8.78A7.85 7.85 0 01.9 36.53V19.08a7.85 7.85 0 017.88-7.82h37z'
              transform='translate(-.23 -10.58)'
            />
            <rect
              className='cls-blog-7'
              x={7.87}
              y={8.89}
              width={35.43}
              height={3.73}
              rx={1.86}
            />
            <rect
              className='cls-blog-7'
              x={7.87}
              y={14.43}
              width={22.82}
              height={3.73}
              rx={1.86}
            />
            <rect
              className='cls-blog-7'
              x={7.87}
              y={19.97}
              width={25.23}
              height={3.73}
              rx={1.86}
            />
            <rect
              x={7.87}
              y={8.05}
              width={35.43}
              height={3.73}
              rx={1.86}
              fill='#FFD700'
            />
            <rect
              x={7.87}
              y={13.59}
              width={22.82}
              height={3.73}
              rx={1.86}
              fill='#FFD700'
            />
            <rect
              x={7.87}
              y={19.14}
              width={25.23}
              height={3.73}
              rx={1.86}
              fill='#FFD700'
            />
            <path
              className='cls-blog-10'
              d='M59.14 10.77L53.65 6.23 55.67 3.83 61.16 8.37 59.14 10.77z'
            />
            <path
              className='cls-blog-10'
              d='M47.67 24.4L42.19 19.86 42.94 18.96 48.43 23.5 47.67 24.4z'
            />
            <path
              className='cls-blog-10'
              d='M41.19 38.42l-.49.22a.45.45 0 01-.64-.53l.14-.58a1.17 1.17 0 01.99.89z'
              transform='translate(-.23 -10.58)'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Blog;
