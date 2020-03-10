import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserDto } from '@my-tray/api-interfaces';
import { AuthSessionService} from '../../state/services/auth-user-state-service';

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
              private readonly authService: AuthSessionService
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
  }


  login(): void {
    this.submitted = true;
    this.authService.logIn(this.user).subscribe((user: UserDto) => {
      this.submitted = false;
      if (user === null) {
        this.errors = [`Username or Password aren't correct please try again.`];
      } else {
        this.messages = ['Welcome to the Tray System'];
      }
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 1000);
      this.cd.detectChanges();
    },(error => {
      this.errors = [`Username or Password aren't correct please try again.`];
      this.submitted = false;
    }));
  }
}
