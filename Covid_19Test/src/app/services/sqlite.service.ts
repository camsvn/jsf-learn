import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

const { CapacitorSQLite, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  sqlite: any;
  // isService: boolean = false;
  _platform: string;
  _isPermission: boolean = true;
  isService = new BehaviorSubject(undefined);

  constructor(
    private toastController :ToastController
    ) {}
  /**
   * Toast Service
   */
  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Plugin Initialization
   */
  async initializePlugin(): Promise<void> {
    const info = await Device.getInfo();
    this._platform = info.platform;
    console.log("*** platform " + this._platform)
    this.sqlite = CapacitorSQLite;
    // this.isService = true;

    // if (this._platform === 'android') {
    //   const handlerPermissions = this.sqlite.addListener(
    //         'androidPermissionsRequest', async (data:any) => {
    //     if (data.permissionGranted === 1) {
    //       this._isPermission = true;
    //       this.isService.next(this._isPermission);
    //     } else {
    //       this._isPermission = false;
    //       this.isService.next(this._isPermission);
    //     }
    //   });
    //   try {
    //     this.sqlite.requestPermissions();
    //   } catch (e) {
    //     console.log('Error requesting permissions!' + JSON.stringify(e));
    //   }
    // }
    // if(this._platform === "android") {
    //   try {
    //     await this.sqlite.requestPermissions();
    //   } catch (e) {
    //     console.log("Error requesting permissions " + e);
    //     this.isService = false;
    //   }
    // }
 
  }
  /**
   * Get Echo 
   * @param value string 
   */
  async getEcho(value:string): Promise<any> {
    if (this._isPermission) {
      return await this.sqlite.echo({value:"Hello from JEEP"});
    } else {
      return Promise.resolve("");
    }
  }
  /**
   * Open a Database
   * @param dbName string
   * @param _encrypted boolean optional 
   * @param _mode string optional
   */  
  async openDB(dbName:string,_encrypted?:boolean,_mode?:string): Promise<any> {
    if(this._isPermission) {
      const encrypted:boolean = _encrypted ? _encrypted : false;
      const mode: string = _mode ? _mode : "no-encryption";
      return await this.sqlite.open({database:dbName,encrypted:encrypted,mode:mode});
    } else {
      return Promise.resolve({result:false,message:"Service not started"});
    }
  }
  /**
   * Execute a set of Raw Statements
   * @param statements string 
   */
  async execute(statements:string): Promise<any> {
    if(this._isPermission && statements.length > 0) {
      return await this.sqlite.execute({statements:statements});
    } else {
      return Promise.resolve({changes:-1,message:"Service not started"});
    }
  }
  /**
   * Execute a Single Raw Statement
   * @param statement string
   */
  async run(statement:string,_values?:Array<any>): Promise<any> {
    if(this._isPermission && statement.length > 0) {
      const values: Array<any> = _values ? _values : [];
      return  await this.sqlite.run({statement:statement,values:values});
    } else {
      return Promise.resolve({changes:-1,message:"Service not started"});
    }
  }
  /**
   * Query a Single Raw Statement
   * @param statement string
   * @param values Array<string> optional
   */
  async query(statement:string,_values?:Array<string>): Promise<any> {
    const values: Array<any> = _values ? _values : [];
    if(this._isPermission && statement.length > 0) {
      return await this.sqlite.query({statement:statement,values:values});
    } else {
      return Promise.resolve({values:[],message:"Service not started"});
    }

  } 
  /**
   * Close the Database
   * @param dbName string
   */
  async close(dbName:string): Promise<any> {
    if(this._isPermission) {
      return await this.sqlite.close({database:dbName});
    } else {
      return Promise.resolve({result:false,message:"Service not started"});
    }
  }
  /**
   * Delete the Database file
   * @param dbName string
   */
  async deleteDB(dbName:string): Promise<any> {
    if(this._isPermission) {
      return await this.sqlite.deleteDatabase({database:dbName});
    } else {
      return Promise.resolve({result:false,message:"Service not started"});
    }
  }
}
