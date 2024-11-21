import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentSuccess: boolean = false;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  makePayment(): void {
    const userId = localStorage.getItem('authUserId'); // Recupera el ID del usuario como cadena
    console.log("Recuperando authUserId desde localStorage:", userId); // Verificacion en consola

    if (userId) {
      this.userService.upgradeToPremium(userId).subscribe({
        next: () => {
          this.paymentSuccess = true;
          this.errorMessage = null;
          this.router.navigate(['/plan-premium/home']); // Redirige al usuario a la pagina de inicio del plan premium
        },
        error: (error) => {
          console.error('Payment error:', error);
          this.paymentSuccess = false;
          this.errorMessage = 'There was an issue with the plan upgrade. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'User not authenticated. Please log in to continue.';
    }
  }
}
