import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-imageeditor',
  templateUrl: 'imageeditor.html'
})
export class ImageeditorPage implements OnInit {
  buildings: Array<any>;
  constructor(public navCtrl: NavController) {

  }
  featherEditor: any;
  stage: any;
  src: string;
  savetax: boolean;
  swipe:number;
  ngOnInit() {
    this.src = "../../assets/img/4.jpeg";
    this.savetax = true;
    this.swipe = 0;
  }
  inserttxtclick() {
    var canvas: any;
    var now = new Date();
    var text = 'XXX 拍摄于 ' + now.toLocaleDateString() + "  " + now.toLocaleTimeString();
    
    canvas = document.getElementById("myCanvas");
    
    var context: any;
    context = canvas.getContext("2d");
    var image = new Image();
    image.onload = val => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.save();
      context.font = 15 + "px Arial";
      context.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
      context.textAlign = 'right-side';
      //var tw = cxt.measureText(text).width;
      var ftop = canvas.height - 15;
      var fleft = canvas.width / 2;
      context.fillStyle = "#ffffff";
      context.fillText(text, fleft, ftop);//文本元素在画布居中方式
      context.save();
      console.log(canvas.toDataURL());
      this.src = canvas.toDataURL();
      this.savetax = false;
    }
    image.crossOrigin = "*";
    image.src = this.src;

  }

  stageclick(e: MouseEvent) {
    var jQuery = window['jQuery'];
    var Aviary = window['Aviary'];
    var featherEditor = new Aviary.Feather({
      apiKey: 'hhong@iwstech.com',
      tools: 'all',                  //, 'stickers'
      onSave: function (imageid, urlsrc) {
        // let img = document.getElementById(imageid);
        // let $img = jQuery(img);
        // $img.src = urlsrc;  
        this.src = urlsrc;
        console.log(this.src);
        return false;
        // var canvas :any;
        // canvas = document.getElementById("myCanvas");  
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight; 
        // var context:any;
        // context = canvas.getContext("2d"); 
        // var image = new Image();
        //     image.onload = val => {
        //       context.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
        //       console.log(canvas.toDataURL());
        //     }
        //     image.crossOrigin = "*";
        //     image.src = this.src;                    
      }
      // onSaveButtonClicked:function(imageid){

      //   return false;
      // }
    });
    this.featherEditor = featherEditor.launch({ image: 'editableimage1' });
    //
    //return this.featherEditor;
  }

  swipeEvent(e) {
    this.swipe++;
    console.log(this.swipe);
  }
}
