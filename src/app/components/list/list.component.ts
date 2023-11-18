import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  tasks: Task[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('tasks');
    if (data) {
      this.tasks = JSON.parse(data);
    } else {
      this.tasks = [];
    }
  }
}
