import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class FileReportDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
