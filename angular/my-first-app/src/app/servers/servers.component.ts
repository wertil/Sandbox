import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = "no server was created";
  serverName = 'Test Server';
  serverCreated = false;
  servers = [ 'TestServer', 'TestServer 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    },2000)
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreationStatus = `server ${this.serverName} was created!`;
    this.servers.push(this.serverName);
    this.serverCreated = true;
  }

}
