import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { CustomTransportStrategy, Server } from '@nestjs/microservices'

class GoogleCloudPubSubServer
  extends Server
  implements CustomTransportStrategy
{
  /**
   * This method is triggered when you run "app.listen()".
   */
  async listen(callback: () => void) {
    const echoHandler = this.messageHandlers.get('echo')
    const streamOrResult = await echoHandler('Hello World')
    if (isObservable(streamOrResult)) {
      streamOrResult.subscribe()
    }
    callback()
  }

  /**
   * This method is triggered on application shutdown.
   */
  close() {}
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new GoogleCloudPubSubServer(),
    },
  )
  await app.listen()
}
bootstrap()
