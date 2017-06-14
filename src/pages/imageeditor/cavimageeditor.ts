import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-cavimageeditor',
  templateUrl: 'cavimageeditor.html'
})
export class CavimageeditorPage implements OnInit {
  buildings: Array<any>;
  canvas: any;
  context: any;
  painting: any;
  paint_style: any;
  mouse: any;
  touchstart: number;
  touchmove: number;
  touchend: number;
  onPaint: any;
  constructor(public navCtrl: NavController) {

  }
  featherEditor: any;
  stage: any;
  ngOnInit() {
    this.touchend = 0;
    this.touchmove = 0;
    this.touchstart = 0;
    this.canvas = document.getElementById("myCanvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    this.context.lineWidth = 3;
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#00CC99';
    this.mouse ={ x: 0, y: 0 };
    this.mouse.x =0;
    this.mouse.y =0;
    this.painting = document.getElementById('paint');

    var image = new Image();
    image.onload = val => {
      this.context.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
    }

    image.src = '../../assets/img/4.jpeg';
    this.onPaint = val=>{
      this.context.lineTo(this.mouse.x,this.mouse.y);
      this.context.stroke();
    }

    this.canvas.addEventListener('touchmove', (event)=>{
          this.touchmove++;
          this.mouse.x = event.changedTouches[0].pageX - this.canvas.offsetLeft;
          this.mouse.y = event.changedTouches[0].pageY - this.canvas.offsetTop;  
        }, false);

    this.canvas.addEventListener('touchstart', (event)=>{
          this.touchstart++;
          this.context.beginPath();            
          this.mouse ={ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };   
              
          this.context.moveTo(this.mouse.x,this.mouse.y);          
          this.canvas.addEventListener('touchmove',(event)=>{
            this.context.lineTo(this.mouse.x,this.mouse.y);
            this.context.stroke();
          },false);       
        }, false);

     this.canvas.addEventListener('touchend', (event)=>{
          this.touchend++;
          this.canvas.removeEventListener('touchmove',(event)=>{
            this.context.lineTo(this.mouse.x,this.mouse.y);
            this.context.stroke();
            
          },false);             
        }, false);
  }
  
}
