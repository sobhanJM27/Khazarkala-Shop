import * as express from 'express';
import mongoose, { Error } from 'mongoose';
import * as morgan from 'morgan';
import { InternalServerError, NotFound } from 'http-errors';
import * as path from 'path';
import router from './router.routes';
import * as cors from 'cors';

export class Server {
  private appServer = express();

  constructor(PORT: number) {
    this.createServer(PORT);
    this.configDB();
    this.configApplications(PORT);
    this.routerHandelling();
    this.errorHandelling();
  }

  private configApplications(PORT: number): void {
    this.appServer.use(morgan('dev'));
    this.appServer.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.appServer.use(express.json({ limit: '50mb' }));
    this.appServer.use(express.static(path.join(__dirname, '..', 'public')));
  }

  private createServer(PORT: number): void {
    this.appServer.listen(PORT, () =>
      console.log(`server is running on port ${PORT}`)
    );

    const allowedOrigins = [
      'http://localhost:5173',
      'https://hyperkala-frontend.liara.run',
    ];

    this.appServer.use(
      cors({
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        allowedHeaders: 'X-Requested-With,content-type,Authorization',
      })
    );
  }

  private async configDB(): Promise<any> {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => console.log('connected to db'))
      .catch((e) => console.log(e));

    process.on('SIGBREAK', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }

  private routerHandelling(): void {
    this.appServer.use(router());
  }

  private errorHandelling(): void {
    this.appServer.use((req, res, next) => {
      next(NotFound('صفحه‌ی مورد نظر پیدا نشد'));
    });

    this.appServer.use(
      (
        error: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const serverError = InternalServerError();

        const statusCodes =
          typeof error?.status === 'number' &&
          error.status >= 100 &&
          error.status < 600
            ? error.status
            : serverError.status;

        const message = error?.message || serverError.message;

        return res.status(statusCodes).json({
          statusCodes,
          message,
        });
      }
    );
  }
}
