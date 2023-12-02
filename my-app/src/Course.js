import React, { useState } from 'react';
import Spinner from 'react-spinner-material';

function Course({ course, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(course.name);
  const [professor, setProfessor] = useState(course.professor);
  const [category, setCategory] = useState(course.category);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(null);

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
    onEdit(course.id, formData);
    setIsEditing(false);
  };

  if (isEditing) {
    return <Spinner />; (
      <form onSubmit={handleEdit}>
        {/* Aqui vão os outros campos do formulário */}
        <label>
          Imagem:
          <input type="file" onChange={handleImageChange} />
        </label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
      </form>
    );
  }

  return (
    <div>
      <h2>{course.name}</h2>
      <img src={`data:image/jpeg;base64,${course.image}`} alt={course.name} />
      <p>{course.description}</p>
      {/* Aqui você pode adicionar mais detalhes do curso */}
      <button type="button" onClick={() => setIsEditing(true)}>Editar</button>
      <button type="button" onClick={() => onDelete(course.id)}>Deletar</button>
    </div>
  );
}

export default Course;
