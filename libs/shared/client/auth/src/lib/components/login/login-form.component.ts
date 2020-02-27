import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent } from "@nebular/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'auth-tray-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends NbLoginComponent implements OnInit {

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
  }

}
