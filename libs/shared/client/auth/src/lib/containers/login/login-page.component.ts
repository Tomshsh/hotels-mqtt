import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent } from "@nebular/auth";
import { Router } from "@angular/router";
import { UsersService } from "../../services";


@Component({
  selector: 'auth-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends NbLoginComponent implements OnInit {

  constructor(protected service: NbAuthService,
              protected cd: ChangeDetectorRef,
              protected router: Router,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private readonly usersService: UsersService) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
  }


  login(): void {
    this.usersService.logIn(this.user);
  }
}
