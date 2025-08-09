import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { TypeEnumComment, TypeEnumSned } from '../enum/typeComment.enum';

export class CommentDto {
  @IsMongoId()
  ID: string;

  @ValidateIf((o) => o.snedType === 'answer')
  @IsString()
  title?: string;

  @IsString()
  text: string;

  @IsOptional()
  @IsMongoId()
  userID?: string;

  @ValidateIf((o) => o.snedType === 'comment')
  @IsNumber()
  @IsOptional()
  star?: number;

  @IsEnum(TypeEnumComment)
  method: TypeEnumComment;

  @IsEnum(TypeEnumSned)
  snedType: TypeEnumSned;

  @ValidateIf((o) => o.snedType === 'answer')
  @IsMongoId()
  parent?: string;
}
