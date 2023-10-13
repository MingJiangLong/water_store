import { BadGatewayException, CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(data => {
        return {
          code: 200,
          data,
        }
      }),
    )
      // .pipe(
      //   catchError((error) => {
      //     const response = error?.response;
      //     // class-validate error
      //     return throwError(() => {
      //       const code = response?.statusCode;
      //       const message = response?.message;
      //       const messageStr = Array.isArray(message) ? message[0] : message

      //       return throwError({
      //         status: error.status || 500,
      //         message: error.message || 'Internal server error',
      //       });
      //     });
      //   })
      // );
  }
}