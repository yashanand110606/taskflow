
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular assignment',
      priority: 'High',
      completed: false
    },
    {
      id: 2,
      title: 'Review project requirements',
      priority: 'Medium',
      completed: true
    },
    {
      id: 3,
      title: 'Prepare presentation',
      priority: 'Low',
      completed: false
    }
  ];

  newTitle = '';
  newPriority = 'Medium';
  searchText = '';
  filter = 'All';
  errorMessage = '';

  get completedCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      const matchesFilter =
        this.filter === 'All' ||
        (this.filter === 'Pending' && !task.completed) ||
        (this.filter === 'Completed' && task.completed);

      return matchesSearch && matchesFilter;
    });
  }

  addTask(): void {
    const title = this.newTitle.trim();

    if (!title) {
      this.errorMessage = 'Please enter a task name.';
      return;
    }

    this.tasks.unshift({
      id: Date.now(),
      title: title,
      priority: this.newPriority,
      completed: false
    });

    this.newTitle = '';
    this.newPriority = 'Medium';
    this.errorMessage = '';
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
