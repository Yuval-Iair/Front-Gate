import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileReportDto } from './dto/file-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async fileReport(@Body() fileReportDto: FileReportDto, @Req() req: any) {
    const userId = req.user?.id;
    let response;
    try {
      response = await this.reportService.fileReport(userId, fileReportDto);
    } catch (error) {
      // TODO: Log Error for us
      return { statusCode: 500, message: 'Internal Server Error' };
    }
    return response;
  }
}
