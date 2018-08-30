


export function commonHtml() {
  return `
      <app-angular-loader name="{{ getLoaderName() }}"></app-angular-loader>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 brand-home-left-bg">
            <h1 class="brand-home-title">Getting Started</h1>
            <!-- 
              <ul class="list-unstyled">
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Help Desk</a>
              </li>
              <li>
                <a href="#">User Manual</a>
              </li>
            </ul>
           -->
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 brand-home-right-bg">
            <div class="text-center">

              <img [src]="loginImgUrl" alt="AccessEdit">
            </div>
            <!-- <h3 class="home-subhead">Login</h3> -->
            <h3 class="home-subhead">&nbsp;</h3>
            <form class="form" name="form" (ngSubmit)="f.form.valid && loginFunction()" #f="ngForm" novalidate>
              <div class="input-group input-group-lg" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
                <span class="input-group-addon" id="sizing-addon1">
                  <i class="fa fa-user fa-1-5x"></i>
                </span>
                <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon1" name="username" [(ngModel)]="model.username" #username="ngModel"
                  required />

                <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>
              </div>
              <div class="input-group input-group-lg" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
                <span class="input-group-addon" id="sizing-addon1">
                  <i class="fa fa-lock fa-1-5x" aria-hidden="true"></i>
                </span>
                <input type="password" class="form-control" placeholder="Password" aria-describedby="sizing-addon1" name="password" [(ngModel)]="model.password" #password="ngModel"
                  required />


                <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
              </div>
              <!-- Old
              <input type="checkbox" [(ngModel)]="oldOrNew" name="oldOrNew">
              <br> -->
              <button type="submit" class="btn btn-dkblue btn-lg btn-block"> Login</button>
               <div style="text-align: right" *ngIf = "showForgetPasswordLinkForInsight">
                <a [routerLink]="['../../forgetPassword']">forgot password  ?</a>
            </div>
              <div id="alertBox" *ngIf="retMsg" class="alert alert-danger errorMsg" role="alert">
                {{retMsg}}
              </div>
            </form>
          </div>
        </div>
      </div>
      `;
}
