import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ChatInformation } from 'src/app/common/chat-information';
import { Pagination } from 'src/app/common/pagination';
import { HttpResponseData } from 'src/app/common/http-response-data';

@Injectable()
export class ChatInformationService extends HttpService<ChatInformation> {

  private URL = 'chatInformation';

  getReceiveChatInformationList(pagination: Pagination<ChatInformation>) {
    const url = `${this.URL}/receive/2/${pagination.pages}/${pagination.size}`;
    return super.getPagination(url);
  }

  getSendChatInformationList(pagination: Pagination<ChatInformation>) {
    const url = `${this.URL}/send/${pagination.pages}/${pagination.size}`;
    return super.getPagination(url);
  }

  getUnreadChatInformation(pagination: Pagination<ChatInformation>) {
    const url = `${this.URL}/receive/0/${pagination.pages}/${pagination.size}`;
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
