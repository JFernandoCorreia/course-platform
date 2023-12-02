import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

function Course({ course, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(course.name);
  const [professor, setProfessor] = useState(course.professor);
  const [category, setCategory] = useState(course.category);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('professor', professor);
    formData.append('category', category);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    const isSuccess = await onEdit(course.id, formData);
    setIsEditing(false);
    if (isSuccess) {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEdit}>
        <TextField label="Nome" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Professor" value={professor} onChange={e => setProfessor(e.target.value)} />
        <TextField label="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
        <TextField label="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
        <TextField label="Imagem" value={image} onChange={e => setImage(e.target.value)} />
        <input type="file" onChange={handleImageChange} />
        <Button type="submit" variant="contained" color="primary">Salvar</Button>
        <Button type="button" onClick={() => setIsEditing(false)}>Cancelar</Button>
      </form>
    );
  }
    return (
      <div>
      <h2>{course.name}</h2>
      <img src={`data:image/jpeg;base64,${course.image}`} alt={course.name} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Edição bem-sucedida!" />
    </div>
    );
  }

export default Course;
