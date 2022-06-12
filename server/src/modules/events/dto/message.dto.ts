import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompressMsgDto {
  @ApiProperty({ description: 'file name' })
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'hash is required' })
  @IsString()
  readonly hash: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'uid is required' })
  @IsString()
  readonly uid: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'chunkSize is required' })
  @IsNumber()
  readonly chunkSize: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'chunkTotalPageSize is required' })
  @IsNumber()
  readonly chunkTotalPageSize: number;

  readonly compressOptions: any;

  readonly compressFileExtraType: 'jpg' | 'png' | 'gif' | 'webp';
}
