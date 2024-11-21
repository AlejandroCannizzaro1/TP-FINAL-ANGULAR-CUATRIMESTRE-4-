import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-plan-premium',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './plan-premium.component.html',
  styleUrls: ['./plan-premium.component.css']
})
export class PlanPremiumComponent implements OnInit {
  showWelcomeMessage = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    // Detecta cambios en la ruta para ocultar el mensaje en rutas hijas
    this.router.events.subscribe(() => {
      this.showWelcomeMessage = this.route.snapshot.children.length === 0;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

