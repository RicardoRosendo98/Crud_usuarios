import { UsersService } from './../../../services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  PlanosSaude = [
    {
      id: 1,
      descricao: 'Plano 300 Enfermaria'
    },
    {
      id: 2,
      descricao: 'Plano 400 Enfermaria'
    },
    {
      id: 3,
      descricao: 'Plano 500 Plus'
    },
  ];

    planosOdonto = [
      {
        id: 1,
        descricao: 'Plano Basic'
      },
      {
        id: 2,
        descricao: 'Plano Medium'
      },
      {
        id: 3,
        descricao: 'Plano Plus'
      },
    ]



  formUser: FormGroup;
  editUser: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuider: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

    ngOnInit() {
      this.buildForm();
      if(this.data && this.data.name) {
        this.editUser = true;
      }
    }

    //SALVAR USUARIOS
    saveUser() {
      const objUserForm = this.formUser.getRawValue()

      if(this.data && this.data.name) {
        //EDITAR USUARUIO
        this.userService.update(this.data.firebaseId, objUserForm).then(
          (response: any) => {
            window.alert('Usuário Editado com Sucesso');

            this.closeModal();
          })
          .catch(
            err => {
              window.alert('Houve um erro ao salvar o usuário');
              console.error(err);
          });

      } else {
        //SALVAR USUARUIO
        this.userService.addUser(objUserForm).then(
          (response: any) => {
            window.alert('Usuário Salvo com Sucesso');

            this.closeModal();
          })
          .catch(
            err => {
              window.alert('Houve um erro ao salvar o usuário');
              console.error(err);
          });
      }

    }

    buildForm() {
      this.formUser = this.formBuider.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        sector: [null, [Validators.required, Validators.minLength(2)]],
        role: [null, [Validators.required, Validators.minLength(5)]],
        healthPlan: [''],
        dentalPlan: [''],
      });

      if(this.data &&  this.data.name) {
        this.fillForm();
      }
    }

    // preencher formulário para edição
    fillForm() {

      this.formUser.patchValue({
        name: this.data.name,
        email: this.data.email,
        sector: this.data.sector,
        role: this.data.role,
        healthPlan: this.data.healthPlan,
        dentalPlan: this.data.dentalPlan,

      })
    }

    closeModal() { this.dialogRef.close(); }
}
