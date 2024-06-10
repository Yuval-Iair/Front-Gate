import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileReportDto } from './dto/file-report.dto';
import { ReportService } from './report.service';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async fileReport(@Body() fileReportDto: FileReportDto, @Req() req: any) {
    const userId = req.user.id;
    return this.reportService.fileReport(userId, fileReportDto);
  }
}
