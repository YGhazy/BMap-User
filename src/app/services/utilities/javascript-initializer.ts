import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})

//Loads custom JS files
export class JSInitializer {

  mainJsUrl = "main.js";
  scriptLoader!: Promise<unknown>;

  constructor() { }

  //initialize main.js 
  InitializeMainScript() {
    this.scriptLoader = new Promise(resolve => {
      this.AppendMainScript();
    });
  }

  //Initialize general javascript files
  InitializeScript(scriptName: string) {
    this.scriptLoader = new Promise(resolve => {
      this.AppendScript(scriptName);
    });
  }

  //Appends main.js to head tag as a child node
  public AppendScript(scriptName: string) {
    let node = document.createElement("script");
    node.src = 'assets/js/' + scriptName;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  //Appends general js files to head tag as a child node
  public AppendMainScript() {
    let node = document.createElement("script");
    node.src = 'assets/js/' + this.mainJsUrl;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  isMyScriptLoaded(node: any) {
    if (document.getElementsByTagName("head")[0].contains(node)) {
      return true;
    }
    else {
      return false;
    }
  }
}

