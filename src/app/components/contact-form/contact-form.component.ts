import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

import {
  ContactPayload,
  ContactService,
} from '../../services/contact.service';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  readonly languages = ['it', 'en', 'br', 'es'];

  form: FormGroup;
  submitted = false;
  status: FormStatus = 'idle';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      phone: [''],
      street: [''],
      company: [''],
      site: [''],
      language: ['', Validators.required],
    });
  }

  get controls() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status = 'sending';

    this.contactService
      .send(this.form.getRawValue() as ContactPayload)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.submitted = false;
          this.form.reset();
        },
        error: () => {
          this.status = 'error';
        },
      });
  }
}
