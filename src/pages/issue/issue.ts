import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalStorage } from '../../providers/local-storage';
import { NativeService } from "../../providers/nativeservice";

@Component({
	selector: 'page-issue',
	templateUrl: 'issue.html'
})
export class IssuePage {
	titlename: string;
	section: string;
	checkitem: string;
	itdesc: string;
	descplus: string;
	uglevel: string;
	vend: string;
	resunit: string;
	sections: Array<string>;
	checkitems: Array<string>;
	itemdescs: Array<Array<string>>;
	itemdesc: Array<string>;
	urgencylevel: Array<string>;
	vendors: Array<string>;
	responsibilityunit: Array<string>;
	images: Array<string>;
	registertime: string;
	duetime: string;
	issueid: string;
	issue_x: number;
	issue_y: number;
	roodid: string;
	savetax: boolean;
	url: string;
	bigImage: boolean;	
	mousestouch:Array<any>;
	onPaint: any;
	canvas: any;
	context: any;
	buildingname: string;
	imageC : any;
	constructor(public localStorage: LocalStorage, private camera: Camera, public navCtrl: NavController, public alertCtrl: AlertController,
		public params: NavParams, private nativeService: NativeService) {
		this.sections = ["厨房", "餐厅", "客厅", "阳台", "主卧", "次卧", "公用卫生间", "主卧卫生间"];
		this.checkitems = ["插座", "灯具(户内)", "多媒体箱", "给排水管(立管与支管)", "红外探测器", "开关", "空调百叶", "空调洞口", "空调机位", "楼板(顶棚、地面)", "门头石"];
		this.itemdescs = [["布局不合理", "高低不一致", "松动", "损伤", "歪斜", "位置不合理", "污染", "型号安装错误", "遗漏或数量少", "周边墙面凹凸、不平整"]
			, ["灯不亮", "灯具缺损", "灯具位置不合理", "数量不合理", "其他"]
			, ["部件缺失", "锁缺失", "箱门变形、损坏", "线路不通", "布线杂乱"]
			, ["出水不洁净", "给水管渗漏"]];
		this.urgencylevel = ["一般", "紧急"];
		this.vendors = ["八达建设", "柏事特", "甲方", "盼盼安全门", "通力电梯", "维度化工"];
		this.responsibilityunit = ["八达建设", "柏事特", "甲方", "盼盼安全门", "通力电梯", "维度化工"];
		this.images = [];
		this.mousestouch = [];
		this.imageC = new Image();
		this.roodid = this.params.get('roomid');
		this.section = this.params.get('section');
		this.issue_x = this.params.get('x');
		this.issue_y = this.params.get('y');
		let val: any;
		this.localStorage.getItem(this.roodid).then(
			val => {
				this.localStorage.getItem("buildings").then(
					v1 => {
						let buildA: Array<any>;
						buildA = v1;
						buildA.forEach(v2 => {
							if (v2.buildingid == val.buildingid)
								this.buildingname = v2.name;
						})
					})
				this.localStorage.getItem(val.drawingid).then(
					v1 => {
						this.sections = v1.sections;
						this.localStorage.getItem("b" + val.buildingid + "f" + val.floorid).then(
							v => {
								let rooms: Array<any>;
								rooms = v;
								rooms.forEach(v2 => {
									if (v2.roomid == this.roodid)
										this.titlename = v2.name;
								});
							}
						)
					})
			})
		this.checkitem = '';
		this.itdesc = '';
		this.descplus = '';
		this.uglevel = '';
		this.vend = '';
		this.resunit = '';
		this.issueid = '';
		this.savetax = true;
		this.bigImage = false;
	}

	itemchange() {
		var index = this.checkitems.indexOf(this.checkitem);
		if (index > 4)
			this.itemdesc = ["布局不合理", "高低不一致", "松动", "损伤", "歪斜", "位置不合理", "污染", "型号安装错误", "遗漏或数量少"];
		else
			this.itemdesc = this.itemdescs[index];
	}


	cameraclick() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			var src = 'data:image/jpeg;base64,' + imageData;
			this.savetax = true;
			var image = new Image();
			image.onload = val => {
				document.getElementById("canvasdisplay").style.display = "";
				this.canvas = document.getElementById("myCanvas");
				//this.canvas.width = 1;
				//this.canvas.height = 1;
				this.context = this.canvas.getContext("2d");
				this.context.lineWidth = 3;
				this.context.lineJoin = 'round';
				this.context.lineCap = 'round';
				this.context.strokeStyle = '#ff0000';
				var mouse: any;
	            var mouses: Array<any>;
				mouse = { x: 0, y: 0 };
				mouses = [];
				this.mousestouch = [];
				//this.painting = document.getElementById('paint');
				// this.onPaint = val => {
				// 	this.context.lineTo(this.mouse.x, this.mouse.y);
				// 	this.context.stroke();
				// }

				this.canvas.addEventListener('touchmove', (event) => {					
					mouse.x = event.changedTouches[0].pageX - this.canvas.offsetLeft;
					mouse.y = event.changedTouches[0].pageY - this.canvas.offsetTop;
					mouses.push({x:mouse.x,y:mouse.y});								
				}, false);

				this.canvas.addEventListener('touchstart', (event) => {
					this.context.strokeStyle = '#ff0000';
					//this.context.beginPath();					
					mouse ={ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };  
					this.context.moveTo(mouse.x, mouse.y);
					//console.log(mouses);
                    mouses = [{x:mouse.x,y:mouse.y}];										
					this.canvas.addEventListener('touchmove', (event) => {							
						this.context.lineTo(mouse.x, mouse.y);
						this.context.stroke();
					}, false);
				}, false);

				this.canvas.addEventListener('touchend', (event) => {
					this.canvas.removeEventListener('touchmove', (event) => {						
						this.context.lineTo(mouse.x, mouse.y);
						this.context.stroke();																	
					}, false);
                    this.mousestouch.push(mouses);
					mouses = [];
				}, false);
				this.canvas.width = 330;//window.innerWidth;// image.width;
				this.canvas.height = 430;//window.innerHeight;//image.height-20;
				this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
				this.context.save();		
			}
			image.crossOrigin = "*";
			image.src = src;
			this.imageC.src = src;
		}, (err) => {
			// Handle error
		});

	}

    imageeditclick() {
		this.context.font = 15 + "px Arial";
		this.context.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
		this.context.textAlign = 'right-side';
		//var tw = cxt.measureText(text).width;
		var ftop = this.canvas.height - 15;
		var fleft = this.canvas.width / 5;
		var now = new Date();
		var text = '黄宏拍摄于 ' + now.toLocaleDateString() + "  " + now.toLocaleTimeString();
		this.context.fillStyle = "#ffffff";
		this.context.fillText(text, fleft, ftop);//文本元素在画布居中方式
		this.context.save();
		let newsrc = this.canvas.toDataURL('image/jpeg', 0.78);
		this.images.push(newsrc);//'data:image/jpeg;base64,' + imageData);										
		this.savetax = false;
		this.context.clearRect(0, 0, this.context.width, this.context.height);
		document.getElementById("canvasdisplay").style.display = "none";	
	}

    redrawclick(){
        this.context.clearRect(0, 0, this.context.width, this.context.height);
		this.context.drawImage(this.imageC, 0, 0, this.canvas.width, this.canvas.height);		
		this.mousestouch.pop();	
		var mouse: any;
	    var mouses: Array<any>;
		mouses = [];
		for (var i = 0; i < this.mousestouch.length; i++)
		{
			mouses = this.mousestouch[i];
			mouse = mouses[0];
			this.context.strokeStyle = '#ff0000';		    
			this.context.moveTo(mouse.x, mouse.y);
			this.context.beginPath();
			for (var j =1; j < mouses.length; j++)
			{
				mouse = mouses[j];
				this.context.lineTo(mouse.x, mouse.y);
			    this.context.stroke();
			}			
		}
		this.context.save();
	}

	getPicture(type) {//1拍照,0从图库选择
		let options = {
			targetWidth: window.outerWidth,
			targetHeight: window.outerHeight
		};
		if (type == 1) {
			this.nativeService.getPictureByCamera(options).then(imageBase64 => {
				var src = 'data:image/png;base64,' + imageBase64;
				var canvas: any;
				var now = new Date();
				var text = '黄宏拍摄于 ' + now.toLocaleDateString() + "  " + now.toLocaleTimeString();
				this.savetax = true;
				canvas = document.getElementById("myCanvas");
				var context: any;
				context = canvas.getContext("2d");
				//context.clearRect(0, 0, context.width, context.height);				
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
					var fleft = canvas.width / 5;
					context.fillStyle = "#ffffff";
					context.fillText(text, fleft, ftop);//文本元素在画布居中方式
					context.save();
					//console.log(canvas.toDataURL());
					this.images.push(canvas.toDataURL());//'data:image/jpeg;base64,' + imageBase64);	
					//context.clearRect(0, 0, context.width, context.height);				
					this.savetax = false;
					context.clearRect(0, 0, context.width, context.height);
				}
				image.crossOrigin = "*";
				image.src = src;
				
			}, (err) => {

			});
		}
	}

	//   private getPictureSuccess(imageBase64) {
	//     this.isChange = true;        	
	// 	this.images.push('data:image/jpeg;base64,' + imageBase64);

	//   }

	//   saveAvatar() {
	//     if (this.isChange) {
	//       console.log(this.imageBase64);//这是头像数据.
	//       this.nativeService.showLoading('正在上传....');
	//       this.viewCtrl.dismiss({avatarPath: this.avatarPath});//这里可以把头像传出去.
	//     } else {
	//       this.dismiss();
	//     }
	//   }

	//   dismiss() {
	//     this.viewCtrl.dismiss();
	//   }


	ionViewWillEnter() {

	}



	uploaddata() {
		let now = new Date();
		let duedate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

		// let i:number;
		// i=1;
		let imgss = [];
		this.images.forEach(val => {
			let keystr = "img_s" + now.valueOf() + Math.random();
			this.localStorage.setItem(keystr, val);
			imgss.push(keystr);
		})
		let issuelist: any;
		issuelist = {
			sections: this.section, x: this.issue_x, y: this.issue_y, status: 1, checkitem: this.checkitem, itdesc: this.itdesc, descplus: this.descplus, uglevel: this.uglevel,
			vend: this.vend, responsibility: this.resunit, registertime: now.toLocaleDateString() + "  " + now.toLocaleTimeString(), duetime: duedate.toLocaleDateString(), imgssumbit: imgss
		};
		this.issueid = '' + now.valueOf() + Math.random();
		//this.localStorage.removeitem(this.issueid);
		this.localStorage.setItem('issue' + this.issueid, issuelist);

		let roomlist: any;
		this.localStorage.getItem(this.roodid).then(
			val => {
				roomlist = val;
				roomlist.status = '待整改';
				//roomlist.sections.push(this.section);
				roomlist.issues.push({ issueid: this.issueid, status: "待派单" });
				//this.localStorage.removeitem(this.roodid);
				this.localStorage.setItem(this.roodid, roomlist);
				this.navCtrl.pop();
			})

	}

	deleteimage(imagesrc){
		let i = 0;
		this.images.forEach(element => {
			if (element == imagesrc)
			    this.images.splice(i,1);
		    i++;
		});		
	}
	//点击图片放大
    shouBigImage(imageName) {  //传递一个参数（图片的URl）
		this.url = imageName;                   //$scope定义一个变量Url，这里会在大图出现后再次点击隐藏大图使用
		this.bigImage = true;                   //显示大图		
    };

	hideBigImage() {
		this.bigImage = false;
	};
}
