<h1 id='mock'>Mock 数据</h1>

---

支持不依赖后端，本地方便调试数据。

<h2 id='principle'>实现原理</h2>

实现前后端的我们需要将 data 文件和 service 文件分隔开。
在`TinyPro of Ng`中，我们在`src/app/@core/data`中定义数据的类型，同时在`src/app/@core/mock`中实现相关的 service 文件。

下面以头部通知消息为例，介绍 Mock 数据的使用。  
首先需要在`data/noticeData.ts`文件中定义通知消息的数据类型：

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

在`mock/notice-data.service.ts`文件中我们实现 NoticeDataService 定义具体要模拟的数据。

```ts
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { Notification, NoticeData } from '../data/noticeData';
import { HeaderNoticeI18nPrefix } from '@shared/tiny-pro';

@Injectable()
export class NoticeDataService extends NoticeData {
  // 定义需要模拟的数据
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

  // 实现抽象类方法获得数据
  getNotifications(): Observable<Notification[]> {
    return observableOf(this.notifications);
  }
}
```

<h2 id='make'>项目中使用</h2>

在`src/app/@core/mock/mock-data.module.ts`中引入你的 service：

```ts
const SERVICES = [
  ...,
  NoticeDataService,
  ...,
];
```

同时需要在`core.module.ts`中引入对应的 Data 和 Service 文件：

```ts
import { NoticeData } from './data/noticeData';
import { NoticeDataService } from './mock/notice-data.service';

const DATA_SERVICES = [
  ...,
  { provide: NoticeData, useClass: NoticeDataService},
  ...,
];
```

在`header-notice.component.ts`文件中我们引入对应的 Service 文件：

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

notifications 的数据即可在页面模板中使用。

完成上述步骤之后，头部通知栏的展示效果如下：

![message.jpg](/src/assets/images/ng-pro/message-center.png)
