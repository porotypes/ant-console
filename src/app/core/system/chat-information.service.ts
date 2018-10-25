import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { ChatInformation } from 'src/app/common/chat-information';
import { Pagination } from 'src/app/common/pagination';

@Injectable()
export class ChatInformationService extends HttpService<ChatInformation> {

  private URL = 'chatInformation';
  getList: EventEmitter<any> = new EventEmitter();

  getReceiveChatInformationList(pagination: Pagination<ChatInformation>) {
    const url = `${this.URL}/receive/2/${pagination.current}/${pagination.size}`;
    return super.getPagination(url);
  }

  getSendChatInformationList(pagination: Pagination<ChatInformation>) {
    const url = `${this.URL}/send/${pagination.current}/${pagination.size}`;
    return super.getPagination(url);
  }

  getUnreadChatInformation(pagination: Pagination<ChatInformation>) {
    const url = `${this.URL}/receive/0/${pagination.current}/${pagination.size}`;
    return super.getPagination(url);
  }

  getChatInformation(id: number) {
    const url = `${this.URL}/${id}`;
    return super.get(url);
  }

  sendChatInformation(data: ChatInformation) {
    return super.post(this.URL, data);
  }

}
