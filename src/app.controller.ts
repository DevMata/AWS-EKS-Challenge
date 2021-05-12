import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'

@Controller()
export class AppController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @HealthCheck()
  @Get('health')
  check(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.httpHealthIndicator.pingCheck('github', 'https://github.com'),
      () => this.typeOrmHealthIndicator.pingCheck('database'),
    ])
  }
}
