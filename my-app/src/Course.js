import React, { useState } from 'react';

function Course({ course, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(course.name);
  const [professor, setProfessor] = useState(course.professor);
  const [category, setCategory] = useState(course.category);
  const [description, setDescription] = useState(course.description);

  const handleEdit = (event) => {
    event.preventDefault();
    onEdit(course.id, { name, professor, category, description });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEdit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Professor:
          <input type="text" value={professor} onChange={(e) => setProfessor(e.target.value)} required />
        </label>
        <label>
          Categoria:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Descrição:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
      </form>
    );
  }

  return (
    <div>
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <button type="button" onClick={() => setIsEditing(true)}>Editar</button>
      <button type="button" onClick={() => onDelete(course.id)}>Deletar</button>
    </div>
  );
}

export default Course;
