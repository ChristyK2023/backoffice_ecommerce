import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges{

  @Input() current: any = 1
  @Input() paginateLength: any = 7
  @Input() allCount: any = 5
  @Input() pageLimit: any = 5
  @Input() next: any | null = 2
  @Input() previous: any | null = null

  items: Array<any|String> = []
  min: any = 1
  max: any = 1

  @Output() pageSelected = new EventEmitter<number>();

  constructor () { }

  ngOnInit() {

    this.initPagination()

    //console.log(
      //{ current: this.current,
      //  allCount: this.allCount,
      //  pageLimit: this.pageLimit,
      //  next: this.next,
      //  previous: this.previous
      //});

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initPagination()
  }

  initPagination() {
    this.min = 1
    this.max = Math.ceil(this.allCount / this.pageLimit)

    if (this.paginateLength > this.max) {

      this.items = []
      for (let index = this.min; index <= this.max; index++) {
        this.items.push(index)
      }

    }else{

      this.items = [this.min, "<<", ">>", this.max]
      let index = 0
      let maxNewElement = this.paginateLength - this.items.length

      while (index < maxNewElement) {

        let value: any;

        if ((this.current > this.min) && (this.current < this.max)) {
          value = this.current+index - 1
        }
        if (this.current === this.max) {
          value = this.current+index - maxNewElement
        }

        if (this.current === this.min) {
          value = this.current+index + 1
        }

        this.items.splice(2+index, 0, value)
        index++

      }

    }

  }

  handleSetPage(page: any) {
    //console.log(page);

    let newPage: number = page
    if (page === "<<") {
      newPage = this.current - 1
    }

    if (page === ">>") {
      newPage = this.current + 1
    }

    if ((newPage >= this.min) && (newPage <= this.max)) {
      this.pageSelected.emit(newPage)
    }

  }

}
