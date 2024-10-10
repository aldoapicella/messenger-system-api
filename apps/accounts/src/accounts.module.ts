import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { UserModule } from './modules/user/user.module';
import { FriendsModule } from './modules/friends/friends.module';

@Module({
  imports: [UserModule, FriendsModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
