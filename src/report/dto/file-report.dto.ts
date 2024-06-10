import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class FileReportDto {
  @ApiProperty({ example: 'report url example', type: String })
  @IsUrl()
  url: string;

  @ApiProperty({ example: 'report comment', type: String })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ type: Array })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
