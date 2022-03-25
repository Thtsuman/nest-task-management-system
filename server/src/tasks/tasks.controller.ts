import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterTaskObj: FilterTasksDto): Task[] {
    if (Object.keys(filterTaskObj).length > 0) {
      return this.taskService.filterTask(filterTaskObj);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createNewTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): string {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateStatus(id, status);
  }
}
