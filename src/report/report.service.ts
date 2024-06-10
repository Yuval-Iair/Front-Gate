import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { FileReportDto } from './dto/file-report.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class ReportService {
  private sqs: AWS.SQS;

  constructor(private configService: ConfigService<AllConfigType>) {
    console.log('IN THE CONSTRUCTOR');

    AWS.config.update({
      region: this.configService.get('app.awsRegion', {
        infer: true,
      }),
      accessKeyId: this.configService.get('app.awsAccessKeyId', {
        infer: true,
      }),
      secretAccessKey: this.configService.get('app.awsSecretAccessKey', {
        infer: true,
      }),
    });

    this.sqs = new AWS.SQS();
  }

  async fileReport(userId: string, fileReportDto: FileReportDto) {
    const report = {
      userId: userId,
      ...fileReportDto,
    };

    const params: AWS.SQS.SendMessageRequest = {
      MessageBody: JSON.stringify(report),
      QueueUrl: this.configService.get('app.awsSqsQueueUrl', {
        infer: true,
      })!,
    };
    try {
      return this.sqs.sendMessage(params).promise();
    } catch (error) {
      throw error;
    }
  }
}
