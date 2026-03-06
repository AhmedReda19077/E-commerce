import { Component, inject, OnInit, signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin = signal<boolean>(false);
  private router: Router = inject(Router);

  constructor(private flowbiteService: FlowbiteService) { }
  private auth: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.checkLogin();
  }

  checkLogin() {
    this.auth.userDate.subscribe({
      next: () => {
        if (this.auth.userDate.getValue() == null) {
          this.isLogin.set(false);
        }
        else {
          this.isLogin.set(true);
        }
      }
    })
  }

  logout() {
    localStorage.removeItem("userToken");
    this.auth.userDate.next(null);
    this.router.navigate(["/login"])
  }
}
