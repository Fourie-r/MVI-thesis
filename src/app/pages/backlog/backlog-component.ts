import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskModel } from 'src/app/shared/models/tasks.model';
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-backlog-component',
  styleUrls: ['/backlog-component.scss'],
  templateUrl: '/backlog-component.html'
})
export class BacklogComponent implements OnInit, OnDestroy {
  backlogTasks: TaskModel[] = [];
  subscriptions: Subscription[] = [];
  tasks: TaskModel[] = [];
  constructor(private tasKService: TaskService, private store: Store<fromStore.ModulesState>) {}

  ngOnInit() {


    this.store.dispatch(new fromStore.GetBacklogTasks());
    this.subscriptions.push(
      this.store.select(fromStore.getBacklogArr())
        .subscribe((tasks: TaskModel[]) => {
          this.tasks = tasks;
          this.backlogTasks = [];
          tasks.forEach(task => {
            let date = task.startDate['seconds'] * 1000;
            let currentDate = new Date(date);
            let dateObj = currentDate.getDate();
            let month = currentDate.getMonth();
            let year = currentDate.getFullYear();
            const dateString = year + '.' + (month + 1) + '.' + dateObj;

            date = task.endDate['seconds'] * 1000;
            currentDate = new Date(date);
            dateObj = currentDate.getDate();
            month = currentDate.getMonth();
            year = currentDate.getFullYear();

            const endDateString = year + '.' + (month + 1) + '.' + dateObj;

            const newTask = JSON.parse(JSON.stringify(task));
            newTask.startDate = dateString;
            newTask.endDate = endDateString;
            console.log(newTask);
            this.backlogTasks.push(newTask);
          });
        })
    );
  }


  moveToSprint(index: number) {

    this.tasKService.moveToSprint(this.tasks[index]);
  }

  ngOnDestroy() {

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
