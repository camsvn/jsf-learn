import { AfterViewInit, Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLiteService } from './services/sqlite.service';

import { DBConstants, Schemas } from './globals/constants/app-constants';
import { getSchema, generateUUID } from './globals/helper/helper.functions';
import { DBQueries } from './globals/sqlite/query-operations'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private _createTBLQuery: string =`CREATE TABLE IF NOT EXISTS "user" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "fname" VARCHAR(30) NOT NULL,
    "lname" VARCHAR(30) NOT NULL,
    "username" VARCHAR(30) NOT NULL UNIQUE,
    "password" VARCHAR(30) NOT NULL
    );
    `;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _SQLiteService: SQLiteService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngAfterViewInit(){
    // !this._SQLiteService._isPermission && await this._SQLiteService.initializePlugin()
    // !this._SQLiteService._isPermission && this._SQLiteService.isService.subscribe(data => {
    //   data && this.openDB(DBConstants.DBName)
    // })
    await this._SQLiteService.initializePlugin()
    this.openDB(DBConstants.DBName)
  }

  async openDB(dbName: string): Promise<void> {
      if(this._SQLiteService._isPermission) {
        let resOpen = await this._SQLiteService.openDB(dbName); 
        if(resOpen.result) {
          console.log("DB Created");
          this._SQLiteService.execute(DBQueries.CTBL_schemas).then(d => this.createSchemaTable(d));
          /**
           * TODO
           *  Create User Table
           */
        }
      } else {
        this._SQLiteService.presentToast('CapacitorSQLite Plugin: Initialization Failed');
      }
  }

  async createSchemaTable (data: {changes:{changes: number},message: string}) {
    console.log('Returned' ,data)
    if(data.changes.changes === 0){
      console.log("Table 'schemas' created")
      getSchema(Schemas.Signup)
        .then(d => this.insertSchema(d, Schemas.Signup))
        .catch(e => console.log(e))
    }
    else 
    this._SQLiteService.presentToast(`Table not created ${data.message}`)
  }

  async insertSchema (schema: string, schemaName: string) {
    let retRun = await this._SQLiteService.run(DBQueries.getQRY_INS_Schema(schemaName,JSON.stringify(schema)))
    if (retRun.changes.changes === 1) {
        console.log('Schema Inserted')
    }
  }

}
