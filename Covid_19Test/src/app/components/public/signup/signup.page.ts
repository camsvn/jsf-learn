import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { DBQueries } from 'app/globals/sqlite/query-operations'
import { Schemas } from 'app/globals/constants/app-constants'
import { SQLiteService } from 'app/services/sqlite.service'

import { JsonSchemaFormComponent } from '@visur/formgenerator-core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements AfterViewInit  {
  schema: any;
  layout: any;
  options: any;
  enum: any;
  data: any;
  roles: any;
  images: any;
  userRoles: any;
  formulas: any;
  conditionalFields: any;
  lockPage: any;
  lookup: any;
  state: any;
  nestedSchema: any;
  jsonFormOptions: any = {
    addSubmit: true, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defautWidgetOptions: { feedback: true,hideRequired:false }, // Show inline feedback icons,
    rowHeight: 20,
    timeFormat: 24,dataTableHeaderHeight: 50,
    dataTableRowHeight: 50,
    dataTableMaxHeight:500 
  };

  STATE = {"userName":"chhoturam.jat@bizruntime.com","fullName":"Amal Salvin","firstName":"chhoturam","lastName":"jat","email":"chhoturam.jat@bizruntime.com","userId":"21059ad1-190f-427e-3045-1bd3411426c5","companyId":null,"companyName":null,"tenantId":"f2dedf6e-393e-42bc-9bb3-e835a1063b30","tenantName":"constructiontest","projectId":null,"projectName":null,"projectUOM":null};
  
  @ViewChild(JsonSchemaFormComponent)
  formGenerator: JsonSchemaFormComponent

  constructor(
    private _SQLiteService: SQLiteService,
    private _router: Router){}

  ngAfterViewInit(){
    this.getSchema();
  }

  async getSchema(){
    let retRes = await this._SQLiteService.query(DBQueries.getSchema(Schemas.Signup))
    if(retRes.values) {
      let signupSchema = JSON.parse(retRes.values[0].schema);
      this.generateForm(signupSchema);
    }
  }

  generateForm(newFormString: string) {
    try {
      const value = JSON.parse(newFormString);
      this.data = value.data
      this.schema = value?.schema;
      this.layout = value?.layout;
      this.roles = value?.roles;
      this.images=value?.images;
      this.userRoles = value?.userRoles;
      this.formulas = value?.formulas;
      this.conditionalFields = value?.conditionalFields;
      this.enum = value?.enums
      this.lockPage = value?.lockPage;
      this.lookup = value?.lookup
      this.state = this.STATE
      this.nestedSchema = value?.nestedSchema;
    } catch (e) {
      console.log(e)
    }    
  }

  async onSubmitFn(data){
    try {
      if (data.isValid) {
        let retRun = await this._SQLiteService.run(DBQueries.getQRY_INS_User(data.data))
        if (retRun.changes.changes === 1) {
          console.log('User Inserted')
          this._SQLiteService.presentToast("User Inserted")
          this._router.navigateByUrl('/login')
        } else  
          throw new Error("Error: Value not inserted")
      } else
      throw new Error("Error: Invalid form values")        
    } catch (error) {
      console.log(error.message)
      this._SQLiteService.presentToast(error.message)
    }    
  }

}
