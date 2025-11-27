<h1 id='mock'>Mock Data</h1>

---

Supports data debugging independently of the backend and facilitates local data debugging.

<h2 id='principle'>Implementation Principle</h2>

To implement the frontend and backend, you need to separate the data file from the service file.
In `TinyPro of Ng`, we define the data type in `src/app/@core/data` and implement the related service file in `src/app/@core/mock`.

The following uses the header notification message as an example to describe how to use Mock data. 
Define the data type of the notification message in the `data/noticeData.ts` file.

```ts
import { Observable } from 'rxjs';

export interface Notification {
  title: string;
  time: string;
  id: string;
}
export abstract class NoticeData {
  abstract getNotifications(): Observable<Notification[]>;
}
```

In the `mock/notice-data.service.ts` file, we implement the NoticeDataService to define the data to be simulated.

```ts
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { Notification, NoticeData } from '../data/noticeData';
import { HeaderNoticeI18nPrefix } from '@shared/tiny-pro';

@Injectable()
export class NoticeDataService extends NoticeData {
  // Define the data to be simulated
  private notifications: Notification[] = [
    {
      id: '1',
      title: `${HeaderNoticeI18nPrefix}noticeTitle1`,
      time: `${HeaderNoticeI18nPrefix}time1`,
    },
    {
      id: '2',
      title: `${HeaderNoticeI18nPrefix}noticeTitle2`,
      time: `${HeaderNoticeI18nPrefix}time2`,
    },
    ...
  ];

  // Implement abstract class methods to obtain data
  getNotifications(): Observable<Notification[]> {
    return observableOf(this.notifications);
  }
}
```

<h2 id='make'>Used in the project</h2>

Introduce your service to the `src/app/@core/mock/mock-data.module.ts`：

```ts
const SERVICES = [
  ...,
  NoticeDataService,
  ...,
];
```

Import the corresponding Data and Service files to `core.module.ts`：

```ts
import { NoticeData } from './data/noticeData';
import { NoticeDataService } from './mock/notice-data.service';

const DATA_SERVICES = [
  ...,
  { provide: NoticeData, useClass: NoticeDataService},
  ...,
];
```

Import the corresponding service file to the `header-notice.component.ts` file：

```ts
import { NoticeDataService } from 'src/app/@core/mock/notice-data.service';
  constructor(
    private noticeService: NoticeDataService,
    ...
  ) {}

  ngOnInit() {
    this.noticeService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
      this.tProTrans.transform(this.notifications);
    });
  }
```

The data of notifications can be used in the page template.

After the preceding steps are complete, the notification bar in the header is displayed as follows：

![message.jpg](/src/assets/images/ng-pro/message-center.png)
