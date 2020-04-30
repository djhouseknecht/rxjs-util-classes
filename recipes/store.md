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
    this.dispatch({ isLoading });
  }

  public setTodos (todos: ITodo[]): void {
    this.dispatch({ todos });
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

_\*This example is an Angular application, but the concepts are the framework agnostic._

The following directory: 

```
.
└── src
    ├── chat
    │   ├── chat.component.html
    │   ├── chat.component.ts
    │   └── chat.service.ts
    ├── app.component.ts
    ├── app.module.ts
    └── models.ts
```

First, we will look at our models and app.component 

**models.ts**
``` ts
/** user in a chat room*/
export interface IUser {
  name: string;
  id: string;
}

/** chat message object */
export interface IChatMessage {
  roomId: string;
  message: string;
  fromUser: IUser;
  timestamp: Date;
}

/** the state for a given chat room */
export interface IChatRoomState {
  roomId: string;
  users: IUser[];
  messages: IChatMessage[];
}
```

**app.component.ts**
``` ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  /* loop through all our chat rooms and 
      pass in the roomId */
  template: `
    <app-chat *ngFor="let roomId of chatRooms" [roomId]="roomId"></app-chat>
  `
})
export class AppComponent {
  /* These are all the rooms the user is a part of.
      In a real application, this would be in its own
      service (or store). But for this example, we will
      just assume the user is already a part of these rooms
      when the application loads */
  public chatRooms: string[] = [
    'room-id-123',
    'room-id-456',
    'room-id-789'
  ];
}
```

Now we are going to look at our Chat Room Service. This service will manage all
the chat room stores and dynamically create them as needed. 

**chat.service.ts**
``` ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseStore } from 'rxjs-util-classes';

import { IChatRoomState, IChatMessage } from '../models';

/**
 * Create a private Chat Store only accessible by the 
 *  ChatService. 
 * This could be moved to a separate file, leaving it here for 
 *  simplicity
 */
class ChatStore extends BaseStore<IChatRoomState> {
  constructor (roomId: string) {
    /* initialize default chat-room state */
    super({ roomId, users: [], messages: [] });
  }

  /* =====================================
   * expose methods for the service to use  
   * ===================================== */

  public sendMessage (message: IChatMessage): void {
    /* add the message to the messages 
      (we want to keep the state immutable, which is why we are copying) */
    this.dispatch({ messages: [...this.getState().messages, message] });
  }
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  /* hold a map of all our chat room stores */
  private rooms: Map<string, ChatStore> = new Map();

  /* mock a WebSocket connection (to receive/send chats) */
  private webSocket: WebSocket = new WebSocket('ws://my.website.com:443/chat');

  constructor () {
    /* mock WebSocket chat traffic */
    this.webSocket.addEventListener('message', (event: MessageEvent) => {
      event.preventDefault();
      const chatData = event.data as IChatMessage;
      /* if we have a room, send the message to it */
      if (this.rooms.has(chatData.roomId)) {
        this.getOrInitRoom(chatData.roomId).sendMessage(chatData);
      }
    });
  }

  /* =================================
   * expose methods for the app to use  
   * ================================= */

  /**
   * Expose a chat room state (synchronously)
   */
  public getRoomState (roomId: string): IChatRoomState {
    return this.getOrInitRoom(roomId).getState();
  }

  /**
   * Expose a single chat room state so multiple components
   *  can all listen to the same state
   */
  public getRoomState$ (roomId: string): Observable<IChatRoomState> {
    return this.getOrInitRoom(roomId).getState$();
  }

  /**
   * Send a message to the server to join the room
   *  and then return the room's state
   */
  public joinRoom$ (roomId: string): Observable<IChatRoomState> {
    /* mock sending a message to the server to join a room */
    this.webSocket.send(JSON.stringify({ joinRoom: true, roomId }));
    /* return  */
    return this.getRoomState$(roomId);
  }

  /**
   * Send a message to a room
   */
  public sendMessage(message: IChatMessage): void {
    /* mock sending a message to the server */
    this.webSocket.send(JSON.stringify(message));

    this.getOrInitRoom(message.roomId).sendMessage(message);
  }

  /**
   * When we leave a chat room, destroy the 
   *  associated store
   */
  public leaveRoom (roomId: string): void {
    const store = this.getOrInitRoom(roomId);
    /* this will call `.complete()` on the underlying observable */
    store.destroy();
    /* remove it from our local list of rooms */
    this.rooms.delete(roomId);
  }

  /**
   * This will get or create a chat store in our local map 
   */
  private getOrInitRoom (roomId: string): ChatStore {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new ChatStore(roomId));
    }
    return this.rooms.get(roomId);
  }
}
```

Finally, let's look at how components subscribe to the state for a specific chat room. 

**chat.component.ts**

``` ts
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import { IChatRoomState } from '../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input()
  public roomId: string;

  public state: IChatRoomState;

  constructor (private chatService: ChatService) { }

  ngOnInit () {
    /* joining a room will subscribe to the room's state */
    this.chatService.joinRoom$(this.roomId)
      .subscribe(state => {
        this.state = state;
      });
  }

  sendMessage () {
    /* send a message to the room */
    this.chatService.sendMessage({
      message: this.newMessage,
      roomId: this.roomId,
      timestamp: new Date(),
      /* we would want to use our actual user */
      fromUser: { name: 'Bob Smith', id: 'user-145' }
    });
    this.newMessage = '';
  }


  ngOnDestroy () {
    /* leave the room when the component is destroyed */
    this.chatService.leaveRoom(this.roomId);
  }

}
```

**chat.component.html**

```html
<h4>Chat Room {{state.roomId}}</h4>

<div *ngFor="let messageObj of state.messages">
  <p>From: {{messageObj.fromUser.name}}</p>
  <p>{{messageObj.message}}</p>
  <p>sent at: {{messageObj.timestamp}}</p>
</div>

<div>
  <input type="text" [(ngModel)]="newMessage">
  <button (click)="sendMessage()">Send Message</button>
</div>
```

With this setup, another component could easily listen to a room's state changes 
by calling `chatService.getRoomState$(roomId)`.