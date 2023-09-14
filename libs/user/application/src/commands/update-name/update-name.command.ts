import { BaseCommand, CommandProps } from '@lib/shared';

export class UpdateNameCommand extends BaseCommand {
  public userId: string;
  public name: string;

  constructor(props: CommandProps<UpdateNameCommand>) {
    super();
    this.userId = props.userId;
    this.name = props.name;
  }
}
