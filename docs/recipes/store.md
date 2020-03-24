# Base Store Receipes

* [Angular Implementation](#angular-implementation) - Basic usage for an Angular application. Can easily be modified to fit the specific framework. 
* [Dynamic Store](#dynamic-store) - Create "mini" stores for different areas of your application

## Angular Implementation

This is for Angular 2+, but can easily be changed to fit any framework (or even no framework). 

#### Overview

This will be a "Todo" application just to keep things simple. It will load data (Todos) from the server, display them to the user, and allow the user to delete them. 

#### Application Files

The following directory structure: 

```
.
└── src
    ├── app.module.ts
    ├── app.component.ts
    ├── app.component.html
    ├── app.store.ts
    └── app.service.ts
```

**app.store.ts**

Define our application's state and expose public methods for services/component to change that state. 

``` ts
import { BaseStore } from 'rxjs-util-classes';
import { Injectable } from '@angular/core';

export interface ITodo {
  id: string;
  item: string;
  description: string;
}

export interface IAppState {
  isLoading: boolean;
  todos: ITodo[];
}

@Injectable({ providedIn: 'root' })
export class AppStore extends BaseStore<IAppState> {

  /* set initial state */
  constructor () {
    super({
      isLoading: false,
      todos: []
    });
  }

  /* here define methods to allow services/components the 
    ability to change the app's state */
    
  public setIsLoading (isLoading: boolean): void {
    this._dispatch({ isLoading });
  }

  public setTodos (todos: ITodo[]): void {
    this._dispatch({ todos });
  }

  public deleteTodo (todo: ITodo): void {
    /* get the current todos */
    const currentTodos = this.getState().todos;
    /* only keep todos that do not have the same id as the one passed in */
    const newTodos = currentTodos.filter(t => t.id !== todo.id);
    /* set the todos to the new list */
    this.setTodos(newTodos);
  }

}
```

**app.service.ts**

A simple service that loads and/or deletes data from a server.

``` ts
import { Injectable } from '@angular/core';
import { AppStore, ITodo } from './app.store';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const todosFromServer: ITodo[] = [
  { id: 't1', item: 'Go to store', description: 'Need to get green eggs and ham' },
  { id: 't2', item: 'Fix roof', description: 'Pesky roof is leaking again' },
  { id: 't3', item: 'Soccer', description: 'Take the kids to soccer practice' }
];

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor (private appStore: AppStore) { }

  public loadAllTodos (): void {
    this.appStore.setIsLoading(true);
    /* mock a http GET call */
    of(todosFromServer)
      .pipe(delay(500)).subscribe(todos => {
        this.appStore.setTodos(todos);
        this.appStore.setIsLoading(false);
      });
  }

  public deleteTodo (todo: ITodo): void {
    this.appStore.setIsLoading(true);
    /* mock http DELETE call */
    of()
      .pipe(delay(200))
      .subscribe(() => {
        this.appStore.deleteTodo(todo);
        this.appStore.setIsLoading(false);
      });
  }
}
```

**app.component.html**

Component that will show a loading spinner if data is being loaded, and will show all items of data. 

``` html
<div class="loading-spinner" *ngIf="state?.isLoading">
  Loading...
</div>
<div class="card">
  <h4>Todo List</h4>
  <div class="todo-item" *ngFor="let todo of state?.todos">
    <h6>{{todo?.item}}</h6>
    <p>{{todo?.description}}</p>
    <button (click)="deleteTodo(todo)" type="button">Delete</button>
  </div>
</div>
```

**app.component.ts**

Component that will watch the state, load the data, display the data, and allow for users to delete data. 

``` ts
import { Component } from '@angular/core';
import { AppStore, IAppState, ITodo } from './app.store';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public state: IAppState;

  constructor (
    private appStore: AppStore,
    private appService: AppService,
  ) { }

  ngOnInit () {
    /* subscribe to state changes */
    this.appStore.getState$().subscribe(state => {
      this.state = state;
    });
    /* request all todos; once loaded, 
      we will receive them in the `getState$()` observable */
    this.appService.loadAllTodos();
  }

  deleteTodo (todo: ITodo) {
    this.appService.deleteTodo(todo);
  }

}
```


## Dynamic Store

Have the ability to have mutliple stores throughout your application. 
These can be dynamically created and passed around while still ensuring 
the state is only modified through the store. 

#### Use Case (Chat Application)

Let's say there is a chat application that can have "chat rooms". A user can have multiple
rooms. Rooms can consist of person-to-person chats or group chats. 

#### Overview

We will create a "room-store" for each chat room. This will allow use of stores 
without having to wire up a complex app wide state each time we add/remove a chat-room. 
It will also allow for getter reuse of components. 

#### Application Files

Todo: write theses 
