import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [
    { id: 1, title: 'First task', done: false },
    { id: 2, title: 'Second task', done: false },
    { id: 3, title: 'Third task', done: false },
    { id: 4, title: 'Fourth task', done: false },
    { id: 5, title: 'Fifth task', done: false },
    { id: 6, title: 'Sixth task', done: false },
    { id: 7, title: 'Seventh task', done: false },
    { id: 8, title: 'Eighth task', done: false },
    { id: 9, title: 'Ninth task', done: false },
    { id: 10, title: 'Tenth task', done: false },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFromStorage();
  }

  getAll() {
    return this.tasks;
  }

  getById(id: number) {
    const task = this.tasks.find((value) => value.id === id);
    return task;
  }

  save(task: Task) {
    if (task.id) {
      const taskArr = this.getById(task.id);
      taskArr!.title = task.title;
      taskArr!.done = task.done;
    } else {
      const lastId = this.tasks[this.tasks.length - 1].id;
      task.id = lastId! + 1;
      this.tasks.push(task);
      console.log(this.tasks);
    }
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex((value) => value.id === id);
    this.tasks.splice(taskIndex, 1);
  }

  markAsDone(task: Task) {
    task.done = true;
  }

  markAsUndone(task: Task) {
    task.done = false;
  }

  saveOnStorage() {
    const data = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', data);
  }

  loadFromStorage() {
    const data = localStorage.getItem('tasks');
    if (data) {
      this.tasks = JSON.parse(data);
    } else {
      this.tasks = [];
    }
  }
}
