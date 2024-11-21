import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Input() recipeId!: string; // ID de la receta para asociar la imagen
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('recipeId', this.recipeId); // Asociar la imagen con la receta

      this.http.post('/api/upload-recipe-image', formData).subscribe({
        next: (response) => {
          console.log('Imagen subida exitosamente:', response);

        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
        }
      });
    }
  }
}

