import { Component, OnInit } from '@angular/core';
import { ChatInformationService } from '../../core/system/chat-information.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';
import { StorageService } from '../../core/storage.service';
import { LoginService } from '../../core/auth/login.service';

import { ChatInformation } from '../../common/chat-information';
import { Pagination } from 'src/app/common/pagination';
import { HttpResponseData } from 'src/app/common/http-response-data';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.css']
})
export class CustomerServiceComponent implements OnInit {

  receivePagination = new Pagination<ChatInformation>();
  sendPagination = new Pagination<ChatInformation>();
  isShowDialog = false;
  content: string;
  information: ChatInformation;
  isSending = false;

  get isLangOfZh(): boolean {
    return this.storageService.readStorage('language') === 'zh_CN';
  }

  constructor(
    private chatInformationService: ChatInformationService,
    private messageService: NzMessageService,
    public authService: AuthService,
    private languageService: LanguageService,
    private loginService: LoginService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getChatInformationList();
    this.getSendChatInformationList();
  }

  getChatInformationList() {
    this.chatInformationService.getReceiveChatInformationList(this.receivePagination).subscribe(
      (res: HttpResponseData<Pagination<ChatInformation>>) => {
        if (res.status === 200) {
          this.receivePagination = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  getSendChatInformationList() {
    this.chatInformationService.getSendChatInformationList(this.sendPagination).subscribe(
      (res: HttpResponseData<Pagination<ChatInformation>>) => {
        if (res.status === 200) {
          this.sendPagination = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  receivePageChange(page: number) {
    if (page === 0) {
      return;
    }
    this.receivePagination.current = page;
    this.getChatInformationList();
  }

  receivePageSizeChange(size: number) {
    if (size === 0) {
      return;
    }
    this.receivePagination.size = size;
    this.getChatInformationList();
  }

  sendPageChange(page: number) {
    if (page === 0) {
      return;
    }
    this.sendPagination.current = page;
    this.getSendChatInformationList();
  }

  sendPageSizeChange(size: number) {
    if (size === 0) {
      return;
    }
    this.sendPagination.size = size;
    this.getSendChatInformationList();
  }

  openDialog(information: ChatInformation = null) {
    if (information) {
      this.information = information;
    }
    this.isShowDialog = true;
  }

  closeDialog() {
    this.isShowDialog = false;
  }

  send() {
    if (this.content.trim() === '') {
      if (this.languageService.currentLang === 'zh_CN') {
        this.messageService.warning('请输入有效内容!');
      } else {
        this.messageService.warning('Please enter valid content!');
      }
      return;
    }
    this.isSending = true;
    if (this.information) {
      this.patchChatInformation(this.information);
    }
    this.sendInformation();
  }

  patchChatInformation(information: ChatInformation) {
    this.chatInformationService.getChatInformation(information.id).subscribe(
      (res: HttpResponseData<ChatInformation>) => {
        if (res.status === 200) {
          this.chatInformationService.getList.emit();
          this.getChatInformationList();
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
      }
    );
  }

  sendInformation() {
    const obj = new ChatInformation();
    obj.content = this.content;
    obj.receiver = this.information ? this.information.sender : null;
    this.chatInformationService.sendChatInformation(obj).subscribe(
      (res: HttpResponseData<ChatInformation>) => {
        this.isSending = false;
        if (res.status === 200) {
          if (this.languageService.currentLang === 'zh_CN') {
            this.messageService.success('消息发送成功!');
          } else {
            this.messageService.success('seet message success!');
          }
          this.isShowDialog = false;
          this.content = '';
          this.information = null;
          this.getSendChatInformationList();
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.isSending = false;
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

}
