import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { EmitterService } from './../../services/emitter.service';

import { TaskModel } from './../../shared/models/tasks.model';
import { TaskService } from './../../services/task.service';
import { PeoplesService } from './../../services/peoples.service';
import { User } from 'src/app/classes/user.model';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  tasks: TaskModel[] = [];
  peoples: User[] = [];
  emitter = EmitterService.get('PeoplesChannel');
  listTeamOne: TaskModel[] = [];
  listTeamTwo: TaskModel[] = [];
  public opened = false;

  private taskId = '';

  public pieData: any = [
    { category: 'In Progress', value: 2 },
    { category: 'Completed', value: 2 }
  ];

  private selectedTask: TaskModel = {};
  private selectedTaskData: string;
  public seletedTaskTitle: string;
  public selectedTaskStartDate: string;
  public selectedTaskEndDate: string;
  public seletedTaskPeople: string;
  private subscriptions: Subscription[] = [];

  constructor(
    public taskService: TaskService,
    public peoplesService: PeoplesService,
    private store: Store<fromStore.ModulesState>
  ) {}

  // init Lifecycle hook
  ngOnInit() {
    this.getAllPeople();
    this.store.dispatch(new fromStore.GetTasks());

    this.getAllTasks();
    this.emitter.subscribe(msg => {
      if (msg.msg === 'BroadcastTask') {
        this.tasks.push(msg.data);
      }
    });
  }

  // Get all tasks
  getAllTasks() {
    // Get all tasks
    this.subscriptions.push(
      this.store
        .select(fromStore.getTasksArr())
        .pipe()
        .subscribe(
          (tasks: TaskModel[]) => {
            this.tasks = [];
            this.listTeamOne = [];
            this.listTeamTwo = [];
            console.log(tasks);
            tasks.forEach(task => {
              if (task.destination === 'ToDo') {
                this.tasks.push(task);
              }

              if (task.destination === 'Progress') {
                this.listTeamOne.push(task);
              }

              if (task.destination === 'Completed') {
                this.listTeamTwo.push(task);
              }
            });
            this.pieData[0].value = this.listTeamOne.length;
            this.pieData[1].value = this.listTeamTwo.length;

            this.pieData = [
              { category: 'In Progress', value: this.listTeamOne.length },
              { category: 'Completed', value: this.listTeamTwo.length }
            ];
          },
          err => {
            // Log errors if any
            console.log(err);
          }
        )
    );
  }

  // Get all peoples
  getAllPeople() {
    // Get all peoples
    this.peoplesService.getPeople().subscribe(
      peoples => {
        this.peoples = peoples;
        console.log(peoples);
      },
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  // Drop on success
  addTo(event: any, item, data) {
    if (data === 'ToDo') {
      // this.toastr.success('Task ' + item.title + ' added in To Do board!');
      this.taskService.updateTasks(item.id).catch(err => console.log(err));
    }
    if (data === 'Progress') {
      this.taskService
        .addTasksInProgress(item.id)
        .catch(err => console.log(err));
    }

    if (data === 'Completed') {
      this.taskService
        .addTasksInCompleted(item.id)
        .catch(err => console.log(err));
    }
    this.pieData[0].value = this.listTeamOne.length;
    this.pieData[1].value = this.listTeamTwo.length;

    this.pieData = [
      { category: 'In Progress', value: this.listTeamOne.length },
      { category: 'Completed', value: this.listTeamTwo.length }
    ];
  }

  // Open Task Popup details
  openTask(task, data: string) {
    this.opened = true;
    console.log(task);
    this.selectedTask = task;
    this.seletedTaskTitle = task.title;
    this.selectedTaskStartDate = task.startDate;
    this.selectedTaskEndDate = task.endDate;
    this.seletedTaskPeople = task.people;
    this.selectedTaskData = data;
    this.taskId = task.id;
  }

  // close the edit task window
  public close() {
    this.opened = false;
  }

  // updates content of the ticket
  updateTitle() {
    this.taskService.upodateTaskDescription(this.taskId, this.seletedTaskTitle);
    this.close();
  }

  // saves ticket to backlog
  saveToBacklog() {
    this.deleteTask();
    // this.taskService.moveToBacklog(this.selectedTask);
    this.store.dispatch(new fromStore.MoveToBacklog(this.selectedTask));
    this.close();
  }

  // removes task
  deleteTask() {
    console.log(this.selectedTaskData);
    this.taskService.removeTask(this.selectedTask.id);
    this.close();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
