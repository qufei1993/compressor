import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChunkCheckDto {
  @ApiProperty({ description: 'file name' })
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'hash is required' })
  @IsString()
  readonly hash: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'chunkSize is required' })
  @IsNumber()
  readonly chunkSize: number;
}

export class ChunkUploadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly hash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly chunkTotalPageSize: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly chunkSize: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly index: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly size: number;
}

export class ChunkMergeAndCompressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  chunkSize: number;

  @ApiProperty()
  @IsNumber()
  chunkTotalPageSize: number;

  @ApiProperty()
  @IsBoolean()
  onlyCompress = false;
}

export class DeleteFilesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly filenames: string[];
}
