import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  /**
    * Intercepts the response and wraps it in a standard format.
    * @param context - The execution context.
    * @param next - The call handler.
    * @returns An observable containing the wrapped response.
    */
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => ({
          success: true,
          data: data,
        }))
      );
    }
  }