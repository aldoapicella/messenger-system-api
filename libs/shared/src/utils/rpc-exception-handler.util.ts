import { RpcException } from '@nestjs/microservices';

export const sendRpcException = (error: any) => {
    throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || 'An error occurred',
    });
};
