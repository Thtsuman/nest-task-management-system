import { TaskStatus } from '../tasks.model';

export class FilterTasksDto {
  status?: TaskStatus;
  search?: string;
}
