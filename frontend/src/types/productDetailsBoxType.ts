import { SvgIconType } from './IconType';
import { Uuid } from './uuidType';

export type ProductDetailsBox = {
  Icon: SvgIconType;
  value: string | number;
  id: Uuid;
};
