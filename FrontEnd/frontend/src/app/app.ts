import { RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [MatFormFieldModule,MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('frontend');

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  requierdMessage = 'El campo es requerido';

  errorMessage = signal('');
  errorPassword = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());


       merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set(this.requierdMessage);
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('El correo no es valido');
    } else {
      this.errorMessage.set('');
    }
  }
updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorPassword.set(this.requierdMessage);
    }
  }
  //---------------------CONTRASEÑA---------------------//
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  

  iniciarSesion(){
    Swal.fire({
      icon: 'success',
      title: 'Sesion Iniciada',
      text: 'Bienvenido a la plataforma',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
