export const getDemoLog = () => {
  return `import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild
} from "@angular/core";
@Component({
  selector: "demo-log",
  template: \`<div #log class="event-log-container">
  <p *ngFor="let log of logs; let i = index">{{ i + " " + log }}</p>
</div>\`,
  styles: [
    \`.event-log-container {
        max-height: 220px;
        font-size: var(--ti-common-font-size-base);
        overflow-y: auto;
        padding: var(--ti-common-space-2x);
        margin-top: var(--ti-common-space-2x);
        background-color: rgba(243, 244, 246);
        &:empty {
          margin-top: 0px;
          padding: 0px;
        }
      }
    \`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLogComponent {
  @Input() logs: Array<any>;
  @ViewChild("log", { static: true }) logRef: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["logs"]) {
      // 手动更新一次视图，使可以滚动到最底部
      this.changeDetectorRef.detectChanges();
      this.logRef.nativeElement.scrollTop = 100000;
    }
  }
}`;
};
