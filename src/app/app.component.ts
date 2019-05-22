import { Component, OnInit } from '@angular/core';
import { HttpLayerService } from './services/http-layer.service';
import { Guid } from 'guid-typescript';
import { Config } from './config/config';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpLayerService]
})
export class AppComponent implements OnInit {

  private readonly notifier: NotifierService;
  public listItems = [];
  public newItem: string;
  public showNewItem = false;
  constructor(
    public httpLayer: HttpLayerService,
    notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.fetchList();
  }

  fetchList() {
    this.httpLayer.get(Config.CONFIG_IDENTIFIER.FETCH_LIST).subscribe(
      (data) => {
        if (data['status'] === 'success') {
          this.listItems = data['result'];
        } else {
          this.listItems = [];
        }
      }
    );
  }

  toggleNewItem() {
    this.showNewItem = !this.showNewItem;
    this.newItem = '';
  }

  addNewItem() {
    const item = {};
    const id = Guid.create();
    item['id'] = id['value'];
    item['description'] = this.newItem;
    item['timeStamp'] = new Date().toUTCString();
    this.httpLayer.post(Config.CONFIG_IDENTIFIER.INSERT_ITEM, item).subscribe(
      (data) => {
        if (data['status'] === 'success') {
          this.listItems.push(item);
          this.showNewItem = false;
          this.newItem = '';
          this.notifier.notify('success', data['result']);
        } else {
          this.showNewItem = false;
          this.newItem = '';
          this.notifier.notify('error', data['result']);
        }
      }
    );
  }

  deleteItem(data) {
    this.listItems.forEach((item, i) => {
      if (item['id'] === data['id']) {
        this.httpLayer.post(Config.CONFIG_IDENTIFIER.DELETE_ITEM, data).subscribe(
          (result) => {
            if (result['status'] === 'success') {
              this.listItems.splice(i, 1);
              this.notifier.notify('success', result['result']);
            } else {
              this.notifier.notify('error', result['result']);
            }
          }
        );
        return;
      }
    });
  }

  deleteAll() {
    this.httpLayer.post(Config.CONFIG_IDENTIFIER.DELETE_ALL, {}).subscribe(
      (data) => {
        if (data['status'] === 'success') {
          this.listItems = [];
          this.notifier.notify('success', data['result']);
        } else {
          this.notifier.notify('error', data['result']);
        }
      }
    );
  }

}
