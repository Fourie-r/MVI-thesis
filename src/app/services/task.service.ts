// Imports
import { Injectable } from '@angular/core';
import { TaskModel } from '../shared/models/tasks.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

// Import RxJs required methods

@Injectable()
export class TaskService {
  constructor(public db: AngularFirestore) {}

  // returns all tasts
  getTasks(): Observable<any> {
    return this.db.collection('tasks').valueChanges();
  }

  // returns all backlog tasks
  getBacklogTasks(): Observable<any> {
    return this.db.collection('backlog').valueChanges();
  }

  // adds a task to the db collection TODO
  addTasks(body: TaskModel) {
    const key = body.id || this.db.createId();
    const newTask = { id: key, ...body };
    return this.db
      .collection('tasks')
      .doc(key)
      .set(newTask)
      .catch(err => console.log(err));
  }

  // when a task is bing dragged back to the ToDo column
  updateTasks(id: string): Promise<any> {
    return this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'ToDo' })
      .catch(err => console.log(err));
  }

  // task added in Progress column
  addTasksInProgress(id: string): Promise<any> {
    return this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'Progress' })
      .catch(err => console.log(err));
  }

  // edit tasks description
  upodateTaskDescription(id: string, text: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ title: text })
      .catch(err => console.log(err));
  }

  // move task to in Completed column
  addTasksInCompleted(id: string): Promise<any> {
    /* console.log(body);
    this.removeTasksInProgress(body.id);
    this.removeTasksInToDo(body.id);

    return this.db
      .collection('completedTasks')
      .doc(body.id)
      .set(body)
      .catch(err => console.log(err)); */
    return this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'Completed' })
      .catch(err => console.log(err));
  }

  // moves task from backlog to board component
  moveToSprint(body: TaskModel) {
    this.removeTaskInBacklog(body.id);
    body.destination = 'ToDo';
    return this.addTasks(body);
  }

  // moves task from board component to backlog
  moveToBacklog(selectedTask) {
    return this.db
      .collection('backlog')
      .doc(selectedTask.id)
      .set(selectedTask);
  }

  // deletes a task in board component
  removeTask(id: string) {
    this.db
      .collection('tasks')
      .doc(id)
      .ref.get()
      .then(querySnapshot => {
        querySnapshot.ref
          .delete()
          .then(() => {
            console.log('Document successfully deleted from ToDo tasks');
          })
          .catch(err => {
            console.error('Error removing document from ToDo tasks: ', err);
          });
      });
  }

  // removes task from backlog
  removeTaskInBacklog(id: string) {
    this.db
      .collection('backlog')
      .doc(id)
      .ref.get()
      .then(querySnapshot => {
        querySnapshot.ref
          .delete()
          .then(() => {
            console.log('Document successfully deleted from Backlog');
          })
          .catch(err =>
            console.log('Error removing document from Backlog', err)
          );
      });
  }
}
