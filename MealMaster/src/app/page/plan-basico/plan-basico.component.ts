import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-plan-basico',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './plan-basico.component.html',
  styleUrls: ['./plan-basico.component.css']
})
export class PlanBasicoComponent {

  showWelcomeMessage = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
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

