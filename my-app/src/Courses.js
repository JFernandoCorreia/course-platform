import React, { useState, useEffect } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('professor', professor);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);
    const response = await fetch('http://localhost:3000/courses', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (response.ok) {
      setCourses((prevCourses) => [...prevCourses, data]);
    } else {
      console.error(data.error);
    }
  };

  return (
    <div>
      <h1>Cursos</h1>
      <form onSubmit={handleCreateCourse}>
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
        <label>
          Imagem:
          <input type="file" onChange={handleImageChange} required />
        </label>
        <button type="submit">Criar Curso</button>
      </form>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          {/* Aqui você pode adicionar mais detalhes do curso */}
        </div>
      ))}
    </div>
  );
}

export default Courses;