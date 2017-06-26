import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

@Injectable()
export class initBaseDB {
  db: SQLiteObject;
  constructor(public http: Http, private sqlite: SQLite, public storage: Storage, private sqlitePorter: SQLitePorter) {
     
  }

  initdb(dbname: string, createflag: boolean) {
    
    this.sqlite.create({
      name: dbname,
      location: 'default'
    }).then((val: SQLiteObject) => {
      this.db = val;
      if (createflag)
      {
          this.initBaseTable("projver","Projid,version integer","");
          this.initBaseTable("buildingupdver","Projid,Building,Batchname,Version integer,Type integer","");
          this.initBaseTable("positions","Projid,Id,Name","");
          this.initBaseTable("apartments","Projid,Id,Image","");          
          this.initBaseTable("apartpostionlink","Projid,Apartmentid,Positionid,Id","");
          this.initBaseTable("apartpostiondraws","APlinkid,X integer,Y integer","");
          this.initBaseTable("checkitems","ProjId,Id,Name","");
          this.initBaseTable("checkitemdesc","ProjId,Checkitemid,Name,Timelimit integer,Sortcode integer","");
          this.initBaseTable("positionchecklink","Projid,Positionid,Checkitemid","");
          this.initBaseTable("vend","Id,NameAlias,Manager,Phone","http://117.29.177.122:9000/api/vend/");
          this.initBaseTable("vendcheckscope","Vendid,Projid,Checkitemid,Roomid","");
          this.initBaseTable("custsatisdim","Id,Type,Name,Sortcode integer","");
          //this.initBaseTable("","","");
      }
    }).catch(e => console.log(e));
  }

  initBaseTable(tablename,fields,url) {
    var $ = window['$'];
    var JSON = window['JSON'];
    this.db.executeSql("DROP TABLE IF EXISTS "+tablename,[]);     
    this.db.executeSql("CREATE TABLE "+tablename+" ("+fields+")",[]);    
    var json = {};
    $.ajax({
      url: url,
      type:'GET',
      dataType: 'json',
      success: (res)=> {
              console.log('Got AJAX response: ' + JSON.stringify(res));              
              json = {"data":{ "inserts":{ [tablename] :res}}};              
              console.log(json);
              this.sqlitePorter.importJsonToDb(this.db,json).then(val=>{
                   this.db.executeSql("SELECT * FROM "+tablename+ " where NameAlias != '柏事特'", []).then(vres=>{
                     for(var i = 0; i < vres.rows.length; i++)
                     {
                         console.log('Check SELECT result: ' + JSON.stringify(vres.rows.item(i).Id));
                         console.log('Check SELECT result: ' + JSON.stringify(vres.rows.item(i).NameAlias));
                         console.log('Check SELECT result: ' + JSON.stringify(vres.rows.item(i).Responsible));
                         console.log('Check SELECT result: ' + JSON.stringify(vres.rows.item(i).Phone));
                         alert('Transaction finished, check record count: ' + JSON.stringify(vres.rows.item(i)));
                     }
                  })
              }).catch(e=>{
                console.log('Transaction error: ' + e.message);
                alert('Transaction error: ' + e.message);
              })
              //alert('Got AJAX response');
              // this.db.transaction((tx)=>{
              //    $.each(res, (i, item)=>{
              //     console.log('item: ' + JSON.stringify(item));                  
              //     this.db.executeSql("INSERT INTO "+tablename+" values (?)", JSON.stringify(item)).then(val=>{
              //         this.db.executeSql("SELECT COUNT(*) FROM "+tablename, []).then(vres=>{
              //          console.log('Check SELECT result: ' + JSON.stringify(vres.rows.item(0)));
              //          alert('Transaction finished, check record count: ' + JSON.stringify(vres.rows.item(0)));
              //     })
              //     }).catch(e=>{
              //         console.log('Transaction error: ' + e.message);
              //         alert('Transaction error: ' + e.message);
              //     })                           
              //   });
              // });
            },
       error: (e)=> {
                console.log('ajax error: ' + JSON.stringify(e));
                alert('ajax error: ' + JSON.stringify(e));
            }
    });
  }
}
