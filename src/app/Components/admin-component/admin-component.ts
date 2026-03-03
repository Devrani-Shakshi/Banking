import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../service/users';
import { Users } from '../../Models/UsersModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeferBlockBehavior } from '@angular/core/testing';

@Component({
  selector: 'app-admin-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
})
export class AdminComponent implements OnInit {
  users: Users[] = [];

  // Model for the form
  userModel: Users = { email: '', password: '', role: 'User', balance: 0 };
  isEditMode = false;
  private cdr = inject(ChangeDetectorRef);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res) => (this.users = res));
  }

  onSubmit() {
    if (this.isEditMode && this.userModel.id) {
      debugger;
      this.userService.updateUser(this.userModel.id, this.userModel).subscribe({
        next: () => this.handleSuccess('User updated successfully!'),
        error: (err) => Swal.fire('Error', 'Update failed', 'error'),
      });
    } else {
      this.userService.createUser(this.userModel).subscribe({
        next: () => this.handleSuccess('User created successfully!'),
        error: (err) => Swal.fire('Error', 'Creation failed', 'error'),
      });
    }
  }

  editUser(user: Users) {
    debugger;
    this.isEditMode = true;
    this.userModel = { ...user, password: '' }; // Don't show hashed password
  }

  deleteUser(id: number) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be permanently removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => this.handleSuccess('User deleted!'));
      }
    });
  }

  resetForm() {
    this.isEditMode = false;
    this.userModel = { email: '', password: '', role: 'User', balance: 0 };
  }

  private handleSuccess(msg: string) {
    Swal.fire({
      title: 'Success',
      text: msg,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    this.resetForm();
    this.loadUsers();
  }
}
