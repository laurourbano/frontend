import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [
    { title: 'First task', done: false },
    { title: 'Second task', done: false },
    { title: 'Third task', done: false },
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
